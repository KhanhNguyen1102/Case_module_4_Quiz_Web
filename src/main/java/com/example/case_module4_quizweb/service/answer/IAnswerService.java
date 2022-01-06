package com.example.case_module4_quizweb.service.answer;

import com.example.case_module4_quizweb.model.Answer;
import com.example.case_module4_quizweb.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IAnswerService extends IGeneralService<Answer> {
    Page<Answer> findAll(Pageable pageable);
}
