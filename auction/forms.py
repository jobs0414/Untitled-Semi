from django import forms

class AuctionSearchForm(forms.Form):
    search_word = forms.CharField(label='Search Word')
