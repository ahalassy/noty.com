package com.noty.web.controllers.api;

import com.noty.web.NotyException;
import com.noty.web.NotyValidationException;
import com.noty.web.components.CookieSessionUtil;
import com.noty.web.components.JwtUtil;
import com.noty.web.services.Principal;
import com.noty.web.services.SessionProvider;
import com.noty.web.services.security.Credentials;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthenticationApiController {

    private final SessionProvider sessionProvider;

    private final CookieSessionUtil cookieSessionUtil;

    private final JwtUtil jwtUtil;

    @PostMapping("/auth")
    public String Authenticate(
            HttpServletResponse response,
            @ModelAttribute Credentials credentials,
            @RequestParam String cookie
    ) throws NotyException {
        if (credentials == null || !credentials.isValid())
            throw new NotyValidationException("Insufficient credentials.");

        Principal principal = sessionProvider.authenticate(credentials);

        if ("yes".equals(cookie)) {
            cookieSessionUtil.setSessionCookie(response, principal);
            return null;

        } else {
            return jwtUtil.encode(principal);

        }
    }

    @PostMapping("/release")
    public ResponseEntity<?> Authenticate(
            HttpServletResponse response
    ) {
        cookieSessionUtil.removeSessionCookie(response);
        return ResponseEntity.ok().build();
    }

}
