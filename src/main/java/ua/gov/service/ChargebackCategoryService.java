package ua.gov.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.gov.repository.ChargebackCategoryRepository;

@Service
@RequiredArgsConstructor
public class ChargebackCategoryService {

    private final ChargebackCategoryRepository repository;

}
