package com.example.case_module4_quizweb.controller;

import com.example.case_module4_quizweb.model.Test;
import com.example.case_module4_quizweb.sevice.test.ITestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/tests")
public class TestController {
    @Autowired
    private ITestService testService;

    @GetMapping("")
    public ResponseEntity<Iterable<Test>> findAllTest() {
        List<Test> tests = (List<Test>) testService.findAll();
        if (tests.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }

}
