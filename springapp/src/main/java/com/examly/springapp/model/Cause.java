package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Cause {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 100)
  private String title;

  @Size(max = 1000)
  private String description;

  @NotNull
  @Positive
  private BigDecimal targetAmount;

  private BigDecimal currentAmount = BigDecimal.ZERO;

  @NotNull
  private LocalDate startDate;

  @NotNull
  private LocalDate endDate;

  private Boolean isActive;

  @ManyToOne
  @JoinColumn(name = "ngo_id")
  private NGO ngo;

  @PrePersist
  @PreUpdate
  public void updateActiveStatus() {
    this.isActive = endDate.isAfter(LocalDate.now());
  }

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }

  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }

  public BigDecimal getTargetAmount() { return targetAmount; }
  public void setTargetAmount(BigDecimal targetAmount) { this.targetAmount = targetAmount; }

  public BigDecimal getCurrentAmount() { return currentAmount; }
  public void setCurrentAmount(BigDecimal currentAmount) { this.currentAmount = currentAmount; }

  public LocalDate getStartDate() { return startDate; }
  public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

  public LocalDate getEndDate() { return endDate; }
  public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

  public Boolean getIsActive() { return isActive; }
  public void setIsActive(Boolean isActive) { this.isActive = isActive; }

  public NGO getNgo() { return ngo; }
  public void setNgo(NGO ngo) { this.ngo = ngo; }
}

