package com.example.hobbie.model.binding;

import com.example.hobbie.model.entities.UserRoleEntity;
import com.sun.istack.NotNull;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

public class UpdateBusinessBindingModel {

    private String username;
    private String businessName;
    private String address;
    private String email;
    private String password;
    private String confirmPassword;


    public UpdateBusinessBindingModel() {
    }

    @Size(min = 3, max = 20, message = " must be between 3 and 20 symbols")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    @Size(min = 2, max = 30, message = " must be between 2 and 30 symbols")
    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }
    @Size(min = 3, max = 30, message = " must be between 3 and 30 symbols")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
    @NotNull
    @Pattern(regexp=".+@.+\\..+", message = " must be valid")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    @Size(min = 3, max = 20, message = " must be between 3 and 20 symbols")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Size(min = 3, max = 20, message = " must be between 3 and 20 symbols")
    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

}
