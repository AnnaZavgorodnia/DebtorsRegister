package ua.gov.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ua.gov.dto.UserDTO;
import ua.gov.exception.ElementAlreadyExistsException;
import ua.gov.exception.ResponseException;
import ua.gov.model.Record;
import ua.gov.model.RoleType;
import ua.gov.model.User;
import ua.gov.service.UserService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="/api/user",
        produces="application/json")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Long createUser(@RequestBody @Valid UserDTO dto){
        if(dto.getRole() == null){
            dto.setRole(RoleType.REGISTER);
        }
        User user = service.save(dto);
        return user.getId();
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    public User getRecordById(@PathVariable Long id){
        return service.getById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<User> getUsers(@RequestParam(name = "email", required = false) String email,
                               @RequestParam(name = "stateAgency", required = false) String stateAgency){
        if(email != null && stateAgency != null){
            return service.getByEmailAndStateAgency(email, stateAgency);
        }
        return service.findAll().stream().filter(el->el.getRole()==RoleType.REGISTER).collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id){
        service.deleteById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{id}")
    public void activate(@PathVariable Long id){
        service.makeActive(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    public void updateById(@PathVariable Long id, @RequestBody UserDTO dto){
        service.updateById(id, dto);
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException.class)
    @ResponseBody
    public ResponseException handleNoSuchElementException(NoSuchElementException ex) {
        return new ResponseException(ex.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ElementAlreadyExistsException.class)
    @ResponseBody
    public ResponseException handleElementAlreadyExistsException(ElementAlreadyExistsException ex) {
        return new ResponseException("Користувач з такою електронною адресою вже існує");
    }

}
