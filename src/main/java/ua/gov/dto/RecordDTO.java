package ua.gov.dto;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RecordDTO {
    private Long id;
    private String obligorFullName;
    private LocalDate obligorBirthDate;
    private String obligorPassportNumber;
    private String obligorIdentificationCode;
    private Long chargebackCategory;
    private String obligorBankAccountNumber;
    private String obligorPhoneNumber;
    private String obligorFaxNumber;
    private String obligorEmail;
    private Boolean isLegalEntity;
    private String contractorBankAccountNumber;
    private String contractorPhoneNumber;
    private String contractorFaxNumber;
    private String contractorEmail;
    private String contractorFullName;
    private LocalDateTime executiveDocumentArrivalDate;
    private Boolean coverLetterPresent;
    private String coverLetterCorrespondent;
    private LocalDate coverLetterCreationDate;
    private String coverLetterNumber;
    private String executiveDocumentReceiver;
    private String executiveDocumentTitle;
    private LocalDateTime executiveDocumentDate;
    private Long executiveDocumentNumber;
    private String issuerStateAgency;
    private String issuerFullName;
    private String issuerPosition;
    private LocalDateTime documentDateOfEntryIntoForce;
    private Long amountOfMoneyToBeRecovered;
    private String decisionImplementationDetails;
}
