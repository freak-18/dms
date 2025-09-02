// src/main/java/com/examly/springapp/model/NGO.java
package com.examly.springapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "ngo", uniqueConstraints = {
        @UniqueConstraint(name = "uk_registration_number", columnNames = "registration_number")
})
public class NGO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    @NotBlank
    @Email
    @Column(name = "contact_email", nullable = false)
    private String contactEmail;

    @NotBlank
    @Column(name = "registration_number", nullable = false, unique = true)
    private String registrationNumber;



    // getters & setters
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


}
