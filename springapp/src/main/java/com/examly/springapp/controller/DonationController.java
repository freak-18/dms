package com.examly.springapp.controller;

import com.examly.springapp.model.Donation;
import com.examly.springapp.service.DonationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/donations")
public class DonationController {
    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @PostMapping("/cause/{causeId}")
    public ResponseEntity<Donation> makeDonation(@PathVariable Long causeId, @RequestBody Donation donation) {
    Donation created = donationService.makeDonation(donation, causeId);
    return new ResponseEntity<>(created, HttpStatus.CREATED);
    }


    @GetMapping("/cause/{causeId}")
    public ResponseEntity<?> getDonationsByCause(@PathVariable Long causeId) {
        try {
            List<Donation> donations = donationService.getDonationsByCauseId(causeId);
            List<Map<String, Object>> response = new ArrayList<>();
            for (Donation d : donations) {
                Map<String, Object> map = new HashMap<>();
                map.put("id", d.getId());
                map.put("amount", d.getAmount());
                map.put("message", d.getMessage());
                map.put("donationDate", d.getDonationDate());
                if (!Boolean.TRUE.equals(d.getIsAnonymous())) {
                    map.put("donorName", d.getDonorName());
                    map.put("donorEmail", d.getDonorEmail());
                }
                response.add(map);
            }
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(Map.of("message", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
