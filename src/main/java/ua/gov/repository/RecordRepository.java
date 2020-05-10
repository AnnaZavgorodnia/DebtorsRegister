package ua.gov.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.gov.model.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
