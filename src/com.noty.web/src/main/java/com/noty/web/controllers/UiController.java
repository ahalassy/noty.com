package com.noty.web.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
public class UiController {


    private static Path resolvePath(String requestPath, boolean isFallback) throws IOException, URISyntaxException {
        ClassPathResource resource = new ClassPathResource(String.format("static/ui%s", requestPath));
        if (!resource.isFile() && !isFallback)
            return resolvePath("/index.html", true);

        URL url = resource.getURL();
        return Paths.get(url.toURI());
    }

    @GetMapping("/**")
    public void home(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException, URISyntaxException {
        String requestPath = request.getRequestURI();

        Path path = resolvePath(requestPath, false);
        if (path == null) {
            response.setStatus(404);
            return;
        }

        byte[] content = Files.readAllBytes(path);
        String mimeType = Files.probeContentType(path);

        response.setContentType(mimeType);
        response.setContentLength(content.length);
        response.getOutputStream().write(content);
        response.getOutputStream().flush();
    }

}
