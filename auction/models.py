from django.db import models

# Create your models here.

class Auction(models.Model):
    title = models.CharField('음원명', max_length=100)
    artist = models.CharField('가수명', max_length=100, null=True)
    piece = models.IntegerField('경매 수량', blank=True, default=0)
    base_price = models.IntegerField('경매 시작가격', blank=True, default=0)
    endtime = models.DateTimeField('경매 종료시각')
    call_price = models.IntegerField('입찰가격', blank=True, default=0)
    cover_path = models.CharField('파일경로', max_length=200, null=True)
    video_path = models.CharField('비디오경로', max_length=100, null=True)

    def __str__(self):
        return self.title

    def get_path(self):
        return self.cover_path