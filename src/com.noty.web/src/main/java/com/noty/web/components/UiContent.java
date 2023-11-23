package com.noty.web.components;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Getter
@AllArgsConstructor
public class UiContent {

    private String mimeType;
    private Path path;

    public static UiContent emtpy() {
        return new UiContent(null, null);
    }

    public boolean isEmpty() {
        return mimeType == null && path == null;
    }

    public void setResponse(HttpServletResponse response) throws IOException {
        if (isEmpty()) {
            response.setStatus(404);

        } else {
            byte[] content = Files.readAllBytes(path);
            String mimeType = Files.probeContentType(path);

            response.setContentType(mimeType);
            response.setContentLength(content.length);
            response.getOutputStream().write(content);
            response.getOutputStream().flush();
        }
    }

}
