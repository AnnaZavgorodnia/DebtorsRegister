package ua.gov.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.gov.dto.ObligorDTO;
import ua.gov.model.Obligor;
import ua.gov.repository.ObligorRepository;
import ua.gov.repository.RecordRepository;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ObligorService {

    private final ObligorRepository repository;
    private final RecordRepository recordRepository;

    public Obligor findObligorsRecords(ObligorDTO dto){
        Optional<Obligor> obligor;
        if(dto.getIdentificationCode() != null){
            obligor = repository.findByIdentificationCodeAndIsLegalEntity(
                    dto.getIdentificationCode(),
                    dto.getIsLegalEntity());
        } else {
            obligor = repository.findByFullNameAndIsLegalEntity(
                    dto.getFullName(),
                    dto.getIsLegalEntity());
        }

        return obligor.orElseThrow(() -> new NoSuchElementException("Obligor with such parameters not found"));
    }
}
