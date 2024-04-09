package com.finalproject.backend.controllers;

public class LoginResponse {
    private final String email;
    private final String password;
    private final Boolean loggedIn = true;

    public LoginResponse(String email, String password) {

        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getLoggedIn() {
        return loggedIn;
    }
}
