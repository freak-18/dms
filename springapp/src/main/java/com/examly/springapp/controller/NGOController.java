// src/main/java/com/examly/springapp/controller/NGOController.java
package com.examly.springapp.controller;

import com.examly.springapp.model.NGO;
import com.examly.springapp.service.NGOService;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<NGO> create(@RequestBody NGO ngo) {
        NGO saved = ngoService.createNGO(ngo);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public List<NGO> all() {
        return ngoService.getAllNGOs();
    }

    @GetMapping("/{id}")
    public NGO getById(@PathVariable long id) {
        // Test expects 404 with {"message":"NGO not found"} handled by @ControllerAdvice
        return ngoService.getNGOById(id);
    }
}
