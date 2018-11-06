from django.urls import path
from myboard.views import MyboardView, upload_file
from django.conf import settings
from django.conf.urls.static import static
# from myboard.views import 

app_name = 'myboard'
urlpatterns = [
    path('', MyboardView.as_view(), name='myboard_list'),
    path('upload/', upload_file, name='upload_file'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)