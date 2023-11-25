package com.noty.web.middleware;

import com.noty.web.components.CookieSessionUtil;
import com.noty.web.services.security.NotyImpersonation;
import com.noty.web.util.RequestUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;

@RequiredArgsConstructor
public class CookieAuthenticationFilter extends AuthenticationFilterBase {

    private static final Pattern pattern = Pattern.compile("-?\\d+");

    private CookieSessionUtil cookieSessionUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        applyCookieAuthentication(request);

        filterChain.doFilter(request, response);
    }

    private void applyCookieAuthentication(HttpServletRequest request) {
        Claims claims = cookieSessionUtil.getSessionCookie(request);
        if (claims == null)
            return;

        String serial = claims.get("serial", String.class);
        RequestUtil.setSerial(request, serial);

        NotyImpersonation user = NotyImpersonation.fromClaims(claims);

        WebAuthenticationDetails details = new WebAuthenticationDetailsSource()
                .buildDetails(request);
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                user,
                null,
                List.of(new SimpleGrantedAuthority("user"))
        );
        authentication.setDetails(details);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
