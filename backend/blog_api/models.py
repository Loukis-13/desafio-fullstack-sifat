from django.db import models


class Posting(models.Model):
    user = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    likes = models.ManyToManyField('auth.User', related_name='likes', blank=True)
    message = models.TextField(max_length=300, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
