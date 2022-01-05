package com.example.case_module4_quizweb.repository;

import com.example.case_module4_quizweb.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    @Query("select q from Quiz q where q.category.name like ?1")
    Iterable<Quiz> findByCategory(String category);
}
