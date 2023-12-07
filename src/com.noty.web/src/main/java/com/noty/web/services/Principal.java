package com.noty.web.services;

import com.noty.web.entities.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class Principal {

    Map<String, String> claims;
    private User user;

}
