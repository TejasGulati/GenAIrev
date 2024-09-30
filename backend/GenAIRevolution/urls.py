from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('login', request=request, format=format),
        'ai_models': reverse('sustainability_report', request=request, format=format),
        # Add other API endpoints here as needed
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/ai_models/', include('ai_models.urls')),
    path('api/users/', include('users.urls')),
    # Serve React App
    re_path(r'^(?!api/).*', TemplateView.as_view(template_name='index.html'), name='react-app'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)