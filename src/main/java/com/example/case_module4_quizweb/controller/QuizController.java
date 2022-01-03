package com.example.case_module4_quizweb.controller;

import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.sevice.quiz.IQuizService;
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
@RequestMapping("/api/quizzes")
public class QuizController {
    @Autowired
    private IQuizService quizService;

    @GetMapping("")
    public ResponseEntity<Iterable<Quiz>> findAllCateGory() {
        List<Quiz> quizzes = (List<Quiz>) quizService.findAll();
        if (quizzes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }
}
