package ua.gov.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ua.gov.dto.ObligorDTO;
import ua.gov.exception.ResponseException;
import ua.gov.model.Obligor;
import ua.gov.model.Record;
import ua.gov.service.ObligorService;

import java.util.List;

@RestController
@RequestMapping(path="/api/search-debtor",
        produces="application/json")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class DebtorController {

    private final ObligorService service;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<Record> searchDebtors(@RequestBody ObligorDTO dto){
        if(dto.getFullName() == null && dto.getIdentificationCode() == null){
            throw new RuntimeException("Search parameters are missing");
        }

        Obligor obligor = service.findObligorsRecords(dto);

        return obligor.getRecords();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public ResponseException handleRuntimeException(RuntimeException ex) {
        return new ResponseException(ex.getMessage());
    }
}
