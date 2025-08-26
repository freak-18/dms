package com.examly.springapp.repository;

import com.examly.springapp.model.Cause;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CauseRepository extends JpaRepository<Cause, Long> {
    List<Cause> findByIsActiveTrue();
}
