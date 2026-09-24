# PrintVerity on AWS: ECS Fargate (app + worker), RDS PostgreSQL with pgvector, ElastiCache Redis, S3 for documents, ALB in front.
terraform {
  required_version = ">= 1.6"
  required_providers { aws = { source = "hashicorp/aws", version = "~> 5.0" } }
}
provider "aws" { region = var.region }

variable "region"      { default = "us-east-1" }
variable "name"        { default = "printverity" }
variable "image"       { description = "ECR image URI for the app" }
variable "vpc_id"      {}
variable "subnet_ids"  { type = list(string) }
variable "db_password" { sensitive = true }

resource "aws_s3_bucket" "docs" { bucket = "${var.name}-documents" }
resource "aws_s3_bucket_versioning" "docs" { bucket = aws_s3_bucket.docs.id  versioning_configuration { status = "Enabled" } }

resource "aws_db_subnet_group" "db" { name = "${var.name}-db"  subnet_ids = var.subnet_ids }
resource "aws_db_instance" "pg" {
  identifier = "${var.name}-pg"  engine = "postgres"  engine_version = "16"  instance_class = "db.t4g.medium"
  allocated_storage = 50  db_name = "printverity"  username = "printverity"  password = var.db_password
  db_subnet_group_name = aws_db_subnet_group.db.name  skip_final_snapshot = true  storage_encrypted = true
}
resource "aws_elasticache_subnet_group" "redis" { name = "${var.name}-redis"  subnet_ids = var.subnet_ids }
resource "aws_elasticache_cluster" "redis" {
  cluster_id = "${var.name}-redis"  engine = "redis"  node_type = "cache.t4g.small"  num_cache_nodes = 1  subnet_group_name = aws_elasticache_subnet_group.redis.name
}

resource "aws_ecs_cluster" "this" { name = var.name }
resource "aws_iam_role" "task" {
  name = "${var.name}-task"
  assume_role_policy = jsonencode({ Version = "2012-10-17", Statement = [{ Effect = "Allow", Principal = { Service = "ecs-tasks.amazonaws.com" }, Action = "sts:AssumeRole" }] })
}
resource "aws_iam_role_policy" "task" {
  role = aws_iam_role.task.id
  policy = jsonencode({ Version = "2012-10-17", Statement = [
    { Effect = "Allow", Action = ["s3:PutObject", "s3:GetObject", "s3:ListBucket"], Resource = [aws_s3_bucket.docs.arn, "${aws_s3_bucket.docs.arn}/*"] },
    { Effect = "Allow", Action = ["bedrock:InvokeModel", "bedrock-agentcore:*"], Resource = "*" },
    { Effect = "Allow", Action = ["logs:CreateLogStream", "logs:PutLogEvents", "logs:CreateLogGroup"], Resource = "*" }
  ] })
}
locals {
  env = [
    { name = "DATABASE_URL", value = "postgresql://printverity:${var.db_password}@${aws_db_instance.pg.address}:5432/printverity" },
    { name = "REDIS_URL", value = "redis://${aws_elasticache_cluster.redis.cache_nodes[0].address}:6379/0" },
    { name = "PV_S3_BUCKET", value = aws_s3_bucket.docs.bucket },
    { name = "PV_CELERY", value = "on" },
    { name = "AWS_REGION", value = var.region },
  ]
}
resource "aws_ecs_task_definition" "app" {
  family = "${var.name}-app"  requires_compatibilities = ["FARGATE"]  network_mode = "awsvpc"  cpu = 2048  memory = 4096
  execution_role_arn = aws_iam_role.task.arn  task_role_arn = aws_iam_role.task.arn
  container_definitions = jsonencode([{ name = "app", image = var.image, essential = true, portMappings = [{ containerPort = 8710 }], environment = local.env,
    logConfiguration = { logDriver = "awslogs", options = { awslogs-group = "/ecs/${var.name}", awslogs-region = var.region, awslogs-stream-prefix = "app", awslogs-create-group = "true" } } }])
}
resource "aws_ecs_task_definition" "worker" {
  family = "${var.name}-worker"  requires_compatibilities = ["FARGATE"]  network_mode = "awsvpc"  cpu = 2048  memory = 8192
  execution_role_arn = aws_iam_role.task.arn  task_role_arn = aws_iam_role.task.arn
  container_definitions = jsonencode([{ name = "worker", image = var.image, essential = true, command = ["celery", "-A", "app.tasks.celery_app", "worker", "-l", "info"], environment = local.env,
    logConfiguration = { logDriver = "awslogs", options = { awslogs-group = "/ecs/${var.name}", awslogs-region = var.region, awslogs-stream-prefix = "worker", awslogs-create-group = "true" } } }])
}
resource "aws_lb" "alb" { name = "${var.name}-alb"  load_balancer_type = "application"  subnets = var.subnet_ids }
resource "aws_lb_target_group" "app" { name = "${var.name}-tg"  port = 8710  protocol = "HTTP"  target_type = "ip"  vpc_id = var.vpc_id  health_check { path = "/api/status" } }
resource "aws_lb_listener" "http" { load_balancer_arn = aws_lb.alb.arn  port = 80  protocol = "HTTP"  default_action { type = "forward"  target_group_arn = aws_lb_target_group.app.arn } }
resource "aws_ecs_service" "app" {
  name = "${var.name}-app"  cluster = aws_ecs_cluster.this.id  task_definition = aws_ecs_task_definition.app.arn  desired_count = 2  launch_type = "FARGATE"
  network_configuration { subnets = var.subnet_ids  assign_public_ip = true }
  load_balancer { target_group_arn = aws_lb_target_group.app.arn  container_name = "app"  container_port = 8710 }
}
resource "aws_ecs_service" "worker" {
  name = "${var.name}-worker"  cluster = aws_ecs_cluster.this.id  task_definition = aws_ecs_task_definition.worker.arn  desired_count = 2  launch_type = "FARGATE"
  network_configuration { subnets = var.subnet_ids  assign_public_ip = true }
}
output "url" { value = "http://${aws_lb.alb.dns_name}" }
