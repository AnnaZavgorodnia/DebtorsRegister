package ua.gov.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ObligorDTO {
    private String fullName;
    private LocalDate birthDate;
    private String identificationCode;
    private Long chargebackCategory;
    private Boolean isLegalEntity;
}
