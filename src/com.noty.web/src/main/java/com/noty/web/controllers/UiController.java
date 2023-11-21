package com.noty.web.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UiController {

    @GetMapping("/**")
    public String home() {

        return "Okai";

    }

}
