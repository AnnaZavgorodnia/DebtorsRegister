package ua.gov.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.gov.model.Obligor;

import java.util.Optional;

public interface ObligorRepository extends JpaRepository<Obligor, Long> {
    Optional<Obligor> findByFullName(String fullName);
    Optional<Obligor> findByFullNameAndIsLegalEntity(String fullName, Boolean isLegalEntity);
    Optional<Obligor> findByIdentificationCodeAndIsLegalEntity(String identificationCode, Boolean isLegalEntity);
    Optional<Obligor> findById(Long id);
}
