package com.examly.springapp.controller;

import com.examly.springapp.model.Donation;
import com.examly.springapp.service.DonationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/donations")
public class DonationController {
  private final DonationService donationService;

  public DonationController(DonationService donationService) {
    this.donationService = donationService;
  }

  @PostMapping
  public ResponseEntity<Donation> donate(@Valid @RequestBody Map<String, Object> req) {
    Donation donation = new Donation();
    donation.setAmount(new java.math.BigDecimal(req.get("amount").toString()));
    donation.setDonorName((String) req.get("donorName"));
    donation.setDonorEmail((String) req.get("donorEmail"));
    donation.setMessage((String) req.getOrDefault("message", ""));
    donation.setIsAnonymous(Boolean.parseBoolean(req.getOrDefault("isAnonymous", "false").toString()));
    Long causeId = Long.valueOf(req.get("causeId").toString());

    return ResponseEntity.status(201).body(donationService.makeDonation(donation, causeId));
  }

  @GetMapping("/cause/{causeId}")
  public List<Donation> getDonations(@PathVariable Long causeId) {
    return donationService.getDonationsByCause(causeId);
  }
}

