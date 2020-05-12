package ua.gov.dto;

import lombok.Getter;
import lombok.Setter;
import ua.gov.model.RoleType;

@Getter
@Setter
public class UserDTO {
    private Long id;
    private String fullName;
    private String email;
    private String password;
    private RoleType role;
    private String stateAgency;
    private String phoneNumber;
    private Boolean isActive;
}
