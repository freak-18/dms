package com.examly.springapp.controller;

import com.examly.springapp.model.NGO;
import com.examly.springapp.service.NGOService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ngos")
public class NGOController {
  private final NGOService ngoService;

  public NGOController(NGOService ngoService) {
    this.ngoService = ngoService;
  }

  @PostMapping
  public ResponseEntity<NGO> create(@Valid @RequestBody NGO ngo) {
    return ResponseEntity.status(201).body(ngoService.createNGO(ngo));
  }

  @GetMapping
  public List<NGO> getAll() {
    return ngoService.getAllNGOs();
  }

  @GetMapping("/{id}")
  public NGO getById(@PathVariable Long id) {
    return ngoService.getById(id);
  }
}

