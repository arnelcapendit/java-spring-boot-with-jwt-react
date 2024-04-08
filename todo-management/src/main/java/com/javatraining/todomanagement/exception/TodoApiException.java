package com.javatraining.todomanagement.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;


@AllArgsConstructor
@Getter
public class TodoApiException extends RuntimeException {

    private HttpStatus httpStatus;
    private String message;

}

