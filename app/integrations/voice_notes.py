"""Inspector voice notes: transcribe an audio file with AssemblyAI and attach the text to a finding."""
from __future__ import annotations
import logging
from .. import config

log = logging.getLogger("printverity.voice")

class NotConfigured(RuntimeError):
    pass

def transcribe(audio_path: str) -> dict:
    if not config.ASSEMBLYAI_API_KEY:
        raise NotConfigured("Voice notes need ASSEMBLYAI_API_KEY. The audio file was kept with the finding.")
    import assemblyai as aai
    aai.settings.api_key = config.ASSEMBLYAI_API_KEY
    transcriber = aai.Transcriber(config=aai.TranscriptionConfig(punctuate=True, format_text=True))
    t = transcriber.transcribe(audio_path)
    if t.status == aai.TranscriptStatus.error:
        raise RuntimeError(t.error or "transcription failed")
    return {"text": t.text or "", "confidence": getattr(t, "confidence", None), "duration_s": (t.audio_duration or 0), "provider": "assemblyai"}
