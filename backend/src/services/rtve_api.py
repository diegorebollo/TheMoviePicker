from rtvedl.ztnr_rtve import get_urls
from fastapi import FastAPI

app = FastAPI()

@app.get("/id/{video_id}")
def main(video_id: int):
    urls = get_urls(video_id)
    url_mp4 = urls[-1].decode(encoding='UTF-8',errors='strict')          
    return {'videoUrl': url_mp4}
