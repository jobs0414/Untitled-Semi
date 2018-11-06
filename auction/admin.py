from django.contrib import admin
from auction.models import Auction

# Register your models here.
class AuctionAdmin(admin.ModelAdmin):
    list_display = ('title', 'piece', 'base_price', 'endtime', 'call_price')
    list_display_links = ('title', 'piece')

admin.site.register(Auction, AuctionAdmin)