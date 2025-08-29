// src/main/java/com/examly/springapp/controller/DonationController.java
package com.examly.springapp.controller;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.Donation;
import com.examly.springapp.service.DonationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/donations")
public class DonationController {
    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping
    public ResponseEntity<Donation> donate(@RequestBody Map<String, Object> body) {
        Donation d = new Donation();
        if (body.get("amount") != null) {
            d.setAmount(new BigDecimal(body.get("amount").toString()));
        }
        d.setDonorName((String) body.get("donorName"));
        d.setDonorEmail((String) body.get("donorEmail"));
        d.setMessage((String) body.get("message"));
        if (body.get("isAnonymous") != null) {
            d.setIsAnonymous(Boolean.parseBoolean(body.get("isAnonymous").toString()));
        }
        d.setDonationDate(LocalDateTime.now());

        long causeId = Long.parseLong(body.get("causeId").toString());
        Donation saved = donationService.makeDonation(d, causeId);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

  @GetMapping("/cause/{causeId}")
 public List<Map<String, Object>> getByCause(@PathVariable long causeId) {
 // Return anonymized entries when isAnonymous=true.
 List<Donation> donations = donationService.getDonationsByCauseId(causeId);
 List<Map<String, Object>> result = new ArrayList<>();
 for (Donation d : donations) {
 Map<String, Object> row = new LinkedHashMap<>();
 row.put("id", d.getId());
 row.put("amount", d.getAmount());
 row.put("message", d.getMessage());
 row.put("isAnonymous", d.getIsAnonymous());
 row.put("donationDate", d.getDonationDate());
 // Cause ID is enough for list view
 Cause c = d.getCause();
 if (c != null) row.put("cause", Map.of("id", c.getId()));

 if (!Boolean.TRUE.equals(d.getIsAnonymous())) {
 row.put("donorName", d.getDonorName());
 row.put("donorEmail", d.getDonorEmail());
 }
 result.add(row);
 }
 return result;
 }
}