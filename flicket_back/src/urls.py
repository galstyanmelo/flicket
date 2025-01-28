"""
URL configuration for flicket_back project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView

docs = [
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url='/schema'), name='swagger-ui'),
]

urlpatterns = docs + [
    path('admin/', admin.site.urls),
    path("movie/", include("src.api.movie.urls")),
    path("cineroom/", include("src.api.cineroom.urls")),
    path("order/", include("src.api.order.urls")),
    path('images/<path:image_path>/', RedirectView.as_view(url='/static/images/%(image_path)s', permanent=True)),
    re_path(r'^$', TemplateView.as_view(template_name='index.html')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
