from rest_framework import serializers

from core.models import Search, SearchResponse


class SearchSerializer(serializers.ModelSerializer):
    """Serializer for the bookmarks object"""

    class Meta:
        model = Search
        fields = ('search', 'created', 'website')

    def create(self, validated_data):
        return Search(**validated_data)


class SearchResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = SearchResponse
        fields = ('title', 'page_url', 'price', 'img')
