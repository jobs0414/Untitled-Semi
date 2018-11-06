from django.db import models

# Create your models here.

class Myboard(models.Model):
    song_title = models.CharField('title', max_length=100)
    song_author = models.CharField('author', max_length=100)
    song_length = models.IntegerField('duration', default=0)
    song_url = models.URLField('url', unique=True)

    def __str__(self):
        return self.song_title

class Song(models.Model):
    name = models.CharField('name', max_length=100)
    audio_file = models.FileField()

class UploadFileModel(models.Model):
    title = models.TextField(default='')
    file = models.FileField(null=True)