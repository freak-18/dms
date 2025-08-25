package com.examly.springapp.repository;

import com.examly.springapp.model.Cause;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CauseRepository extends JpaRepository<Cause, Long> {
    // Finds all causes where the 'isActive' property is true
    List<Cause> findByIsActiveTrue();
}