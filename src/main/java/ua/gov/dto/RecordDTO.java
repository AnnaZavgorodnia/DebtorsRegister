package ua.gov.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RecordDTO {
    private Long id;
    @NotBlank
    private String obligorFullName;
    private LocalDate obligorBirthDate;
    private String obligorPassportNumber;
    @NotBlank
    private String obligorIdentificationCode;
    @NotNull
    private Long chargebackCategory;
    private String obligorBankAccountNumber;
    private String obligorPhoneNumber;
    private String obligorFaxNumber;
    @NotBlank
    private String obligorEmail;
    @NotNull
    private Boolean isLegalEntity;
    private String contractorBankAccountNumber;
    private String contractorPhoneNumber;
    private String contractorFaxNumber;
    @NotBlank
    private String contractorEmail;
    @NotBlank
    private String contractorFullName;
    @NotNull
    private LocalDate executiveDocumentArrivalDate;
    @NotNull
    private Boolean coverLetterPresent;
    private String coverLetterCorrespondent;
    private LocalDate coverLetterCreationDate;
    private String coverLetterNumber;
    @NotBlank
    private String executiveDocumentReceiver;
    @NotBlank
    private String executiveDocumentTitle;
    @NotNull
    private LocalDate executiveDocumentDate;
    @NotNull
    private Long executiveDocumentNumber;
    private String issuerPhoneNumber;
    private String issuerEmail;
    @NotBlank
    private String issuerStateAgency;
    @NotBlank
    private String issuerFullName;
    @NotBlank
    private String issuerPosition;
    @NotNull
    private LocalDate documentDateOfEntryIntoForce;
    @NotNull
    private Long amountOfMoneyToBeRecovered;
    private String decisionImplementationDetails;
    private String userEmail;
}
