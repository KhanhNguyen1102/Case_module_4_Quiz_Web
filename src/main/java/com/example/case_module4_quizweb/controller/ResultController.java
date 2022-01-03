package com.example.case_module4_quizweb.controller;


import com.example.case_module4_quizweb.model.Result;
import com.example.case_module4_quizweb.sevice.result.IResultService;
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
@RequestMapping("/api/results")
public class ResultController {
    @Autowired
    private IResultService resultService;

    @GetMapping("")
    public ResponseEntity<Iterable<Result>> findAllQuiz() {
        List<Result> results = (List<Result>) resultService.findAll();
        if (results.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

}
