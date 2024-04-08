package com.javatraining.todomanagement.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class ErrorDetails {

    private LocalDateTime localDateTime;
    private String message;
    private String details;

}
