package com.example.case_module4_quizweb.repository;

import com.example.case_module4_quizweb.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result,Long> {
}
