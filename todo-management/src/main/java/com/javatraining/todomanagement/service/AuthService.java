package com.javatraining.todomanagement.service;

import com.javatraining.todomanagement.dto.JwtAuthResponse;
import com.javatraining.todomanagement.dto.LoginDto;
import com.javatraining.todomanagement.dto.RegisterDto;
import com.javatraining.todomanagement.exception.TodoApiException;
import com.javatraining.todomanagement.model.Role;
import com.javatraining.todomanagement.model.User;
import com.javatraining.todomanagement.repository.RoleRepository;
import com.javatraining.todomanagement.repository.UserRepository;
import com.javatraining.todomanagement.security.JwtTokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthService {

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    private JwtTokenProvider jwtTokenProvider;

    public String register(RegisterDto registerDto){

        if(userRepository.existsByUsername(registerDto.getUsername())) {
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new TodoApiException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setEmail(registerDto.getEmail());
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));


        Set<Role> roles = new HashSet<>();
        Role roleUser = roleRepository.findByName("ROLE_USER");
        roles.add(roleUser);

        user.setRoles(roles);

        userRepository.save(user);

        return "User registered successfully";
    }

    public JwtAuthResponse login(LoginDto loginDto){

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        Optional<User> userOptional = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail());

        String role = null;
        if(userOptional.isPresent()){
            User loggedInUser = userOptional.get();

            Optional<Role> roleOptional = loggedInUser.getRoles().stream().findFirst();
            
            if(roleOptional.isPresent()) {
                Role userRole = roleOptional.get();
                role = userRole.getName();
            }
        }

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        jwtAuthResponse.setRole(role);

        return jwtAuthResponse;
    }
}
