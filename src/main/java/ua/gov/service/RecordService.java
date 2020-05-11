package ua.gov.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.gov.dto.RecordDTO;
import ua.gov.model.ChargebackCategory;
import ua.gov.model.Contractor;
import ua.gov.model.Issuer;
import ua.gov.model.Obligor;
import ua.gov.model.Record;
import ua.gov.repository.ChargebackCategoryRepository;
import ua.gov.repository.ContractorRepository;
import ua.gov.repository.IssuerRepository;
import ua.gov.repository.ObligorRepository;
import ua.gov.repository.RecordRepository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository repository;
    private final ObligorRepository obligorRepository;
    private final IssuerRepository issuerRepository;
    private final ContractorRepository contractorRepository;
    private final ChargebackCategoryRepository chargebackCategoryRepository;

    @Transactional
    public Long create(RecordDTO dto){
        Optional<Obligor> existingO = obligorRepository.findByFullName(dto.getObligorFullName());
        Obligor obligor = existingO.orElseGet(()->obligorRepository.save(getObligorFromRecordDTO(dto)));

        Optional<Issuer> existingI = issuerRepository.findByFullName(dto.getIssuerFullName());
        Issuer issuer = existingI.orElseGet(()->issuerRepository.save(getIssuerFromRecordDTO(dto)));

        Optional<Contractor> existingC = contractorRepository.findByFullName(dto.getContractorFullName());
        Contractor contractor = existingC.orElseGet(()->contractorRepository.save(getContractorFromRecordDTO(dto)));

        ChargebackCategory category = chargebackCategoryRepository.getOne(dto.getChargebackCategory());

        Record record = new Record();
        record.setExecutiveDocumentArrivalDate(dto.getExecutiveDocumentArrivalDate());
        record.setCoverLetterPresence(dto.getCoverLetterPresent());
        record.setCoverLetterCorrespondent(dto.getCoverLetterCorrespondent());
        record.setCoverLetterCreationDate(dto.getCoverLetterCreationDate());
        record.setCoverLetterNumber(dto.getCoverLetterNumber());
        record.setExecutiveDocumentReceiver(dto.getExecutiveDocumentReceiver());
        record.setExecutiveDocumentTitle(dto.getExecutiveDocumentTitle());
        record.setExecutiveDocumentDate(dto.getExecutiveDocumentDate());
        record.setExecutiveDocumentNumberOfIssue(dto.getExecutiveDocumentNumber());
        record.setDocumentDateOfEntryIntoForce(dto.getDocumentDateOfEntryIntoForce());
        record.setMoneyAmountToBeRecovered(dto.getAmountOfMoneyToBeRecovered());
        record.setInformationAboutImplementationOfDecision(dto.getDecisionImplementationDetails());
        record.setObligor(obligor);
        record.setExecutiveDocumentIssuer(issuer);
        record.setContractor(contractor);
        record.setChargebackCategory(category);
        record.setCreatedAt(LocalDateTime.now());
        record.setIsActive(true);

        return repository.save(record).getId();
    }

    private Contractor getContractorFromRecordDTO(RecordDTO dto){
        Contractor contractor = new Contractor();

        contractor.setBankAccountNumber(dto.getContractorBankAccountNumber());
        contractor.setPhoneNumber(dto.getContractorPhoneNumber());
        contractor.setFaxNumber(dto.getContractorFaxNumber());
        contractor.setEmail(dto.getContractorEmail());
        contractor.setFullName(dto.getContractorFullName());

        return contractor;
    }

    private Issuer getIssuerFromRecordDTO(RecordDTO dto){
        Issuer issuer = new Issuer();

        issuer.setFullName(dto.getIssuerFullName());
        issuer.setPosition(dto.getIssuerPosition());
        issuer.setStateAgency(dto.getIssuerStateAgency());

        //todo phoneNumber and email from regestrator(logged in user)
        issuer.setEmail("email");
        issuer.setPhoneNumber("phone number");

        return issuer;
    }

    private Obligor getObligorFromRecordDTO(RecordDTO dto){
        Obligor obligor = new Obligor();

        obligor.setFullName(dto.getObligorFullName());
        obligor.setBirthDate(dto.getObligorBirthDate());
        obligor.setPassportNumber(dto.getObligorPassportNumber());
        obligor.setIdentificationCode(dto.getObligorIdentificationCode());
        obligor.setBankAccountNumber(dto.getObligorBankAccountNumber());
        obligor.setPhoneNumber(dto.getObligorPhoneNumber());
        obligor.setFaxNumber(dto.getObligorFaxNumber());
        obligor.setEmail(dto.getObligorEmail());
        obligor.setIsLegalEntity(dto.getIsLegalEntity());

        return obligor;
    }

    public void deleteById(Long id){
        Record record = repository.findById(id).orElseGet(null);
        if(record != null){
            record.setIsActive(false);
            repository.save(record);
        }
    }

    public List<Record> getRecords(){
        return repository.findAll();
    }
}
