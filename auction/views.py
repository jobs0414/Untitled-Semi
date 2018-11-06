from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView
from django.views.generic import DetailView
from auction.forms import AuctionSearchForm
from auction.models import Auction
from django.db.models import Q
from django.shortcuts import render


class AuctionView(TemplateView):
    template_name = "auction/auction.html"

class SearchFormView(FormView):
    form_class = AuctionSearchForm
    template_name = 'auction/auction_search.html'

    def form_valid(self, form):
        schWord = '%s' % self.request.POST['search_word']
        auction_list = Auction.objects.filter(Q(title__icontains=schWord) | Q(artist__icontains=schWord)).distinct()
        context = {}
        context['form'] = form
        context['search_term'] = schWord
        context['object_list'] = auction_list

        return render(self.request, self.template_name, context)

class AuctionDetail(DetailView):
    model = Auction