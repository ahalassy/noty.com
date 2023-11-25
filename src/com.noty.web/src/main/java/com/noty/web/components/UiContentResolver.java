package com.noty.web.components;

import com.noty.web.NotyException;
import jakarta.servlet.http.HttpServletRequest;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Value;

public interface UiContentResolver {

    UiContent resolveContent(HttpServletRequest request) throws NotyException;

}
