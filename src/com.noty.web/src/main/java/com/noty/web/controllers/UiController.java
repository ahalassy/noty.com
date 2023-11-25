package com.noty.web.controllers;

import com.noty.web.NotyException;
import com.noty.web.components.UiContent;
import com.noty.web.components.UiContentResolver;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class UiController {

    private final UiContentResolver contentResolver;

    @GetMapping("/**")
    public void home(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws NotyException, IOException {
        UiContent content = contentResolver.resolveContent(request);
        content.setResponse(response);

        String requestPath = request.getRequestURI();
    }
}
