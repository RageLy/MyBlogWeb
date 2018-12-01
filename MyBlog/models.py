from django.db import connection, models
from django.db.models.fields.files import ImageFieldFile
from PIL import Image
from MyBlogWeb.settings import MEDIA_ROOT
import os, datetime, uuid
import re

class BlogManager(models.Manager):
    def blogSet(self):
        cursor = connection.cursor()
        cursor.execute("""
            SELECT *
            FROM Blog
            """)
        return [row for row in cursor.fetchall()]

class Blog(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    title = models.CharField(db_column='Title', max_length=50, blank=True, null=True)  # Field name made lowercase.
    abstract=models.CharField(db_column='abstract', max_length=300, blank=True, null=True)
    createdate = models.DateTimeField(db_column='createdate', blank=True, null=True)  # Field name made lowercase.
    modifydate=models.DateTimeField(db_column='modifydate', blank=True, null=True)
    author = models.CharField(db_column='Author', max_length=50, blank=True, null=True)  # Field name made lowercase.
    blogcontent = models.TextField(db_column='blogcontent', blank=True, null=True)  #
    hit = models.IntegerField(db_column='hit',blank=True, null=True)
    isTop = models.IntegerField(db_column='isTop', blank=True, null=True)
    isorg = models.IntegerField(db_column='isorg', blank=True, null=True)
    type = models.IntegerField(db_column='Type',blank=True, null=True)
    imgTitle = models.CharField(db_column='imgTitle', max_length=50, blank=True, null=True)  # Field name made lowercase.
    Category = models.CharField(db_column='Category', max_length=50, blank=True,null=True)  # Field name made lowercase.
    year = models.CharField(db_column='year', max_length=4, blank=True,
                                null=True)  # Field name made lowercase.
    month = models.CharField(db_column='month', max_length=2, blank=True,
                                null=True)  # Field name made lowercase.
    day = models.CharField(db_column='day', max_length=2, blank=True,
                                null=True)  # Field name made lowercase.
    blog_blogtype = models.ManyToManyField(to="BlogType",
                                     through="BlogTypeRelation",
                                     through_fields=("Blog", "BlogType"))
    blog_CategoryToBlog = models.ManyToManyField(to="Category",
                                           through="CategoryToBlog",
                                           through_fields=("Blog", "Category"))
    objects = models.Manager()
    blog_objects = BlogManager()

    def __str__(self):
        dr = re.compile(r'<[^>]+>',re.S)
        dd = dr.sub('', self.blogcontent)
        if len(dd)>500:
            return '{0}...'.format(dd[0:499])
        else:
            return '{0}...'.format(dd)

    class Meta:
        managed = False
        db_table = 'Blog'

class UserManager(models.Manager):
    def userSet(self):
        cursor = connection.cursor()
        cursor.execute("""
            SELECT *
            FROM Users
            """)
        return [row for row in cursor.fetchall()]

class Users(models.Model):
    userid = models.AutoField(db_column='userid', primary_key=True)  # Field name made lowercase.
    useraccount = models.CharField(db_column='useraccount', max_length=50, blank=True,
                                   null=True)  # Field name made lowercase.
    userpassword = models.CharField(db_column='userpassword', max_length=50, blank=True,
                                    null=True)  # Field name made lowercase.
    username = models.CharField(db_column='username', max_length=200, blank=True,
                                null=True)  # Field name made lowercase.
    # usersex = models.CharField(db_column='UserSex', max_length=50, blank=True, null=True)  # Field name made lowercase.
    # contactphone = models.CharField(db_column='ContactPhone', max_length=200, blank=True, null=True)  # Field name made lowercase.
    # mobilephone = models.CharField(db_column='Mobilephone', max_length=200, blank=True, null=True)  # Field name made lowercase.
    # email = models.CharField(db_column='Email', max_length=200, blank=True, null=True)  # Field name made lowercase.
    userpic = models.CharField(db_column='userpic', max_length=50, blank=True, null=True)  # Field name made lowercase.
    # useraddress = models.CharField(db_column='UserAddress', max_length=500, blank=True, null=True)  # Field name made lowercase.
    # operatorid = models.CharField(db_column='OperatorID', max_length=5, blank=True, null=True)  # Field name made lowercase.
    objects = models.Manager()
    user_objects = UserManager()

    class Meta:
        managed = False
        db_table = 'Users'

class BlogTypeManager(models.Manager):
    def blogtypeSet(self):
        cursor = connection.cursor()
        cursor.execute("""
            SELECT *
            FROM BlogType
            """)
        return [row for row in cursor.fetchall()]

class BlogType(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    TypeName = models.CharField(db_column='TypeName', max_length=50, blank=True, null=True)  # Field name made lowercase.
    category=models.IntegerField(db_column='category',blank=True, null=True)
    objects = models.Manager()
    blogtype_objects = BlogTypeManager()
    blogtype_blog= models.ManyToManyField(to="Blog",
                                           through="BlogTypeRelation",
                                           through_fields=("BlogType", "Blog"))
    pictype_pic = models.ManyToManyField(to="PicManage",
                                           through="PicTypeRelation",
                                           through_fields=("type", "pictureManage"))
    class Meta:
        managed = False
        db_table = 'BlogType'

class BlogTypeRelation(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    Blog = models.ForeignKey(to="Blog",to_field="id",on_delete=models.CASCADE)
    BlogType = models.ForeignKey(to="BlogType",to_field="id",on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'BlogTypeRelation'
        unique_together=("Blog","BlogType")

class PicTypeRelation(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    pictureManage = models.ForeignKey(to="PicManage",to_field="id",on_delete=models.CASCADE)
    type = models.ForeignKey(to="BlogType",to_field="id",on_delete=models.CASCADE)
    # objects = models.Manager()
    # blogtyperelation_objects = BlogTypeRelationManager()

    class Meta:
        managed = False
        db_table = 'PicTypeRelation'
        unique_together=("pictureManage","type")

class PictureManager(models.Manager):
    def pictureSet(self):
        cursor = connection.cursor()
        cursor.execute("""
            SELECT *
            FROM BlogType
            """)
        return [row for row in cursor.fetchall()]

class Picture(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    pic = models.ForeignKey(to="PicManage", to_field="id", on_delete=models.CASCADE)
    picdesc = models.CharField(db_column='picdesc', max_length=200, blank=True, null=True)  # Field name made lowercase.
    url = models.CharField(db_column='url',max_length=50, blank=True)  # Field name made lowercase.
    objects = models.Manager()
    picture_objects = PictureManager()

    class Meta:
        managed = False
        db_table = 'Picture'

class PicManageManager(models.Manager):
    def picManagetureSet(self):
        cursor = connection.cursor()
        cursor.execute("""
            SELECT *
            FROM PicManage
            """)
        return [row for row in cursor.fetchall()]

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

# 制作缩略图

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



class PicManage(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    title = models.CharField(db_column='title', max_length=50, blank=True, null=True)  # Field name made lowercase.
    picdesc = models.CharField(db_column='picdesc', max_length=200, blank=True, null=True)  # Field name made lowercase.
    # 商品图片
    img = models.ImageField(upload_to=generate_filename, null=True)
    # 商品缩略图
    imgthumb = models.ImageField(upload_to=generate_filename_thumb, null=True)
    # url = models.CharField(db_column='url', max_length=50, blank=True, null=True)  # Field name made lowercase.
    author = models.CharField(db_column='author', max_length=50, blank=True, null=True)  # Field name made lowercase.
    createdate = models.DateTimeField(db_column='createdate', blank=True, null=True)  # Field name made lowercase.
    modifydate = models.DateTimeField(db_column='modifydate',  blank=True, null=True)  # Field name made lowercase.
    # type = models.IntegerField(db_column='type',blank=True, null=True)  # Field name made lowercase.
    pic_pictype = models.ManyToManyField(to="BlogType",
                                           through="PicTypeRelation",
                                           through_fields=("pictureManage", "type"))
    objects = models.Manager()
    picmanage_objects = PicManageManager()

    class Meta:
        managed = False
        db_table = 'PicManage'

    def save(self):
        super(PicManage, self).save()  # 将上传的图片先保存一下，否则报错
        base, ext = os.path.splitext(os.path.basename(self.img.path))
        thumb_pixbuf = make_thumb(os.path.join(MEDIA_ROOT, self.img.name))
        relate_thumb_path = os.path.join(THUMB_ROOT, base + '_thumb' + ext)
        thumb_path = os.path.join(MEDIA_ROOT, relate_thumb_path)
        thumb_pixbuf.save(thumb_path)
        self.imgthumb = ImageFieldFile(self, self.imgthumb, relate_thumb_path)
        super(PicManage, self).save()  # 再保存一下，包括缩略图等



class CommentManager(models.Manager):
    def commentSet(self):
        cursor = connection.cursor()
        cursor.execute("""
            SELECT *
            FROM Comment
            """)
        return [row for row in cursor.fetchall()]

class Comment(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    blog = models.ForeignKey(to="Blog", to_field="id", on_delete=models.CASCADE)  # Field name made lowercase.
    commentContent = models.TextField(db_column='commentContent', blank=True, null=True)  # Field name made lowercase.
    username = models.CharField(db_column='username', max_length=50, blank=True, null=True)
    email = models.CharField(db_column='email', max_length=50, blank=True, null=True)
    createdate = models.DateTimeField(db_column='createdate', blank=True, null=True)  # Field name made lowercase.
    country = models.CharField(db_column='country', max_length=50, blank=True, null=True)
    region = models.CharField(db_column='region', max_length=50, blank=True, null=True)
    city = models.CharField(db_column='city', max_length=20, blank=True, null=True)
    brower = models.CharField(db_column='brower', max_length=20, blank=True, null=True)
    device = models.CharField(db_column='device', max_length=20, blank=True, null=True)
    system = models.CharField(db_column='system', max_length=20, blank=True, null=True)
    userpic = models.CharField(db_column='userpic', max_length=50, blank=True, null=True)
    website = models.CharField(db_column='website', max_length=50, blank=True, null=True)
    likeNum = models.IntegerField(db_column='likeNum', blank=True, null=True)  # Field name made lowercase.
    objects = models.Manager()
    comment_objects = CommentManager()

    class Meta:
        managed = False
        db_table = 'Comment'

class ReplyManager(models.Manager):
    def replySet(self):
        cursor = connection.cursor()
        cursor.execute("""
            SELECT *
            FROM Reply
            """)
        return [row for row in cursor.fetchall()]

class Reply(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    comment = models.ForeignKey(to="Comment", to_field="id", on_delete=models.CASCADE)
    blog = models.ForeignKey(to="Blog", to_field="id", on_delete=models.CASCADE)  # Field name made lowercase.
    replyContent = models.TextField(db_column='replyContent', blank=True, null=True)  # Field name made lowercase.
    user = models.OneToOneField("Users", to_field="userid", on_delete=models.CASCADE)# Field name made lowercase.
    createdate = models.DateTimeField(db_column='createdate', blank=True, null=True)  # Field name made lowercase.
    reply_type=models.CharField(db_column='reply_type', max_length=50, blank=True, null=True)
    userpic = models.CharField(db_column='userpic',max_length=50, blank=True, null=True)  # Field name made lowercase.
    likeNum = models.IntegerField(db_column='likeNum', blank=True, null=True)  # Field name made lowercase.
    country = models.CharField(db_column='country', max_length=50, blank=True, null=True)
    region = models.CharField(db_column='region', max_length=50, blank=True, null=True)
    city = models.CharField(db_column='city', max_length=20, blank=True, null=True)
    brower = models.CharField(db_column='brower', max_length=20, blank=True, null=True)
    device = models.CharField(db_column='device', max_length=20, blank=True, null=True)
    system = models.CharField(db_column='system', max_length=20, blank=True, null=True)
    objects = models.Manager()
    reply_objects = ReplyManager()

    class Meta:
        managed = False
        db_table = 'Reply'

class WebLink(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    weburl=models.CharField(db_column='Weburl', max_length=50, blank=True, null=True)
    picurl = models.CharField(db_column='Picurl', max_length=50, blank=True, null=True)
    name = models.CharField(db_column='Name', max_length=50, blank=True, null=True)
    webDesc = models.CharField(db_column='WebDesc', max_length=50, blank=True, null=True)
    objects = models.Manager()

    class Meta:
        managed = False
        db_table = 'WebLink'

class MessageTb(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    MessageContent=models.TextField(db_column='MessageContent', blank=True, null=True)
    userid = models.CharField(db_column='userid', max_length=50, blank=True, null=True)
    username = models.CharField(db_column='username', max_length=50, blank=True, null=True)
    userpic = models.CharField(db_column='userpic', max_length=50, blank=True, null=True)
    email = models.CharField(db_column='email', max_length=50, blank=True, null=True)
    website = models.CharField(db_column='website', max_length=50, blank=True, null=True)
    createdate=models.DateTimeField(db_column='createdate', blank=True, null=True)
    ip=models.CharField(db_column='ip', max_length=20, blank=True, null=True)
    country = models.CharField(db_column='country', max_length=50, blank=True, null=True)
    region = models.CharField(db_column='region', max_length=50, blank=True, null=True)
    city = models.CharField(db_column='city', max_length=20, blank=True, null=True)
    brower = models.CharField(db_column='brower', max_length=20, blank=True, null=True)
    device = models.CharField(db_column='device', max_length=20, blank=True, null=True)
    system = models.CharField(db_column='system', max_length=20, blank=True, null=True)
    objects = models.Manager()

    class Meta:
        managed = False
        db_table = 'MessageTb'

    def object_to_json(obj):
        return dict([(kk, obj.__dict__[kk]) for kk in obj.__dict__.keys() if kk != "_state"])

class Category(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    Name = models.CharField(db_column='Name', max_length=50, blank=True, null=True)
    objects = models.Manager()
    CategoryToBlog_Blog = models.ManyToManyField(to="Blog",
                                           through="CategoryToBlog",
                                           through_fields=("Category", "Blog"))
    class Meta:
        managed = False
        db_table = 'Category'

class CategoryToBlog(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    Blog = models.ForeignKey(to="Blog", to_field="id", on_delete=models.CASCADE)
    Category = models.ForeignKey(to="Category", to_field="id", on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'CategoryToBlog'
        unique_together = ("Blog", "Category")