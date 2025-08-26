package com.examly.springapp.repository;

import com.examly.springapp.model.NGO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NGORepository extends JpaRepository<NGO, Long> {
}
