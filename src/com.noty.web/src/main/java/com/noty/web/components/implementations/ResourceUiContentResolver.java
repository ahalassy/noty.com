package com.noty.web.components.implementations;

import com.noty.web.NotyException;
import com.noty.web.components.UiContent;
import com.noty.web.components.UiContentResolver;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class ResourceUiContentResolver implements UiContentResolver {

    private final static String FALLBACK_RESOURCE = "/index.html";
    private final static String RESOURCE_ROOT = "static/ui";

    private static Path resolvePath(String requestPath, boolean isFallback) throws IOException, URISyntaxException {
        String resourcePath = RESOURCE_ROOT.concat(requestPath);

        ClassPathResource resource = new ClassPathResource(resourcePath);
        if (!resource.isFile() && !isFallback)
            return resolvePath(FALLBACK_RESOURCE, true);

        URL url = resource.getURL();
        return Paths.get(url.toURI());
    }

    @Override
    public UiContent resolveContent(HttpServletRequest request) throws NotyException {
        String requestPath = request.getRequestURI();
        try {
            Path path = resolvePath(requestPath, false);
            if (path == null)
                return null;

            String mimeType = Files.probeContentType(path);
            return new UiContent(mimeType, path);

        } catch (IOException | URISyntaxException e) {
            throw new NotyException("Unable to resolve content.", e);
        }
    }
}
