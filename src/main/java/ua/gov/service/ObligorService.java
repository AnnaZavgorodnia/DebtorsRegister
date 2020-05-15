package ua.gov.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.gov.dto.ObligorDTO;
import ua.gov.model.Obligor;
import ua.gov.repository.ObligorRepository;
import ua.gov.repository.RecordRepository;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ObligorService {

    private final ObligorRepository repository;
    private final RecordRepository recordRepository;

    public Obligor findObligorsRecords(ObligorDTO dto){
        Optional<Obligor> obligor;
        log.info("fullname: {}, identification: {}, isLegal: {}",
                dto.getFullName(), dto.getIdentificationCode(), dto.getIsLegalEntity());
        if(dto.getIdentificationCode() != null && dto.getIdentificationCode().trim().length() != 0){
            obligor = repository.findByIdentificationCodeAndIsLegalEntity(
                    dto.getIdentificationCode(),
                    dto.getIsLegalEntity());
        } else {
            obligor = repository.findByFullNameContainingIgnoreCaseAndIsLegalEntity(
                    dto.getFullName().trim(),
                    dto.getIsLegalEntity());
        }

        return obligor.orElseThrow(() -> new NoSuchElementException("Obligor with such parameters not found"));
    }

    public Obligor findObligorById(Long id){
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("Obligor with such parameters not found"));
    }
}
