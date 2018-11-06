from django import forms
from .models import UploadFileModel

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()