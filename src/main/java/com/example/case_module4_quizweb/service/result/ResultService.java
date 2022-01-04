package com.example.case_module4_quizweb.service.result;

import com.example.case_module4_quizweb.model.Result;
import com.example.case_module4_quizweb.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ResultService implements IResultService {
    @Autowired
    private ResultRepository resultRepository;

    @Override
    public Iterable<Result> findAll() {
        return resultRepository.findAll();
    }

    @Override
    public Optional<Result> findById(Long id) {
        return resultRepository.findById(id);
    }

    @Override
    public Result save(Result result) {
        return resultRepository.save(result);
    }

    @Override
    public void remove(Long id) {
        resultRepository.deleteById(id);
    }
}
