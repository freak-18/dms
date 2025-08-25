package com.examly.springapp.repository;

import com.examly.springapp.model.NGO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NGORepository extends JpaRepository<NGO, Long> {
}