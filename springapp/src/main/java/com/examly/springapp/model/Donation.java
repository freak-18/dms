package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Donation {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Positive
  private BigDecimal amount;

  @NotBlank
  private String donorName;

  @NotBlank
  @Email
  private String donorEmail;

  @Size(max = 200)
  private String message;

  private Boolean isAnonymous = false;

  private LocalDateTime donationDate = LocalDateTime.now();

  @ManyToOne
  @JoinColumn(name = "cause_id")
  private Cause cause;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public BigDecimal getAmount() { return amount; }
  public void setAmount(BigDecimal amount) { this.amount = amount; }

  public String getDonorName() { return donorName; }
  public void setDonorName(String donorName) { this.donorName = donorName; }

  public String getDonorEmail() { return donorEmail; }
  public void setDonorEmail(String donorEmail) { this.donorEmail = donorEmail; }

  public String getMessage() { return message; }
  public void setMessage(String message) { this.message = message; }

  public Boolean getIsAnonymous() { return isAnonymous; }
  public void setIsAnonymous(Boolean isAnonymous) { this.isAnonymous = isAnonymous; }

  public LocalDateTime getDonationDate() { return donationDate; }
  public void setDonationDate(LocalDateTime donationDate) { this.donationDate = donationDate; }

  public Cause getCause() { return cause; }
  public void setCause(Cause cause) { this.cause = cause; }
}

