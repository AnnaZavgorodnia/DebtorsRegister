package ua.gov.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.gov.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndIsActive(String email, Boolean isActive);

    Optional<User> findByIdAndIsActive(Long id, Boolean isActive);
}
