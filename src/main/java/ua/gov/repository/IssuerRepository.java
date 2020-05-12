package ua.gov.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.gov.model.Issuer;

import java.util.Optional;

@Repository
public interface IssuerRepository extends JpaRepository<Issuer, Long> {
    Optional<Issuer> findByFullName(String fullName);
}
