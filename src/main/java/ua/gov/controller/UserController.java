package ua.gov.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ua.gov.dto.UserDTO;
import ua.gov.exception.ResponseException;
import ua.gov.model.Record;
import ua.gov.model.RoleType;
import ua.gov.model.User;
import ua.gov.service.UserService;

import java.util.NoSuchElementException;

@RestController
@RequestMapping(path="/api/user",
        produces="application/json")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long createUser(@RequestBody UserDTO dto){
        dto.setRole(RoleType.REGISTER);
        User user = service.save(dto);
        return user.getId();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public User getRecordById(@PathVariable Long id){
        return service.getById(id);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseBody
    public ResponseException handleNoSuchElementException(NoSuchElementException ex) {
        return new ResponseException(ex.getMessage());
    }

}
