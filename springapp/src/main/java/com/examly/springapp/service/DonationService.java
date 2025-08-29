// src/main/java/com/examly/springapp/service/DonationService.java
package com.examly.springapp.service;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.Donation;
import com.examly.springapp.repository.CauseRepository;
import com.examly.springapp.repository.DonationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final CauseRepository causeRepository;

    public DonationService(DonationRepository donationRepository, CauseRepository causeRepository) {
        this.donationRepository = donationRepository;
        this.causeRepository = causeRepository;
    }

    @Transactional
    public Donation makeDonation(Donation donation, long causeId) {
        // ✅ Validate donation amount
        if (donation.getAmount() == null || donation.getAmount().compareTo(new BigDecimal("0.01")) < 0) {
            throw new IllegalArgumentException("Amount must be positive");
        }

        // ✅ Find cause or throw 404
        Cause cause = causeRepository.findById(causeId)
                .orElseThrow(() -> new EntityNotFoundException("Cause not found"));

        // ✅ Manage activity only if not explicitly set
        if (cause.getIsActive() == null) {
            boolean active = cause.getEndDate() == null || !LocalDate.now().isAfter(cause.getEndDate());
            cause.setIsActive(active);
        }

        // ✅ Prevent donations to inactive causes
        if (!Boolean.TRUE.equals(cause.getIsActive())) {
            throw new DataIntegrityViolationException("Cause is inactive");
        }

        // ✅ Link cause → donation
        donation.setCause(cause);
        Donation saved = donationRepository.save(donation);

        // ✅ Update current amount in cause
        BigDecimal current = cause.getCurrentAmount() == null ? BigDecimal.ZERO : cause.getCurrentAmount();
        cause.setCurrentAmount(current.add(donation.getAmount()));
        causeRepository.save(cause);

        return saved;
    }


public List<Donation> getDonationsByCauseId(long causeId) {
// ✅ Throw 404 if cause doesn’t exist
causeRepository.findById(causeId)
.orElseThrow(() -> new EntityNotFoundException("Cause not found"));
return donationRepository.findByCauseId(causeId);
}
}