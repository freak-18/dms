// src/main/java/com/examly/springapp/model/Donation.java
package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "donation")
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull @DecimalMin("0.01")
    private BigDecimal amount;

    @NotBlank
    private String donorName;

    @NotBlank @Email
    private String donorEmail;

    @Size(max = 200)
    private String message;

    @Column(name = "is_anonymous")
    private Boolean isAnonymous = false;

    private LocalDateTime donationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cause_id")
    private Cause cause;

    @PrePersist
    public void prePersist() {
        if (donationDate == null) donationDate = LocalDateTime.now();
        if (isAnonymous == null) isAnonymous = false;
    }

    // getters & setters
    public Long getId() { return id; } public void setId(Long id) { this.id = id; }
    public BigDecimal getAmount() { return amount; } public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getDonorName() { return donorName; } public void setDonorName(String donorName) { this.donorName = donorName; }
    public String getDonorEmail() { return donorEmail; } public void setDonorEmail(String donorEmail) { this.donorEmail = donorEmail; }
    public String getMessage() { return message; } public void setMessage(String message) { this.message = message; }
    public Boolean getIsAnonymous() { return isAnonymous; } public void setIsAnonymous(Boolean anonymous) { isAnonymous = anonymous; }
    public LocalDateTime getDonationDate() { return donationDate; } public void setDonationDate(LocalDateTime donationDate) { this.donationDate = donationDate; }
    public Cause getCause() { return cause; } public void setCause(Cause cause) { this.cause = cause; }
}
