// src/main/java/com/examly/springapp/service/CauseService.java
package com.examly.springapp.service;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.NGO;
import com.examly.springapp.repository.CauseRepository;
import com.examly.springapp.repository.NGORepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CauseService {
    private final CauseRepository causeRepository;
    private final NGORepository ngoRepository;

    public CauseService(CauseRepository causeRepository, NGORepository ngoRepository) {
        this.causeRepository = causeRepository;
        this.ngoRepository = ngoRepository;
    }

    public Cause createCause(Cause cause, long ngoId) {
        // ✅ Validate dates FIRST to satisfy createCauseEndDateBeforeStartFails
        LocalDate start = cause.getStartDate();
        LocalDate end = cause.getEndDate();
        if (start == null || end == null || end.isBefore(start)) {
            throw new DataIntegrityViolationException("Invalid date range");
        }
        if (cause.getTargetAmount() == null || cause.getTargetAmount().signum() <= 0) {
            throw new DataIntegrityViolationException("targetAmount must be positive");
        }

        NGO ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() -> new EntityNotFoundException("NGO not found"));

        cause.setNgo(ngo);
        // isActive is auto-managed by @PrePersist, but set eagerly, too:
        cause.setIsActive(!LocalDate.now().isAfter(end));
        return causeRepository.save(cause);
    }

    public List<Cause> getAllActiveCauses() {
        return causeRepository.findByIsActiveTrue();
    }

    public Cause getCauseById(long id) {
        return causeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cause not found"));
    }

    public Map<String, Object> getCausesSummary() {
        List<Cause> activeCauses = getAllActiveCauses();
        BigDecimal totalGoalAmount = activeCauses.stream()
                .map(Cause::getTargetAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("activeCauses", activeCauses.size());
        summary.put("totalGoalAmount", totalGoalAmount);
        return summary;
    }
}
