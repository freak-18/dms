package com.examly.springapp.service;

import com.examly.springapp.model.NGO;
import com.examly.springapp.repository.NGORepository;
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
        return ngoRepo.save(ngo);
    }

    public List<NGO> getAllNGOs() {
        return ngoRepo.findAll();
    }

    public NGO getNGOById(Long id) {
        return ngoRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("NGO not found"));
    }
}
