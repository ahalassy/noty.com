package com.noty.web.components.implementations;

import com.noty.web.components.CookieSessionUtil;
import com.noty.web.components.JwtUtil;
import com.noty.web.services.Principal;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Objects;

@RequiredArgsConstructor
@Component
public class CookieSessionUtilImpl implements CookieSessionUtil {

    private final JwtUtil jwtUtil;

    @Value("${noty.security.cookie_name}")
    private String cookieName;

    @Value("${noty.security.cookie_ttl}")
    private String cookieTtlText;

    @Value("${noty.app.domain}")
    private String appDomain;

    private int getCookieTtl() {
        return Integer.parseInt(cookieTtlText);
    }

    @Override
    public void removeSessionCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(cookieName, "");
        cookie.setDomain(appDomain);
        cookie.setMaxAge(-1);
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    @Override
    public void setSessionCookie(
            HttpServletResponse response,
            Principal principal
    ) {
        String jwt = jwtUtil.encode(principal);

        Cookie cookie = new Cookie(cookieName, jwt);
        cookie.setDomain(appDomain);
        cookie.setMaxAge(getCookieTtl());
        cookie.setPath("/");
        response.addCookie(cookie);
    }

    @Override
    public Claims getSessionCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null || cookies.length == 0)
            return null;

        try {
            return Arrays.stream(cookies)
                    .filter(c -> Objects.equals(c.getName(), cookieName) && StringUtils.hasText(c.getValue()))
                    .findFirst()
                    .map(value -> jwtUtil.decode(value.getValue()))
                    .orElse(null);
        } catch (Exception e) {
            return null;
        }

    }
}
