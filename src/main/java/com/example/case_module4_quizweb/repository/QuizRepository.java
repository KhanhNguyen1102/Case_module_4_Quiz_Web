package com.example.case_module4_quizweb.repository;

import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.model.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Page<Quiz> findAll(Pageable pageable);
}
