package ua.gov.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="record")
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime executiveDocumentArrivalDate;

    @Column(nullable = false)
    private String executiveDocumentReceiver;

    @Column
    private String coverLetterCorrespondent;

    @Column
    private LocalDate coverLetterCreationDate;

    @Column
    private String coverLetterNumber;

    @Column(nullable = false)
    private Boolean coverLetterPresence;

    @Column(nullable = false)
    private String executiveDocumentTitle;

    @Column(nullable = false)
    private LocalDateTime executiveDocumentDate;

    @Column(nullable = false)
    private Long executiveDocumentNumberOfIssue;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="issuer_id", nullable=false)
    private Issuer executiveDocumentIssuer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="obligor_id", nullable=false)
    private Obligor obligor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="contractor_id", nullable=false)
    private Contractor contractor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="chargeback_category_id", nullable=false)
    private ChargebackCategory chargebackCategory;

    @Column(nullable = false)
    private LocalDateTime documentDateOfEntryIntoForce;

    @Column(nullable = false)
    private Long moneyAmountToBeRecovered;

    @Column
    private String informationAboutImplementationOfDecision;

    //todo creator user

    @Column
    private LocalDateTime createdAt;

    @Column
    private Boolean isActive;
}
