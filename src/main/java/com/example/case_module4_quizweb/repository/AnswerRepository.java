package com.example.case_module4_quizweb.repository;

import com.example.case_module4_quizweb.model.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Page<Answer> findAll(Pageable pageable);
    @Query(value = "SELECT a FROM Answer a WHERE a.quiz.id =:id  ")
    Iterable<Answer> findAllByQuiz(@Param("id") long id);
}
