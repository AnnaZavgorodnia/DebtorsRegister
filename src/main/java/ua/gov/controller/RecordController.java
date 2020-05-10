package ua.gov.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ua.gov.dto.RecordDTO;
import ua.gov.exception.ResponseException;
import ua.gov.service.RecordService;

@RestController
@RequestMapping(path="/api/record",
        produces="application/json")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class RecordController {

    private final RecordService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Long createRecord(@RequestBody RecordDTO dto){
        return service.create(dto);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RuntimeException.class)
    @ResponseBody
    public ResponseException handleRuntimeException(RuntimeException ex) {
        return new ResponseException(ex.getMessage());
    }

}
