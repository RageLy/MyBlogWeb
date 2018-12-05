from django.db import connection
from django.shortcuts import render,redirect
from django.http import JsonResponse
from MyBlog import models
from django.http import HttpResponse
from MyBlogWeb import settings
from django.core.paginator import Paginator,EmptyPage, PageNotAnInteger
import urllib.request
import random
from django.db.models import Q
import json
from django.db.models.fields.files import ImageFieldFile
from PIL import Image
from MyBlogWeb.settings import MEDIA_ROOT
import os, datetime, uuid,time



class DateEncoder(json.JSONEncoder):
    def default(self,obj):
        if isinstance(obj,datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj,datetime.date):
            return obj.strftime("%Y-%m-%d")
        else:
            return json.JSONEncoder.default(self,obj)

'''
前端处理
'''
def index(request):
    return render(request,'MyBlog/index.html')

def Blog(request):
    if request.method=="GET":
        Ranker = models.Blog.objects.raw('select top 10 id,title from blog order by hit desc')
        tag = models.BlogType.objects.all()
        print(tag)
        category = models.Category.objects.all()
        return render(request,'MyBlog/Blog.html',{'Rankers':Ranker,'Tags':tag,'Categorys':category,'method':'0','type':'all'})
    elif request.method=="POST":
        key = request.POST.get("key")
        result = models.Blog.objects.filter(Q(blogcontent__contains=key) | Q(title__contains=key))
        print(result)
        return render(request, 'MyBlog/search.html', {'result': result})

def loadblog(request):
    type=request.GET.get('type')
    method=request.GET.get('method')
    print('方法:',method)
    if method=='0':
        Blog = models.Blog.objects.values('id','title','abstract','createdate','hit','isTop','isorg','imgTitle')
        print(Blog)
    elif method=='1':
        Blog = models.BlogType.objects.get(id=type).blogtype_blog.values('id','title','abstract','createdate','hit','isTop','isorg','imgTitle')
    elif method=='2':
        Blog = models.Category.objects.get(id=type).CategoryToBlog_Blog.values('id','title','abstract','createdate','hit','isTop','isorg','imgTitle')
    else:
        Blog = models.Blog.objects.values('id', 'title', 'abstract', 'createdate', 'hit', 'isTop', 'isorg', 'imgTitle')
    # print(data)
    bloglist=list(Blog)
    for index,item in enumerate(bloglist):
        bloglist[index]["isTopZh"] = '置顶' if item["isTop"]==1 else ''
        bloglist[index]["isorgZh"] = '原创' if item["isorg"]==1 else '转载'
        blogtype=models.BlogType.objects.filter(blog__id=item["id"]).values('id','TypeName')
        bloglist[index]["blogType"]=list(blogtype)
        categorytype = models.Category.objects.filter(blog__id=item["id"]).values('id','Name')
        bloglist[index]["blogCategory"] = list(categorytype)
        commentcount=models.Comment.objects.filter(blog__id=item["id"]).count()
        bloglist[index]["commentcount"] = commentcount
    limit=request.GET.get('limit')
    paginator = Paginator(bloglist, limit)
    page = request.GET.get('page')
    bloglists = paginator.get_page(page)
    # print(userlists.object_list)
    defaultdict={"count":len(bloglist)}
    defaultdict['data']=bloglists.object_list
    print(defaultdict)
    return HttpResponse(json.dumps(defaultdict, cls=DateEncoder), content_type="application/json")

def picture(request):
    PicManage=models.PicManage.objects.all()
    # thumb_url = get_thumbnailer(PicManage.url)['avatar'].url
    Ranker = models.Blog.objects.raw('select top 10 id,title from blog order by hit desc')
    tag = models.BlogType.objects.filter(category=1)
    return render(request, 'MyBlog/picture.html', {'PicManages': PicManage,'Rankers':Ranker,'Tags':tag})

def archive(request):
    Ranker = models.Blog.objects.raw('select top 10 id,title from blog order by hit desc')
    tag = models.BlogType.objects.all()
    category = models.Category.objects.all()
    # archive = models.Blog.objects.raw('SELECT id ,Title ,year ,month ,day FROM dbo.Blog')
    return render(request, 'MyBlog/archive.html', {'Rankers':Ranker,'Tags':tag,'Categorys':category})

def loadarchivedata(request):
    archive=models.Blog.objects.values_list('id','year','month','day','title')
    data=list(archive)
    yearlist={x[1] for x in data}
    dictlist=[]
    dict={}
    detail=[]
    for year in yearlist:
        dict['year'] = year
        for i in data:
            if(i[1]==year):
                detail.append({'monthday':str(i[2])+'月'+str(i[3])+'日','title':i[4],'id':i[0]})
        dict['detail'] = detail
        dictlist.append(dict)
    print(dictlist)
    return JsonResponse({'code':0,'msg':'success','data':dictlist})

def message(request):
    Ranker = models.Blog.objects.raw('select top 10 id,title from blog order by hit desc')
    tag = models.BlogType.objects.all()
    print(tag)
    category = models.Category.objects.all()
    return render(request, 'MyBlog/message.html',{'Rankers':Ranker,'Tags':tag,'Categorys':category,'method':'0','type':'all'})

def loadmessage(request):
    page=request.GET.get('page')
    limit = request.GET.get('limit')
    message=models.MessageTb.objects.values().order_by('-createdate')
    data = list(message)
    paginator = Paginator(data, limit)
    messagelist = paginator.get_page(page)
    return JsonResponse({'code':0,'msg':'success','currPage':page,"totalPage":paginator.num_pages,"totalSize":len(data),'data':messagelist.object_list})

def submitmessage(request):
    if 'HTTP_X_FORWARDED_FOR' in request.META:
        ip = request.META['HTTP_X_FORWARDED_FOR']
    else:
        ip = request.META['REMOTE_ADDR']
    print(ip)
    ipcity='http://ip.taobao.com/service/getIpInfo.php?ip='+ip
    wb_data = urllib.request.urlopen(ipcity)
    data = json.loads(wb_data.read().decode("utf-8"))
    ipadd=data['data']['ip']
    country=data['data']['country']
    region = data['data']['region']
    city = data['data']['city']
    username=request.POST.get('username')
    email = request.POST.get('email')
    website = request.POST.get('website')
    MessageCon=request.POST.get("MessageCon")
    # maxid=models.MessageTb.objects.latest('id').id
    userpic=random.choice(["1-1.jpg","1-2.jpg","1-3.jpg","1-4.jpg","1-5.jpg","1-6.jpg","1-7.jpg","1-8.jpg","1-9.jpg","1-10.jpg","1-11.jpg","1-12.jpg",
                           "1-13.jpg",
                           "1-14.jpg",
                           "1-15.jpg",
                           "1-16.jpg",
                           "1-17.jpg",
                           "1-18.jpg",
                           "1-19.jpg",
                           "1-20.jpg",])
    MessageTb = models.MessageTb(MessageContent=MessageCon,userid='',userpic='static/common/imgs/userheadlib/'+userpic,username=username,createdate=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),ip=ipadd,country=country,region=region,city=city,website=website,email=email)
    MessageTb.save()
    # print(MessageTb.object_to_json())
    message = models.MessageTb.objects.values().order_by('-createdate')
    data = list(message)
    paginator = Paginator(data, 10)
    messagelist = paginator.get_page(1)
    return JsonResponse(
        {'code': 0, 'msg': 'success', 'currPage': 1, "totalPage": paginator.num_pages, "totalSize": len(data),
         'data': messagelist.object_list})


def about(request):
    return render(request, 'MyBlog/about.html')
def test(request):
    return render(request, 'MyBlog/test.html')

def details(request,id):
    detail=models.Blog.objects.get(id=id)
    detail.hit+=1
    detail.save(update_fields=['hit'])
    # commentdetail=models.Blog.objects.all()
    Ranker = models.Blog.objects.raw('select top 10 id,title from Blog order by hit desc')
    tag = models.BlogType.objects.filter(category=0)
    category = models.Category.objects.all()
    lastpage = models.Blog.objects.filter(id__lt=detail.id).order_by('id').values('id','title').last()
    # lastpage=lastpage if lastpage!=None else '已经是第一条了'

    nextpage=models.Blog.objects.filter(id__gt=detail.id).order_by('id').values('id','title').first()
    # nextpage = nextpage if nextpage != None else '已经是最后一条了'
    print(lastpage,nextpage)
    return render(request, 'MyBlog/details.html', {'Blog': detail,'lastpage':"<a href=\"/details/"+str(lastpage['id'])+"\">"+lastpage['title']+"</a>" if lastpage!=None else '<a>已经是第一条了</a>','nextpage':"<a href=\"/details/"+str(nextpage['id'])+"\">"+nextpage['title']+"</a>" if nextpage!=None else '<a>已经是最后一条了</a>','Rankers':Ranker,'Tags':tag,'Categorys':category})

def weblink(request):
    weblink = models.WebLink.objects.all()
    return render(request, 'MyBlog/LinkWeb.html', {'weblinks': weblink})

def picdetails(request,id):
    PicManage=models.PicManage.objects.get(id=id)
    Ranker = models.Blog.objects.raw('select top 10 id,title from blog order by hit desc')
    tag = models.BlogType.objects.filter(category=1)
    return render(request, 'MyBlog/picdetails.html', {'PicManages': PicManage, 'Rankers': Ranker, 'Tags': tag})

def types(request,type):
    Ranker = models.Blog.objects.raw('select top 10 id,title from blog order by hit desc')
    tag = models.BlogType.objects.all()
    category = models.Category.objects.all()
    return render(request, 'MyBlog/Blog.html', {'Rankers':Ranker,'Tags':tag,'Categorys':category,'type':type,'method':'1'})

def category(request,type):
    Ranker = models.Blog.objects.raw('select top 10 id,title from blog order by hit desc')
    tag = models.BlogType.objects.all()
    category = models.Category.objects.all()
    return render(request, 'MyBlog/Blog.html', {'Rankers':Ranker,'Tags':tag,'Categorys':category,'type':type,'method':'2'})

def imgtypes(request,type):
    PicManage = models.BlogType.objects.get(TypeName=type,category=1).pictype_pic.all()
    tag = models.BlogType.objects.filter(category=1)
    # print(Bloglist,len(Bloglist))
    return render(request, 'MyBlog/picture.html', {'PicManages':PicManage,'Tags':tag})

def commentdata(request):
    username=request.POST.get('username')
    email = request.POST.get('email')
    website = request.POST.get('website')
    blogid=request.POST.get('blogid')
    commentContent = request.POST.get('commentContent')
    device = request.POST.get('device')
    brower = request.POST.get('brower')
    system = request.POST.get('system')
    replytype = request.POST.get('replytype')
    if 'HTTP_X_FORWARDED_FOR' in request.META:
        ip = request.META['HTTP_X_FORWARDED_FOR']
    else:
        ip = request.META['REMOTE_ADDR']
    print(ip)
    ipcity = 'http://ip.taobao.com/service/getIpInfo.php?ip=' + ip
    wb_data = urllib.request.urlopen(ipcity)
    data = json.loads(wb_data.read().decode("utf-8"))
    ipadd = data['data']['ip']
    country = data['data']['country']
    region = data['data']['region']
    city = data['data']['city']
    userpic = random.choice(["1-1.jpg",
                             "1-2.jpg",
                             "1-3.jpg",
                             "1-4.jpg",
                             "1-5.jpg",
                             "1-6.jpg",
                             "1-7.jpg",
                             "1-8.jpg",
                             "1-9.jpg",
                             "1-10.jpg",
                             "1-11.jpg",
                             "1-12.jpg",
                             "1-13.jpg",
                             "1-14.jpg",
                             "1-15.jpg",
                             "1-16.jpg",
                             "1-17.jpg",
                             "1-18.jpg",
                             "1-19.jpg",
                             "1-20.jpg", ])
    comment=models.Comment(blog_id=blogid,username=username,website=website,email=email,commentContent=commentContent,createdate=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),device=device,likeNum=0,userpic='static/common/imgs/userheadlib/'+userpic,brower=brower,system=system,country=country,region=region,city=city)
    comment.save()
    commentNewcount=models.Comment.objects.count()
    return JsonResponse({'message':0,'commentcount':commentNewcount})

def loadcommentdata(request):
    page = request.GET.get('page')
    limit = request.GET.get('limit')
    blog_id=request.GET.get('blogid')
    comment=models.Comment.objects.filter(blog_id=blog_id).order_by('-createdate').values()

    data = list(comment)
    for index,item in enumerate(data):
        reply = models.Reply.objects.filter(comment_id=item["id"]).values()
        replylist = list(reply)
        data[index]["replylist"]=replylist
    # data.append(replylist)
    paginator = Paginator(data, limit)
    commentlist = paginator.get_page(page)
    print(commentlist.object_list)
    return JsonResponse({'code':0,'msg':'success','currPage':page,"totalPage":paginator.num_pages,"totalSize":len(data),'data':commentlist.object_list})

def replydata(request):
    userid=request.POST.get('userid')
    blogid=request.POST.get('blogid')
    commentid=request.POST.get('commentid')
    replyContent = request.POST.get('replyContent')
    device = request.POST.get('device')
    brower = request.POST.get('brower')
    system = request.POST.get('system')
    replytype=request.POST.get('replytype')
    if 'HTTP_X_FORWARDED_FOR' in request.META:
        ip = request.META['HTTP_X_FORWARDED_FOR']
    else:
        ip = request.META['REMOTE_ADDR']
    print(ip)
    ipcity='http://ip.taobao.com/service/getIpInfo.php?ip='+ip
    wb_data = urllib.request.urlopen(ipcity)
    data = json.loads(wb_data.read().decode("utf-8"))
    ipadd=data['data']['ip']
    country=data['data']['country']
    region = data['data']['region']
    city = data['data']['city']
    userpic = random.choice(["1-1.jpg",
                             "1-2.jpg",
                             "1-3.jpg",
                             "1-4.jpg",
                             "1-5.jpg",
                             "1-6.jpg",
                             "1-7.jpg",
                             "1-8.jpg",
                             "1-9.jpg",
                             "1-10.jpg",
                             "1-11.jpg",
                             "1-12.jpg",
                             "1-13.jpg",
                             "1-14.jpg",
                             "1-15.jpg",
                             "1-16.jpg",
                             "1-17.jpg",
                             "1-18.jpg",
                             "1-19.jpg",
                             "1-20.jpg", ])
    reply=models.Reply(blog_id=blogid,user_id=userid,userpic='static/common/imgs/userheadlib/'+userpic,comment_id=commentid,replyContent=replyContent,createdate=time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time())),reply_type=replytype,likeNum=0,device=device,brower=brower,system=system,country=country,region=region,city=city)
    reply.save()
    return JsonResponse({'message':0})

def like(request):
    commentid = request.POST.get('commentid')
    comment=models.Comment.objects.get(id=commentid)
    comment.likeNum+=1
    comment.save(update_fields=['likeNum'])
    return JsonResponse({'message':0,'like':comment.likeNum})

def replylike(request):
    replyid = request.POST.get('replyid')
    reply=models.Reply.objects.get(id=replyid)
    reply.likeNum+=1
    reply.save(update_fields=['likeNum'])
    return JsonResponse({'message':0,'replylike':reply.likeNum})

def search(request):
    key=request.GET.get("key")
    result=models.Blog.objects.filter(Q(blogcontent__contains=key)|Q(title__contains=key))
    return render(request, 'MyBlog/search.html',{'result':result})

'''
后端处理
'''

def console(request):
    return render(request,'MyBlogAdmin/console.html')

def BlogEdit(request):
    return render(request,'MyBlogAdmin/Blog.html')

def PicEdit(request):
    return render(request,'MyBlogAdmin/pictureEdit.html')

def PicUploads(request):
    imglist=request.FILES.get('fileList')
    print(imglist)
    return HttpResponse(json.dumps('', cls=DateEncoder), content_type="application/json")
    # return render(request,'MyBlogAdmin/pictureEdit.html')
def PictureManage(request):
    PicManage=models.PicManage.objects.all()
    return render(request, 'MyBlogAdmin/PictureManage.html',{'PicManages':PicManage})

def PicDetailManage(request,id):
    PicManage=models.PicManage.objects.get(id=id)
    return render(request, 'MyBlogAdmin/PicdetailMan.html',{'PicManages':PicManage})

# 创建原始图片名称
def generate_filename(instance, filename):
    """
    安全考虑，生成随机文件名
    """
    directory_name = datetime.datetime.now().strftime('upload/imgs/%Y/%m')
    filename = uuid.uuid4().hex + os.path.splitext(filename)[-1]
    return os.path.join(directory_name, filename)

# 创建缩略图名称
def generate_filename_thumb(instance, filename):
    directory_name = datetime.datetime.now().strftime('upload/thumb/%Y/%m')
    filename = uuid.uuid4().hex + os.path.splitext(filename)[-1]
    return os.path.join(directory_name, filename)

UPLOAD_ROOT = generate_filename
THUMB_ROOT = "upload/thumb/" # 这个是最终的缩略图要保存的路径
def make_thumb(path, size = 800):
    pixbuf = Image.open(path)
    width, height = pixbuf.size

    if width > size:
        delta = width / size
        height = int(height / delta)
        pixbuf.thumbnail((size, height), Image.ANTIALIAS)
        return pixbuf

def setWrap(request):
    pic=models.Picture.objects.get(id=request.GET.get("picid"))
    picmanage=models.PicManage.objects.get(id=pic.pic_id)
    picmanage.img=pic.url

    # super(PicManage, self).save()  # 将上传的图片先保存一下，否则报错
    base, ext = os.path.splitext(os.path.basename(picmanage.img.path))
    thumb_pixbuf = make_thumb(os.path.join(MEDIA_ROOT, picmanage.img.name))
    relate_thumb_path = os.path.join(THUMB_ROOT, base + '_thumb' + ext)
    thumb_path = os.path.join(MEDIA_ROOT, relate_thumb_path)
    thumb_pixbuf.save(thumb_path)
    picmanage.imgthumb = ImageFieldFile(picmanage, picmanage.imgthumb, relate_thumb_path)
    picmanage.save()
    return JsonResponse({'message': '相册封皮设置成功！'})

def Blogsdata(request):
    key = None
    if request.method == 'POST':
        key = request.POST.get('key')
    elif request.method == 'GET':
        key = request.GET.get('key')
    blog = models.Blog.objects.all()
    if key != None and key != '':
        blog = blog.filter(Q(title__startswith=key)|Q(blogcontent__startswith=key)|Q(author__startswith=key))
    bloglist = []

    for item in blog:
        blogdict={'id':item.id,'title':item.title,'abstract':item.abstract,'createdate':str(item.createdate),'modifydate':str(item.modifydate),'type':item.type,
                  'blogcontent':item.blogcontent,'hit':item.hit,'isTop':'checked' if item.isTop==1 else '','isorg':'checked' if item.isorg==1 else '','imgTitle':item.imgTitle}
        bloglist.append(blogdict)
    limit=request.GET.get('limit')
    paginator = Paginator(bloglist, limit)
    page = request.GET.get('page')
    bloglists = paginator.get_page(page)
    # print(userlists.object_list)
    defaultdict={"code":0,"msg":"","count":len(bloglist)}
    defaultdict['data']=bloglists.object_list
    print(defaultdict)
    return HttpResponse(json.dumps(defaultdict,cls=DateEncoder), content_type="application/json")

def deleteblog(request):
    if request.method=='GET':
        if request.GET.get('type')=='single':
            id=request.GET.get('id')

            models.Blog.objects.filter(id=id).delete()
            return JsonResponse({'message': '删除成功！'})
        elif request.GET.get('type')=='mult':
            id = request.GET.getlist('idlist[]')
            idlist=list(map(int,id))
            models.Blog.objects.filter(id__in=idlist).delete()
            return JsonResponse({'message':'删除成功！'})

def Top(request):
    isTop=request.GET.get('isTop')
    id=request.GET.get('id')
    Blog=models.Blog.objects.get(id=id)
    Blog.isTop=isTop
    Blog.save()
    return JsonResponse({'message': '修改成功！'})


def admin(request):
    if request.method=='GET':
        session_useraccount = request.session.get('useraccount')
        session_userid = request.session.get('userid')
        request.session.set_expiry(600)
        try:
            user=models.Users.objects.get(userid=session_userid)
        except:
            return redirect('login/')
        if user.userpic==None:
            userpic = '../../static/imgs/1.jpg'
        else:
            userpic = '../../static/'+user.userpic
        if session_useraccount and session_userid:
            return render(request, 'MyBlogAdmin/index.html',
                          {'username': user.username, 'id': session_userid, 'userpic': userpic})
        else:
            return redirect('login/')

def userinfo(request,userid):
    # if request.method=='POST':
    #     user = models.TblSysUser.objects.get(userid=userid)
    #     user.username=request.POST.get('username')
    #     user.usersex = request.POST.get('usersex')
    #     user.contactphone = request.POST.get('contactphone')
    #     user.mobilephone = request.POST.get('mobilephone')
    #     user.email = request.POST.get('email')
    #     user.useraddress = request.POST.get('useraddress')
    #     user.save()
    #     role = models.TblSysUserrolerelation.objects.get(userid=userid)
    #     roleinfo = models.TblSysRole.objects.get(roleid=role.roleid)
    #     result = {'userinfo': user,'role':roleinfo}
    #     return render(request, 'userinfo.html',result)
    # else:
    #     user = models.TblSysUser.user_objects.get(userid=userid)
    #     role=models.TblSysUserrolerelation.objects.get(userid=userid)
    #     roleinfo=models.TblSysRole.objects.get(roleid=role.roleid)
    #     result = {'userinfo': user,'role':roleinfo}
    return render(request, 'MyBlogAdmin/userinfo.html')

def password(request,userid):
    # if request.method=='POST':
    #     oldpassword=request.POST.get('oldPassword')
    #     user=models.TblSysUser.user_objects.get(userid=userid)
    #     print(user)
    #     if user.userpassword==hashsha1(oldpassword) and request.POST.get('type')=='1':
    #         newpassword=request.POST.get('password')
    #         repassword = request.POST.get('repassword')
    #         if newpassword==repassword:
    #             updatepassword=hashsha1(newpassword)
    #             user.userpassword=updatepassword
    #             user.save()
    #             return JsonResponse({ 'users': user.userid,'message':'密码修改成功！'})
    #             # return render(request, 'password.html',{ 'users': user,'message':'密码修改成功！'})
    #     elif user.userpassword==hashsha1(oldpassword) and request.POST.get('type')=='0':
    #         return JsonResponse({'users': user.userid, 'message': '旧密码验证OK！'})
    #     elif user.userpassword!=hashsha1(oldpassword):
    #         return JsonResponse({'users': user.userid, 'message': '旧密码输入错误！'})
    #     else:
    #         return JsonResponse({'users': user.userid, 'message': '未知错误！'})
    # elif request.method=='GET':
    #     user = models.TblSysUser.user_objects.get(userid=userid)
    #     # print(user)
    return render(request, 'MyBlogAdmin/password.html')

def upload_ajax(request):
    if request.method == 'POST':
        file_obj = request.FILES.get('file')
        print(file_obj)
        import os
        f = open(os.path.join(settings.BASE_DIR, 'MyBlog','static', 'imgs', file_obj.name), 'wb')
        print(file_obj, type(file_obj))
        for chunk in file_obj.chunks():
            f.write(chunk)
        f.close()
        print(request.POST.get('id'))
        # user=models.TblSysUser.objects.get(userid=request.POST.get('id'))
        # user.userpicture='imgs/'+str(file_obj)
        # user.save()
        return JsonResponse({'Code':0,'imgurl':'/static/imgs/'+str(file_obj)})
    else:
        return JsonResponse({'Code':-1})

def menushow(request):
    if request.session.get('userid')!=None:
        print(request.session.get('userid'))
        # role=models.TblSysUserrolerelation.objects.get(userid=request.session.get('userid'))
        if request.session.get('userid')==1:
            with open("../MyBlogWeb/MyBlog/static/common/menu.json", "r") as f:
                load_dict = json.load(f)
                backjson=load_dict
        else:
            with connection.cursor() as cursor:
                cursor.execute("SELECT  (case when a.id is NULL then 0 else a.id end) Mainid,"
                               +"tbl_sys_Menu.id ,"
                               + "a.MenuName MainMenu ,"
                               + "tbl_sys_Menu.MenuName,"
                               + "tbl_sys_Menu.url,"
                               + "tbl_sys_Menu.icon"
                               + " FROM    dbo.tbl_sys_Menu"
                               + " LEFT JOIN ( SELECT  *"
                               + " FROM    dbo.tbl_sys_Menu"
                               + " ) a ON a.id = tbl_sys_Menu.parentid"
                               + " LEFT JOIN Tbl_Sys_Tactics ON tbl_sys_Menu.id = Tbl_Sys_Tactics.menuwebid"
                               + " LEFT JOIN Tbl_Sys_RoleTactics ON Tbl_Sys_RoleTactics.TacticsID = Tbl_Sys_Tactics.TacticsID"
                               + " LEFT JOIN Tbl_Sys_Role ON Tbl_Sys_Role.RoleID = Tbl_Sys_RoleTactics.RoleID"
                               + " LEFT JOIN Tbl_Sys_UserRoleRelation ON Tbl_Sys_Role.RoleID = Tbl_Sys_UserRoleRelation.RoleID"
                               + " LEFT JOIN Tbl_Sys_User ON Tbl_Sys_UserRoleRelation.UserID = Tbl_Sys_User.UserID"
                               + " WHERE Tbl_Sys_User.UserID=%s", [request.session.get('userid')])
                menu = cursor.fetchall()
            # menu=models.VWtacticsRole.objects.filter(userid=request.session.get('userid')).values_list()
            backjson=[]
            menumain=[]
            menusub = []
            for i in menu:
                if i[0]==0:
                    menulist = {'name': i[3], 'url': i[4], 'icon':i[5],'childMenus': []}
                    backjson.append(menulist)
                    menumain.append(i[1])
                else:
                    if i[0] in menumain:
                        menusub.append(i[0])
                        menulist={'name':i[3],'url':i[4],'icon':i[5],'childMenus':None}
                        # menulist1.append(menulist)
                        a=[l for l in backjson if l['name']==i[2]]
                        a[0]['childMenus'].append(menulist)
            print(backjson)
        return HttpResponse(json.dumps(backjson), content_type="application/json")

def login(request):
    # userinfo=None
    with connection.cursor() as cursor:
        cursor.execute("select  * from Users where useraccount=%s", [request.POST.get('useraccount')])
        userinfo = cursor.fetchall()
        # print(userinfo)
    request.session.flush()
    if request.method == 'POST':
        useraccount = request.POST.get('useraccount')
        password = request.POST.get('password')
        # verifycode=request.POST.get('verifyCode')
        # orgverifycode = request.POST.get('trueverifyCode')
        # if verifycode==None:
        #     render(request, 'login.html', {'message': '请输入验证码'})
        # elif verifycode==orgverifycode:
        if useraccount and password:
            useraccount = useraccount.strip() # 用户认证
            try:
                user = models.Users.objects.get(useraccount=useraccount)
                print(user)
                if user.userpassword == password:
                    print('验证成功！',user)
                    request.session['useraccount'] = user.useraccount
                    request.session['userid'] = user.userid
                    return JsonResponse({'message':1,'useraccount': user.useraccount,'id':user.userid,'userinfo':userinfo})
                    # return render(request, 'index.html',{'useraccount': user.useraccount,'id':user.userid})
                else:
                    return JsonResponse({'message': 0})
            except:

                return JsonResponse({'message': -1})
        # else:
        #     return JsonResponse({'message': -2})
    else:
        return render(request, 'MyBlogAdmin/login.html',{'message':'欢迎访问'})

def editblog(request):
    if request.method=='POST':
        if request.POST.get('method')=='add':
            title=request.POST.get('title')
            abstract=request.POST.get('abstract')
            content = request.POST.get('blogcontent')
            isTop= 1 if request.POST.get('isTop')=='checked' else 0
            isorg = 1 if request.POST.get('isorg')=='checked' else 0
            imgTitle=request.POST.get('imgTitle')
            blog=models.Blog(title=title,author='admin',abstract=abstract,isTop=isTop,isorg=isorg,imgTitle=imgTitle,blogcontent=content,createdate=datetime.datetime.now(),hit=0)
            blog.save()
            return HttpResponse(json.dumps({'message':'文章添加成功'},cls=DateEncoder), content_type="application/json")
        elif request.POST.get('method')=='update':
            id=request.POST.get('id')
            title = request.POST.get('title')
            content = request.POST.get('blogcontent')
            isTop = 1 if request.POST.get('isTop') == 'checked' else 0
            isorg = 1 if request.POST.get('isorg') == 'checked' else 0
            imgTitle = request.POST.get('imgTitle')
            blog=models.Blog.objects.get(id=id)
            blog.title=title
            blog.imgTitle=imgTitle
            blog.blogcontent = content
            blog.isTop = isTop
            blog.isorg = isorg
            blog.save()
            return HttpResponse(json.dumps({'message': '文章修改成功'}, cls=DateEncoder), content_type="application/json")
    elif request.method=='GET':
        return render(request, 'MyBlogAdmin/BlogEdit.html', {'Blog': ''})