package backend.hobbiebackend.model.dto;

import backend.hobbiebackend.model.entities.enums.GenderEnum;

public class UpdateAppClientDto {
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
