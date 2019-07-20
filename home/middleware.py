import logging,datetime
def simple_middleware(get_response):
    # One-time configuration and initialization.

    def middleware(request):
        # request.META["POOP"] = 'POOOOOOP'
        # request.META["REMOTE_ADDR"] = ""
        print('requets dir' , dir(request))
        print('\nTIME: ', datetime.datetime.now())
        print('\nUSER', request.user)
        print('\nreq session', dir(request.session))
        print('\nreq session', request.session.keys())
        print(request.session.session_key)


        # print('\nheaders: ', request.headers)
        # print('\rrequest.GET: ', request.GET)
        # print('\rrequest.POST: ', request.POST)
        # print('\rrequest.META: ', request.META)
        request.META["REMOTE_ADDR"] = ""

        logging.debug(request.META)

        # if "HTTP_X_FORWARDED_FOR" in request.META.keys():
        #
        #     request.META["HTTP_X_PROXY_REMOTE_ADDR"] = request.META["REMOTE_ADDR"]
        #     parts = request.META["HTTP_X_FORWARDED_FOR"].split(",", 1)
        #     request.META["REMOTE_ADDR"] = parts[0]

        # print(dir(get_response(request)))

        response = get_response(request)

        # print(response._headers)
        # print(response._request)
        # print('\n response: ', response)
        # print(response.reason_phrase)
        # print('response dir' , dir(response))
        # print('\nuser: ', response.user)
        # print('\nheaders: ', response.headers)


        # Code to be executed for each request/response after
        # the view is called.

        return response

    return middleware
