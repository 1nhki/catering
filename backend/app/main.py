from fastapi import FastAPI

app = FastAPI(title="FitBento API")


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
