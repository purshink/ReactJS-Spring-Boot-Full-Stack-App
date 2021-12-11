package com.example.hobbie.handler;

public class FailToDeleteException extends RuntimeException{
    public FailToDeleteException(String message){
        super(message);
    }
}
