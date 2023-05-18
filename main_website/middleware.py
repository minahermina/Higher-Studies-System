from django.shortcuts import render

class Force404Middleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Override the default 404 handling if it occurred
        if response.status_code == 404:
            return render(request, 'main_website/404.html', status=404)

        return response
