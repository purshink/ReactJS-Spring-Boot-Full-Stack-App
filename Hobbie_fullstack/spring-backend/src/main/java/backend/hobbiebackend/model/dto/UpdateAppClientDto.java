package backend.hobbiebackend.model.dto;

import backend.hobbiebackend.model.entities.enums.GenderEnum;

public class UpdateAppClientDto{
        private Long id;
        private String fullName;
        private GenderEnum gender;
        private String password;


    public Long getId() {
        return id;
    }


    public String getFullName() {
        return fullName;
    }

    public GenderEnum getGender() {
        return gender;
    }


    public String getPassword() {
        return password;
    }


}
