package com.examly.springapp.service;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.NGO;
import com.examly.springapp.repository.CauseRepository;
import com.examly.springapp.repository.NGORepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CauseService {
  private final CauseRepository causeRepo;
  private final NGORepository ngoRepo;

  public CauseService(CauseRepository causeRepo, NGORepository ngoRepo) {
    this.causeRepo = causeRepo;
    this.ngoRepo = ngoRepo;
  }

  public Cause createCause(Cause cause, Long ngoId) {
    NGO ngo = ngoRepo.findById(ngoId)
        .orElseThrow(() -> new EntityNotFoundException("NGO not found"));
    cause.setNgo(ngo);
    return causeRepo.save(cause);
  }

  public List<Cause> getAllActiveCauses() {
    return causeRepo.findByIsActiveTrue();
  }

  public Cause getCauseById(Long id) {
    return causeRepo.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Cause not found"));
  }
}

