// src/main/java/com/examly/springapp/model/Cause.java
package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "cause")
public class Cause {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 100)
    private String title;

    @Size(max = 1000)
    private String description;

    @NotNull @DecimalMin(value = "0.01")
    @Column(name = "target_amount", nullable = false)
    private BigDecimal targetAmount;

    @Column(name = "current_amount")
    private BigDecimal currentAmount = BigDecimal.ZERO;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "is_active")
    private Boolean isActive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ngo_id")
    private NGO ngo;

    @PrePersist @PreUpdate
    public void updateActive() {
        if (endDate != null) {
            this.isActive = !LocalDate.now().isAfter(endDate);
        }
        if (currentAmount == null) currentAmount = BigDecimal.ZERO;
    }

    // getters & setters
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; } public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; } public void setDescription(String description) { this.description = description; }
    public BigDecimal getTargetAmount() { return targetAmount; } public void setTargetAmount(BigDecimal targetAmount) { this.targetAmount = targetAmount; }
    public BigDecimal getCurrentAmount() { return currentAmount; } public void setCurrentAmount(BigDecimal currentAmount) { this.currentAmount = currentAmount; }
    public LocalDate getStartDate() { return startDate; } public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; } public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public Boolean getIsActive() { return isActive; } public void setIsActive(Boolean active) { isActive = active; }
    public NGO getNgo() { return ngo; } public void setNgo(NGO ngo) { this.ngo = ngo; }
    @com.fasterxml.jackson.annotation.JsonProperty("ngoId")
    public Long getNgoId() { return ngo != null ? ngo.getId() : null; }
}
