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
        return repository.findByIdAndIsActive(id, true).orElseThrow(()->new NoSuchElementException("user not found"));
    }
}
