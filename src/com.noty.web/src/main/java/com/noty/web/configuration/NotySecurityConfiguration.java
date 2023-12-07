package com.noty.web.configuration;

import com.noty.web.components.CookieSessionUtil;
import com.noty.web.components.JwtUtil;
import com.noty.web.middleware.CookieAuthenticationFilter;
import com.noty.web.middleware.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class NotySecurityConfiguration {

    private static final String[] POST_WHITE_LIST = new String[]{
            "/api/auth",
            "/api/user"
    };
    private final JwtUtil jwtUtil;

    private final CookieSessionUtil cookieSessionUtil;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationTokenFilterBean() throws Exception {
        return new JwtAuthenticationFilter(jwtUtil);
    }

    @Bean
    public CookieAuthenticationFilter cookieAuthenticationTokenFilterBean() throws Exception {
        return new CookieAuthenticationFilter(cookieSessionUtil);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(jwtAuthenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(cookieAuthenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, POST_WHITE_LIST)
                        .permitAll()
                        .requestMatchers("/api/**")
                        .authenticated()
                        .anyRequest()
                        .permitAll()
                )
                .cors(AbstractHttpConfigurer::disable)
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }
}
