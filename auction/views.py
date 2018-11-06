from django.views.generic.base import TemplateView

class AuctionView(TemplateView):
    template_name = "auction/auction.html"