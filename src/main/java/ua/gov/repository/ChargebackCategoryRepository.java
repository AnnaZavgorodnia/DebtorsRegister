package ua.gov.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.gov.model.ChargebackCategory;

@Repository
public interface ChargebackCategoryRepository extends JpaRepository<ChargebackCategory, Long> {
}
