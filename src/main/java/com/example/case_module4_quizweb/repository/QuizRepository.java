package com.example.case_module4_quizweb.repository;

import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.model.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Page<Quiz> findAll(Pageable pageable);
    Page<Quiz> findAllByContentContaining(Pageable pageable,String key);
    @Query(value = "select * from quiz order by id desc limit 1 ", nativeQuery = true)
    Optional<Quiz> findNewestQuiz();
}
