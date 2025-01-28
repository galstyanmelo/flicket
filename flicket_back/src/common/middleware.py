from django.http import HttpResponseRedirect


class ImagesRedirectMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/images/'):
            redirect_url = '/static/images/' + request.path[len('/images/'):]
            return HttpResponseRedirect(redirect_url)

        return self.get_response(request)