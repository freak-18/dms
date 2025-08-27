package com.examly.springapp.controller;

import com.examly.springapp.model.Cause;
import com.examly.springapp.service.CauseService;
import jakarta.validation.Valid;
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
  public ResponseEntity<Cause> create(@Valid @RequestBody Map<String, Object> req) {
    Cause cause = new Cause();
    cause.setTitle((String) req.get("title"));
    cause.setDescription((String) req.get("description"));
    cause.setTargetAmount(new java.math.BigDecimal(req.get("targetAmount").toString()));
    cause.setStartDate(java.time.LocalDate.parse(req.get("startDate").toString()));
    cause.setEndDate(java.time.LocalDate.parse(req.get("endDate").toString()));
    Long ngoId = Long.valueOf(req.get("ngoId").toString());

    return ResponseEntity.status(201).body(causeService.createCause(cause, ngoId));
  }

  @GetMapping("/active")
  public List<Cause> getActive() {
    return causeService.getAllActiveCauses();
  }

  @GetMapping("/{id}")
  public Cause getById(@PathVariable Long id) {
    return causeService.getCauseById(id);
  }
}

