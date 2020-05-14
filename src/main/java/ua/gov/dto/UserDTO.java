package ua.gov.dto;

import lombok.Getter;
import lombok.Setter;
import ua.gov.model.RoleType;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserDTO {
    private Long id;
    @NotBlank(message = "Ім'я не може бути пустим")
    private String fullName;
    @NotBlank(message = "Пошта не може бути пустою")
    private String email;
    @NotBlank(message = "Пароль не може бути пустим")
    private String password;
    private RoleType role;
    @NotBlank(message = "Назва жержавного органу не може бути пустим")
    private String stateAgency;
    @NotBlank(message = "Номер телефону не може бути пустим")
    private String phoneNumber;
    private Boolean isActive;
}
