package com.example.case_module4_quizweb.service.quiz;

import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface IQuizService extends IGeneralService<Quiz> {
    @Query("select q from Quiz q where q.category.name like ?1")
    Iterable<Quiz> findByCategory(String category);
    Page<Quiz> findAll(Pageable pageable);
}
