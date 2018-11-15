from django.contrib import admin
from django.urls import include, path
from django.views.generic.base import RedirectView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', include('MyBlog.urls')),
    path("favicon.ico", RedirectView.as_view(url='static/favicon.ico')),


    # path('', include('MyBlogAdmin.urls')),

    path('adminht/', admin.site.urls),

    # path('markdown/',include('django_markdown.urls')),
    path('mdeditor/',include('mdeditor.urls'))




]
