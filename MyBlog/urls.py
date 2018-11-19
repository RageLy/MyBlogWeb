from django.urls import path

from . import views
app_name = 'MyBlog'
urlpatterns = [
    path('', views.index, name='index'),
    path('blog/', views.Blog, name='Blog'),
    path('test/', views.test, name='test'),
    path('admin/menushow/', views.menushow, name='menushow'),
    path('admin/', views.admin, name='admin'),
    path('admin/login/', views.login, name='login'),
    path('admin/console/', views.console, name='console'),
    path('message/', views.message, name='message'),
    path('submitmessage/', views.submitmessage, name='submitmessage'),
    path('picture/', views.picture, name='picture'),
    path('like/', views.like, name='like'),
    path('about/', views.about, name='about'),
    path('details/<int:id>', views.details, name='details'),
    path('weblink/', views.weblink, name='weblink'),
    path('picdetails/<int:id>', views.picdetails, name='picdetails'),
    path('types/<str:type>', views.types, name='types'),
    path('imgtypes/<str:type>', views.imgtypes, name='imgtypes'),
    path('commentdata/', views.commentdata, name='commentdata'),
    path('replydata/', views.replydata, name='replydata'),
    path('admin/Top/', views.Top, name='Top'),
    path('admin/upload_ajax/', views.upload_ajax, name='upload_ajax'),
    path('admin/editblog/', views.editblog, name='editblog'),
    path('admin/deleteblog/', views.deleteblog, name='deleteblog'),
    path('admin/Blogsdata/', views.Blogsdata, name='Blogsdata'),
    path('admin/BlogEdit/', views.BlogEdit, name='BlogEdit'),
    path('admin/PicEdit/', views.PicEdit, name='PicEdit'),
    path('admin/PicUploads/', views.PicUploads, name='PicUploads'),
    path('admin/PictureManage/', views.PictureManage, name='PictureManage'),
    path('admin/PicDetailManage/<int:id>', views.PicDetailManage, name='PicDetailManage'),
    path('admin/setWrap/', views.setWrap, name='setWrap'),
    path('admin/userinfo/<int:userid>/', views.userinfo, name='userinfo'),
    path('admin/password/<int:userid>/', views.password, name='password'),



]