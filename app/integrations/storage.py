"""Document write-back: where approved documents go. S3 when PV_S3_BUCKET is set (the shared drive in the AWS deployment), the local out/ folder otherwise."""
from __future__ import annotations
import logging, shutil
from pathlib import Path
from .. import config
from ..util import OUT

log = logging.getLogger("printverity.storage")

class LocalStorage:
    name = "local"
    def __init__(self, root: Path | None = None):
        self.root = root or OUT / "released"
    def put(self, path: str, key: str) -> str:
        dst = self.root / key; dst.parent.mkdir(parents=True, exist_ok=True); shutil.copyfile(path, dst); return str(dst)

class S3Storage:
    name = "s3"
    def __init__(self, bucket: str = config.S3_BUCKET, prefix: str = config.S3_PREFIX, region: str = config.AWS_REGION):
        import boto3
        self.bucket, self.prefix = bucket, prefix
        self.client = boto3.client("s3", region_name=region)
    def put(self, path: str, key: str) -> str:
        full = self.prefix + key
        self.client.upload_file(path, self.bucket, full)
        return f"s3://{self.bucket}/{full}"

def get_storage():
    if config.S3_BUCKET:
        try: return S3Storage()
        except Exception as e: log.warning("S3 storage unavailable (%s); using local", e)
    return LocalStorage()
