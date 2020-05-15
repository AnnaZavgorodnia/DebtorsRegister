package ua.gov.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.gov.model.Obligor;

import java.util.Optional;

@Repository
public interface ObligorRepository extends JpaRepository<Obligor, Long> {
    Optional<Obligor> findByFullName(String fullName);
    Optional<Obligor> findByIdentificationCode(String identificationCode);
    Optional<Obligor> findByFullNameContainingIgnoreCaseAndIsLegalEntity(String fullName, Boolean isLegalEntity);
    Optional<Obligor> findByIdentificationCodeAndIsLegalEntity(String identificationCode, Boolean isLegalEntity);
    Optional<Obligor> findById(Long id);
}
