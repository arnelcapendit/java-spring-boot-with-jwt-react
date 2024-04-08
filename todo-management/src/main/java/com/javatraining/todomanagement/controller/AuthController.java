package com.javatraining.todomanagement.controller;

import com.javatraining.todomanagement.dto.JwtAuthResponse;
import com.javatraining.todomanagement.dto.LoginDto;
import com.javatraining.todomanagement.dto.RegisterDto;
import com.javatraining.todomanagement.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        return new ResponseEntity<>(authService.register(registerDto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        JwtAuthResponse loginResponse = authService.login(loginDto);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

}
