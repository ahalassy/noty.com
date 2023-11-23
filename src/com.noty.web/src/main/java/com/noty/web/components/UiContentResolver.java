package com.noty.web.components;

import com.noty.web.NotyException;
import jakarta.servlet.http.HttpServletRequest;
import org.antlr.v4.runtime.misc.NotNull;

public interface UiContentResolver {

    UiContent resolveContent(HttpServletRequest request) throws NotyException;

}
