package com.examly.springapp.controller;

import com.examly.springapp.model.Cause;
import com.examly.springapp.service.CauseService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/causes")
public class CauseController {
    private final CauseService causeService;

    public CauseController(CauseService causeService) {
        this.causeService = causeService;
    }

    @PostMapping
    public ResponseEntity<Cause> createCause(@RequestBody Cause cause,
                                             @RequestParam Long ngoId) {
        Cause saved = causeService.createCause(cause, ngoId);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/active")
    public List<Cause> getActiveCauses() {
        return causeService.getAllActiveCauses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCauseById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(causeService.getCauseById(id));
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
