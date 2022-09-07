from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Posting


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posting
        fields = ('message', 'created_at', 'updated_at')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    posts = PostSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'posts')


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(allow_blank=False)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = super(UserRegisterSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class PostingSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    likes = serializers.SlugRelatedField(many=True, slug_field='username', read_only=True)

    class Meta:
        model = Posting
        fields = ('url', 'id', 'user', 'username', 'likes', 'message', 'created_at', 'updated_at')
        read_only_fields = ('user',)
