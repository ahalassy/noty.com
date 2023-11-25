package com.noty.web.components.implementations;

import com.noty.web.NotyException;
import com.noty.web.components.UiContent;
import com.noty.web.components.UiContentResolver;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

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
    private final Log logger = LogFactory.getLog(getClass());

    @Value("${noty.ui.local_path}")
    private String localPath;

    private Path probeLocalPath(String requestPath) {
        if (!StringUtils.hasText(localPath))
            return null;

        Path filePath = Path.of(localPath, requestPath);
        return Files.exists(filePath)
                ? filePath
                : null;

    }

    private Path resolvePath(String requestPath, boolean isFallback) throws IOException, URISyntaxException {
        Path localPath = probeLocalPath(requestPath);
        if (localPath != null)
            return localPath;

        String resourcePath = RESOURCE_ROOT.concat(requestPath);

        ClassPathResource resource = new ClassPathResource(resourcePath);
        if ((!resource.isFile() || !resource.isReadable()) && !isFallback)
            return resolvePath(FALLBACK_RESOURCE, true);

        URL url = resource.getURL();
        return Paths.get(url.toURI());
    }

    @Override
    public UiContent resolveContent(HttpServletRequest request) throws NotyException {
        String requestPath = request.getRequestURI();
        try {
            Path path = resolvePath(requestPath, false);
            if (path == null) {
                logger.warn(String.format("Unable to resolve %s content path.", requestPath));
                return null;

            } else {
                logger.info(String.format("Serving %s from %s.", requestPath, path));

            }

            String mimeType = Files.probeContentType(path);
            return new UiContent(mimeType, path);

        } catch (IOException | URISyntaxException e) {
            throw new NotyException("Unable to resolve content.", e);
        }
    }
}
