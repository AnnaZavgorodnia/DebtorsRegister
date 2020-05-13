package ua.gov.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.gov.dto.UserDTO;
import ua.gov.model.Record;
import ua.gov.model.User;
import ua.gov.repository.UserRepository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> findByEmailAndIsActive(String email, Boolean isActive){
        return repository.findByEmailAndIsActive(email, isActive);
    }

    public User save(UserDTO dto){
        User user = new User();
        user.setEmail(dto.getEmail());
        user.setFullName(dto.getFullName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setIsActive(true);
        user.setRole(dto.getRole());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setCreatedAt(LocalDateTime.now());
        user.setStateAgency(dto.getStateAgency());

        return repository.save(user);
    }

    public User getById(Long id) {
        return repository.findById(id).orElseThrow(()->new NoSuchElementException("user not found"));
    }

    public List<User> getByEmailAndStateAgency(String email, String stateAgency) {
        return repository.findAllByEmailAndStateAgency(email, stateAgency);
    }

    public List<User> findAll() {
        return repository.findAll();
    }

    public void deleteById(Long id) {
        User user = repository.findById(id).orElseGet(null);
        if(user != null){
            user.setIsActive(false);
            repository.save(user);
        }
    }

    public void makeActive(Long id) {
        User user = repository.findById(id).orElseThrow(()->new NoSuchElementException("user not found"));
        user.setIsActive(true);
        repository.save(user);
    }

    public void updateById(Long id, UserDTO dto) {
        User user = repository.findById(id).orElseThrow(()->new NoSuchElementException("user not found"));
        user.setFullName(dto.getFullName());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setStateAgency(dto.getStateAgency());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        repository.save(user);
    }
}
