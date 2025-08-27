package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
public class NGO {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 100)
  private String name;

  @Size(max = 500)
  private String description;

  @NotBlank
  @Email
  private String contactEmail;

  @NotBlank
  @Column(unique = true)
  private String registrationNumber;

  private LocalDateTime createdAt = LocalDateTime.now();

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }

  public String getContactEmail() { return contactEmail; }
  public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

  public String getRegistrationNumber() { return registrationNumber; }
  public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

  public LocalDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

