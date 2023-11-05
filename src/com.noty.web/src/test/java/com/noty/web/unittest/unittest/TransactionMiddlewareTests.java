package com.noty.web.unittest.unittest;

import com.noty.web.middleware.TransactionMiddleware;
import com.noty.web.services.TrackingResult;
import com.noty.web.services.TransactionTracker;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.mockito.Mockito.*;

public class TransactionMiddlewareTests {

    @Test
    public void shouldSkipFoundRequest() throws ServletException, IOException {
        // Arrange:
        TransactionTracker trackerMock = mock(TransactionTracker.class);
        when(trackerMock.trackTransaction("sr-1", "tr-1"))
                .thenReturn(TrackingResult.FOUND);

        HttpServletRequest request = mock(HttpServletRequest.class);
        when(request.getHeader("Transaction")).thenReturn("tr-1");
        when(request.getAttribute("serial")).thenReturn("sr-1");
        when(request.getMethod()).thenReturn("POST");

        HttpServletResponse response = mock(HttpServletResponse.class);
        FilterChain chain = mock(FilterChain.class);

        TransactionMiddleware.TransactionFilter filter = new TransactionMiddleware.TransactionFilter(trackerMock);

        // Act:
        filter.doFilter(
                request,
                response,
                chain
        );

        // Assert:
        verify(response, times(1)).setHeader("Transaction", "tr-1");
        verify(chain, times(0)).doFilter(request, response);

    }

}