from django.contrib import admin

from .models import Blog,Users,Picture,BlogType,BlogTypeRelation,PicManage,PicTypeRelation,Category,CategoryToBlog
# 设置缩略图
class MediaAdmin(admin.ModelAdmin):
    readonly_fields = ('imgthumb',)  # 因为不需要在后台修改该项，所以设置为只读
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return self.readonly_fields
        return self.readonly_fields


admin.site.register(Blog)
admin.site.register(Users)
admin.site.register(Picture)
admin.site.register(PicTypeRelation)
admin.site.register(BlogType)
admin.site.register(BlogTypeRelation)
admin.site.register(Category)
admin.site.register(CategoryToBlog)
admin.site.register(PicManage, MediaAdmin)
