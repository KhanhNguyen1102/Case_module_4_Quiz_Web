package com.example.case_module4_quizweb.controller;


import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.sevice.quiz.IQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @PostMapping("")
    public ResponseEntity<Quiz> findCategoryById(@RequestParam Long id) {
        Optional<Quiz> quizOptional = quizService.findById(id);
        if (!quizOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Quiz quiz = quizOptional.get();
        return new ResponseEntity<>(quiz, HttpStatus.OK);
    }
}
