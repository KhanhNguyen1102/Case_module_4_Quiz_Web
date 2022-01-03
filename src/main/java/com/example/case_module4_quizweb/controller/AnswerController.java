package com.example.case_module4_quizweb.controller;

import com.example.case_module4_quizweb.model.Answer;
import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.sevice.answer.IAnswerService;
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
@RequestMapping("/api/answers")
public class AnswerController {
    @Autowired
    private IAnswerService answerService;

    @GetMapping("")
    public ResponseEntity<Iterable<Answer>> findAllQuiz() {
        List<Answer> answers = (List<Answer>) answerService.findAll();
        if (answers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }
}
