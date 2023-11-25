package com.noty.web.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class RequestUtil {

    private final static String REQUEST_SERIAL_KEY = "noty.request-serial";

    public static void setSerial(HttpServletRequest request, String serial) {
        request.setAttribute(REQUEST_SERIAL_KEY, serial);
    }

    public static String getSerial(HttpServletRequest request) {
        return (String) request.getAttribute(REQUEST_SERIAL_KEY);
    }

}
