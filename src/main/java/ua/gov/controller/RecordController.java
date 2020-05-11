package ua.gov.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ua.gov.dto.RecordDTO;
import ua.gov.exception.ResponseException;
import ua.gov.model.Record;
import ua.gov.service.RecordService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="/api/record",
        produces="application/json")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService service;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<Record> getRecords(
            @RequestParam(name = "chargebackCategory", required = false) Long chargebackCategory){
        if(chargebackCategory != null && chargebackCategory > 0){
            return service.getRecords().stream()
                    .filter(el -> el.getChargebackCategory().getId().equals(chargebackCategory) && el.getIsActive())
                    .collect(Collectors.toList());
        }
        return service.getRecords().stream().filter(Record::getIsActive).collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Long createRecord(@RequestBody RecordDTO dto){
        return service.create(dto);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteRecord(@PathVariable Long id){
        service.deleteById(id);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public ResponseException handleRuntimeException(RuntimeException ex) {
        return new ResponseException(ex.getMessage());
    }

}
