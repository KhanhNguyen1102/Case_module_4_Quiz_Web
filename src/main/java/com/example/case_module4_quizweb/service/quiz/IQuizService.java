package com.example.case_module4_quizweb.service.quiz;

import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.model.Result;
import com.example.case_module4_quizweb.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IQuizService extends IGeneralService<Quiz> {
    Page<Quiz> findAll(Pageable pageable);
}
