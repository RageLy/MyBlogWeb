from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', include('MyBlog.urls')),
    path("favicon.ico", RedirectView.as_view(url='static/favicon.ico')),
    path('adminht/', admin.site.urls),
    path('ueditor/', include('DjangoUeditor.urls' )),


]

