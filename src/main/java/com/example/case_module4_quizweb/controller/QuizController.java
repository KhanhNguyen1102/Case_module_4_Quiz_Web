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
    public ResponseEntity<Iterable<Quiz>> findAllQuiz() {
        List<Quiz> quizzes = (List<Quiz>) quizService.findAll();
        if (quizzes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Quiz> findQuizById(@RequestParam Long id) {
        Optional<Quiz> quizOptional = quizService.findById(id);
        if (!quizOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Quiz quiz = quizOptional.get();
        return new ResponseEntity<>(quiz, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        return new ResponseEntity<>(quizService.save(quiz), HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<Quiz> updateQuiz(@RequestParam Long id, @RequestBody Quiz quiz) {
        Optional<Quiz> quizOptional = quizService.findById(id);
        if (!quizOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        quiz.setId(quizOptional.get().getId());

        return new ResponseEntity<>(quizService.save(quiz), HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<Quiz> deleteQuiz(@RequestParam Long id) {
        Optional<Quiz> quizOptional = quizService.findById(id);
        if (!quizOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        quizService.remove(id);
        return new ResponseEntity<>(quizOptional.get(), HttpStatus.NO_CONTENT);
    }
}
