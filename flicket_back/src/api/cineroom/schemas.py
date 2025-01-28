from drf_spectacular.utils import extend_schema

cinrooms_list = dict(
    name='get',
    decorator=extend_schema(
        summary="Cinrooms list",
    )
)
