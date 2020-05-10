package ua.gov.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.gov.model.Issuer;

import java.util.Optional;

public interface IssuerRepository extends JpaRepository<Issuer, Long> {
    Optional<Issuer> findByFullName(String fullName);
}
