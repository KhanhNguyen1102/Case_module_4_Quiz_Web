package com.example.case_module4_quizweb.controller;

import com.example.case_module4_quizweb.model.Answer;
import com.example.case_module4_quizweb.service.answer.IAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/answers")
public class AnswerController {
    @Autowired
    private IAnswerService answerService;

    @GetMapping("")
    public ResponseEntity<Iterable<Answer>> findAllAnswer() {
        List<Answer> answers = (List<Answer>) answerService.findAll();
        if (answers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }
    @PostMapping("")
    public ResponseEntity<Answer> findAnswerById(@RequestParam Long id) {
        Optional<Answer> answerOptional = answerService.findById(id);
        if (!answerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Answer answer = answerOptional.get();
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer answer) {
        return new ResponseEntity<>(answerService.save(answer), HttpStatus.OK);
    }
    @PutMapping("")
    public ResponseEntity<Answer> updateAnswer(@RequestParam Long id, @RequestBody Answer answer) {
        Optional<Answer> answerOptional = answerService.findById(id);
        if (!answerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        answer.setId(answerOptional.get().getId());

        return new ResponseEntity<>(answerService.save(answer), HttpStatus.OK);
    }
    @DeleteMapping("")
    public ResponseEntity<Answer> deleteAnswer(@RequestParam Long id) {
        Optional<Answer> answerOptional = answerService.findById(id);
        if (!answerOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        answerService.remove(id);
        return new ResponseEntity<>(answerOptional.get(), HttpStatus.NO_CONTENT);
    }
}
