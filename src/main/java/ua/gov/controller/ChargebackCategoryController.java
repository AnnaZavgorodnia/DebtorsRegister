package ua.gov.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.gov.service.ChargebackCategoryService;

@RestController
@RequestMapping(path="/api/chargeback-category",
        produces="application/json")
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class ChargebackCategoryController {

    private final ChargebackCategoryService service;
}
