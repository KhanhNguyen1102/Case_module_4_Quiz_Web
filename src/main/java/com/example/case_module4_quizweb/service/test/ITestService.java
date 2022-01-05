package com.example.case_module4_quizweb.service.test;

import com.example.case_module4_quizweb.model.Test;
import com.example.case_module4_quizweb.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ITestService extends IGeneralService<Test> {
    Page<Test> findAll(Pageable pageable);
}
