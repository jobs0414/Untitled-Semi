from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.http import HttpResponseRedirect
from .forms import UploadFileForm
# Create your views here.
class MyboardView(TemplateView):
    template_name = "myboard/index.html"

def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            # form.save()
            return HttpResponseRedirect('uploaded.html')
    else:
        form = UploadFileForm()
    return render(request, 'myboard/upload.html', {'form': form})
