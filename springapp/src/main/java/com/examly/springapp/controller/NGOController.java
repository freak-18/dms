package com.examly.springapp.controller;

import com.examly.springapp.model.NGO;
import com.examly.springapp.service.NGOService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ngos")
public class NGOController {
    private final NGOService ngoService;

    public NGOController(NGOService ngoService) {
        this.ngoService = ngoService;
    }

    @PostMapping
    public ResponseEntity<NGO> createNGO(@RequestBody NGO ngo) {
        return new ResponseEntity<>(ngoService.createNGO(ngo), HttpStatus.CREATED);
    }

    @GetMapping
    public List<NGO> getAllNGOs() {
        return ngoService.getAllNGOs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNGOById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ngoService.getNGOById(id));
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
