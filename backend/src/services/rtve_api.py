from rtvedl.ztnr_rtve import get_urls
from peewee import *
import time
db = SqliteDatabase('C:/Users/diego/Desktop/WEB/rtveProject/backend/src/services/prisma/dev.db')

class moviesTmdb(Model):
    id = IntegerField()
    rtveId = IntegerField()
    tmdbId = IntegerField()
    title = CharField()
    movieUrl = CharField()

    class Meta:
        database = db 
        
        
db.connect()

for movie in moviesTmdb.select():
    print(movie.rtveId)
    try:
        urls = get_urls(movie.rtveId)
    except:
        print(f'fail {movie.rtveId}: {movie.title}')
        pass
    else:        
        print(urls)
        movie.movieUrl = urls
        movie.save()

    time.sleep(0.2)  

