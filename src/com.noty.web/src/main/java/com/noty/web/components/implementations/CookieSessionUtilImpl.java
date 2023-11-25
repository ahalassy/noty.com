package com.noty.web.components.implementations;

import com.noty.web.components.CookieSessionUtil;
import com.noty.web.components.JwtUtil;
import com.noty.web.entities.User;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@RequiredArgsConstructor
public class CookieSessionUtilImpl implements CookieSessionUtil {

    private final JwtUtil jwtUtil;

    @Value("noty.security.cookie_name")
    private String cookieName;

    @Value("noty.security.cookie_ttl")
    private int cookieTtl;

    @Override
    public void setSessionCookie(
            HttpServletResponse response,
            User user,
            Map<String, String> claims
    ) {
        String jwt = jwtUtil.encode(user, claims);

        Cookie cookie = new Cookie(cookieName, jwt);
        cookie.setMaxAge(cookieTtl);
        response.addCookie(cookie);
    }

    @Override
    public Claims getSessionCookie(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
                .filter(c -> Objects.equals(c.getName(), cookieName))
                .findFirst()
                .map(value -> jwtUtil.decode(value.getValue()))
                .orElse(null);

    }
}
