package com.noty.web.components;

import com.noty.web.entities.User;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

public interface CookieSessionUtil {

    void setSessionCookie(HttpServletResponse response, User user, Map<String, String> claims);

    Claims getSessionCookie(HttpServletRequest request);
}
