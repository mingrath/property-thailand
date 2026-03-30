self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|images|favicon.ico).*))(\\\\.json)?[\\/#\\?]?$",
    "originalSource": "/((?!api|_next|images|favicon.ico).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()