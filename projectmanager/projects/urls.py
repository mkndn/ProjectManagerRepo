from rest_framework import routers
from projects.api import ProjectViewSet


router = routers.DefaultRouter()
router.register("api/projects", ProjectViewSet, "projects")

urlpatterns = router.urls
