package com.example.hobbie.model.binding;

import com.example.hobbie.model.entities.UserRoleEntity;
import com.example.hobbie.model.entities.enums.GenderEnum;
import com.sun.istack.NotNull;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

public class UpdateClientBindingModel {

    private String username;
    private String fullName;
    private GenderEnum gender;
    private String email;
    private String password;
    private String confirmPassword;


    public UpdateClientBindingModel() {
    }


    @Size(min = 3, max = 20, message = " must be between 3 and 20 symbols.")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    @Size(min = 3, max = 20, message = " must be between 3 and 20 symbols.")
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @NotNull
    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }
    @NotNull
    @Pattern(regexp=".+@.+\\..+", message = " must be valid.")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    @Size(min = 3, max = 20, message = " must be between 3 and 20 symbols.")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Size(min = 3, max = 20, message = " must be between 3 and 20 symbols.")
    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

}
