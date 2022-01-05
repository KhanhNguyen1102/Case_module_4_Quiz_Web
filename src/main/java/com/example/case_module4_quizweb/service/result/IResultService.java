package com.example.case_module4_quizweb.service.result;

import com.example.case_module4_quizweb.model.Result;
import com.example.case_module4_quizweb.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IResultService extends IGeneralService<Result> {
    Iterable<Result> findTop3Score();
    Page<Result> findAll(Pageable pageable);
}
