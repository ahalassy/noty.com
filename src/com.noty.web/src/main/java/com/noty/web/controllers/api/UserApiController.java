package com.noty.web.controllers.api;

import com.noty.web.NotyException;
import com.noty.web.model.Credentials;
import com.noty.web.model.NotyUser;
import com.noty.web.services.UserProvider;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
@AllArgsConstructor
public class UserApiController {

    private final UserProvider userProvider;

    @PostMapping("/")
    public NotyUser createUser(@RequestBody Credentials credentials) throws NotyException {
        return userProvider.createUser(credentials);

    }

}