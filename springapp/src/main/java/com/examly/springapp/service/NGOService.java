// src/main/java/com/examly/springapp/service/NGOService.java
package com.examly.springapp.service;

import com.examly.springapp.model.NGO;
import com.examly.springapp.repository.NGORepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NGOService {
    private final NGORepository ngoRepository;

    public NGOService(NGORepository ngoRepository) {
        this.ngoRepository = ngoRepository;
    }

    public NGO createNGO(NGO ngo) {
        if (ngo == null) {
            throw new IllegalArgumentException("NGO cannot be null");
        }
        if (ngo.getRegistrationNumber() == null || ngo.getRegistrationNumber().isBlank()) {
            throw new IllegalArgumentException("registrationNumber is required");
        }
        if (ngoRepository.existsByRegistrationNumber(ngo.getRegistrationNumber())) {
            throw new DataIntegrityViolationException("Duplicate registration number");
        }
        return ngoRepository.save(ngo);
    }

    public List<NGO> getAllNGOs() {
        return ngoRepository.findAll();
    }

    public NGO getNGOById(long id) {
        return ngoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("NGO not found"));
    }
}
