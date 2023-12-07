package com.noty.web.components;

import com.noty.web.entities.User;
import com.noty.web.services.Principal;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public interface CookieSessionUtil {

    void removeSessionCookie(HttpServletResponse response);

    void setSessionCookie(HttpServletResponse response, Principal principal);

    Claims getSessionCookie(HttpServletRequest request);
}
