package com.examly.springapp.service;

import com.examly.springapp.model.Cause;
import com.examly.springapp.model.Donation;
import com.examly.springapp.repository.CauseRepository;
import com.examly.springapp.repository.DonationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DonationService {
  private final DonationRepository donationRepo;
  private final CauseRepository causeRepo;

  public DonationService(DonationRepository donationRepo, CauseRepository causeRepo) {
    this.donationRepo = donationRepo;
    this.causeRepo = causeRepo;
  }

  @Transactional
  public Donation makeDonation(Donation donation, Long causeId) {
    Cause cause = causeRepo.findById(causeId)
        .orElseThrow(() -> new EntityNotFoundException("Cause not found"));

    if (!cause.getIsActive()) {
      throw new IllegalStateException("Cause is inactive or expired");
    }

    donation.setCause(cause);
    cause.setCurrentAmount(cause.getCurrentAmount().add(donation.getAmount()));
    causeRepo.save(cause);

    return donationRepo.save(donation);
  }

  public List<Donation> getDonationsByCause(Long causeId) {
    return donationRepo.findByCauseId(causeId);
  }
}

