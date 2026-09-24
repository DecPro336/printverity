"""Amazon Bedrock AgentCore runtime entry point. Wraps the PrintVerity agent so the same graph runs hosted on AgentCore.
Local dev server:  .venv/bin/python -m app.agentcore_app   (listens on :8080, POST /invocations {"job": "...", "question": "..."})"""
from __future__ import annotations
from bedrock_agentcore import BedrockAgentCoreApp
from . import store
from .orchestration.agent import get_agent

app = BedrockAgentCoreApp()

@app.entrypoint
def invoke(payload: dict, context=None) -> dict:
    job = store.get_job(payload.get("job", ""))
    if not job:
        return {"error": "job not found", "jobs": [j["id"] for j in store.list_jobs()]}
    return get_agent().ask(job, payload.get("question", ""), payload.get("history"))

if __name__ == "__main__":
    app.run()
