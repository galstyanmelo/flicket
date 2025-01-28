from drf_spectacular.utils import extend_schema

movies_list = dict(
    name='get',
    decorator=extend_schema(
        summary="Movies list",
    )
)