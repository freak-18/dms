package com.examly.springapp.repository;

import com.examly.springapp.model.NGO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NGORepository extends JpaRepository<NGO, Long> {
  Optional<NGO> findByRegistrationNumber(String registrationNumber);
}

