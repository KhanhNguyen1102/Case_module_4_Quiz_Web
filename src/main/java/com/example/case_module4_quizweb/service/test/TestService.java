package com.example.case_module4_quizweb.service.test;

import com.example.case_module4_quizweb.model.Test;
import com.example.case_module4_quizweb.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TestService implements ITestService {
    @Autowired
    private TestRepository testRepository;

    @Override
    public Iterable<Test> findAll() {
        return testRepository.findAll();
    }

    @Override
    public Optional<Test> findById(Long id) {
        return testRepository.findById(id);
    }

    @Override
    public Test save(Test test) {
        return testRepository.save(test);
    }

    @Override
    public void remove(Long id) {
        testRepository.deleteById(id);
    }
}
