// src/main/java/com/examly/springapp/controller/CauseController.java
package com.examly.springapp.controller;

import com.examly.springapp.model.Cause;
import com.examly.springapp.service.CauseService;
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
    public ResponseEntity<Cause> create(@RequestBody Map<String, Object> body) {
        // The tests send a map including ngoId; we map it to entity + ngoId.
        Cause c = new Cause();
        c.setTitle((String) body.get("title"));
        c.setDescription((String) body.get("description"));
        if (body.get("targetAmount") != null) {
            c.setTargetAmount(new java.math.BigDecimal(body.get("targetAmount").toString()));
        }
        if (body.get("startDate") != null) {
            c.setStartDate(java.time.LocalDate.parse((String) body.get("startDate")));
        }
        if (body.get("endDate") != null) {
            c.setEndDate(java.time.LocalDate.parse((String) body.get("endDate")));
        }
        long ngoId = Long.parseLong(body.get("ngoId").toString());
        Cause saved = causeService.createCause(c, ngoId);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/active")
    public List<Cause> active() {
        return causeService.getAllActiveCauses();
    }

    @GetMapping("/{id}")
    public Cause getById(@PathVariable long id) {
        return causeService.getCauseById(id);
    }

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        return causeService.getCausesSummary();
    }
}
