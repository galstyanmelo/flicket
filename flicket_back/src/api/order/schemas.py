from drf_spectacular.utils import extend_schema

movie_timetables_list = dict(
    name='get',
    decorator=extend_schema(
        summary="Movie timetables list",
    )
)