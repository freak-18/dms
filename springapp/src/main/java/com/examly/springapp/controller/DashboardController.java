package com.examly.springapp.controller;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.Donation;
import com.examly.springapp.model.NGO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.CauseRepository;
import com.examly.springapp.repository.DonationRepository;
import com.examly.springapp.repository.NGORepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final CauseRepository causeRepository;
    private final DonationRepository donationRepository;
    private final NGORepository ngoRepository;
    private final UserRepository userRepository;

    public DashboardController(CauseRepository causeRepository, DonationRepository donationRepository, 
                             NGORepository ngoRepository, UserRepository userRepository) {
        this.causeRepository = causeRepository;
        this.donationRepository = donationRepository;
        this.ngoRepository = ngoRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalUsers", userRepository.count());
        dashboard.put("totalNGOs", ngoRepository.count());
        dashboard.put("totalCauses", causeRepository.count());
        dashboard.put("totalDonations", donationRepository.count());
        dashboard.put("users", userRepository.findAll());
        dashboard.put("ngos", ngoRepository.findAll());
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<Map<String, Object>> getNGODashboard(@PathVariable Long ngoId) {
        NGO ngo = ngoRepository.findById(ngoId).orElse(null);
        if (ngo == null) {
            return ResponseEntity.notFound().build();
        }

        List<Cause> causes = causeRepository.findAll().stream()
                .filter(cause -> cause.getNgo() != null && cause.getNgo().getId().equals(ngoId))
                .toList();

        BigDecimal totalRaised = causes.stream()
                .map(cause -> cause.getCurrentAmount() != null ? cause.getCurrentAmount() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("ngo", ngo);
        dashboard.put("causes", causes);
        dashboard.put("totalCauses", causes.size());
        dashboard.put("totalRaised", totalRaised);
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/donor")
    public ResponseEntity<Map<String, Object>> getDonorDashboard() {
        List<Cause> featuredCauses = causeRepository.findByIsActiveTrue().stream()
                .limit(6)
                .toList();

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("featuredCauses", featuredCauses);
        dashboard.put("totalActiveCauses", causeRepository.findByIsActiveTrue().size());
        return ResponseEntity.ok(dashboard);
    }
}