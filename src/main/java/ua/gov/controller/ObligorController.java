package ua.gov.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ua.gov.dto.ObligorDTO;
import ua.gov.dto.RecordDTO;
import ua.gov.exception.ResponseException;
import ua.gov.model.Obligor;
import ua.gov.model.Record;
import ua.gov.service.ObligorService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="/api/search-debtor",
        produces="application/json")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class ObligorController {

    private final ObligorService service;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<Record> searchDebtors(@RequestParam(name = "fullName", required = false) String fullName,
                                      @RequestParam(name = "birthDate", required = false) LocalDate birthDate,
                                      @RequestParam(name = "identificationCode", required = false) String identificationCode,
                                      @RequestParam(name = "chargebackCategory", required = false) Long chargebackCategory,
                                      @RequestParam(name = "isLegalEntity") Boolean isLegalEntity){

        if(fullName == null && identificationCode == null){
            throw new RuntimeException("Search parameters are missing");
        }

        ObligorDTO dto = new ObligorDTO();
        dto.setFullName(fullName);
        dto.setBirthDate(birthDate);
        dto.setIdentificationCode(identificationCode);
        dto.setChargebackCategory(chargebackCategory);
        dto.setIsLegalEntity(isLegalEntity);

        try{
            Obligor obligor = service.findObligorsRecords(dto);
            if(dto.getChargebackCategory() != null){
                return obligor.getRecords().stream()
                        .filter(el -> el.getChargebackCategory().getId().equals(chargebackCategory))
                        .collect(Collectors.toList());
            }
            return obligor.getRecords();
        } catch (RuntimeException e){
            return new ArrayList<>();
        }
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public Obligor findObligorById(@PathVariable Long id){
        return service.findObligorById(id);
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public ResponseException handleRuntimeException(RuntimeException ex) {
        return new ResponseException(ex.getMessage());
    }
}
