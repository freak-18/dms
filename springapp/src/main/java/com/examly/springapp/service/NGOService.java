package com.examly.springapp.service;

import com.examly.springapp.model.NGO;
import com.examly.springapp.repository.NGORepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NGOService {
  private final NGORepository ngoRepo;

  public NGOService(NGORepository ngoRepo) {
    this.ngoRepo = ngoRepo;
  }

  public NGO createNGO(NGO ngo) {
    ngoRepo.findByRegistrationNumber(ngo.getRegistrationNumber())
        .ifPresent(existing -> {
          throw new EntityExistsException("Registration number already exists");
        });
    return ngoRepo.save(ngo);
  }

  public List<NGO> getAllNGOs() {
    return ngoRepo.findAll();
  }

  public NGO getById(Long id) {
    return ngoRepo.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("NGO not found"));
  }
}

