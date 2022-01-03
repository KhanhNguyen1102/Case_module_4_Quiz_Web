package com.example.case_module4_quizweb.controller;

import com.example.case_module4_quizweb.model.Test;
import com.example.case_module4_quizweb.sevice.test.ITestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @PostMapping("")
    public ResponseEntity<Test> findQuizById(@RequestParam Long id) {
        Optional<Test> testOptional = testService.findById(id);
        if (!testOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Test test = testOptional.get();
        return new ResponseEntity<>(test, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Test> createQuiz(@RequestBody Test test) {
        return new ResponseEntity<>(testService.save(test), HttpStatus.OK);
    }
    @PutMapping("")
    public ResponseEntity<Test> updateQuiz(@RequestParam Long id, @RequestBody Test test) {
        Optional<Test> testOptional = testService.findById(id);
        if (!testOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        test.setId(testOptional.get().getId());

        return new ResponseEntity<>(testService.save(test), HttpStatus.OK);
    }
    @DeleteMapping("")
    public ResponseEntity<Test> deleteQuiz(@RequestParam Long id) {
        Optional<Test> testOptional = testService.findById(id);
        if (!testOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        testService.remove(id);
        return new ResponseEntity<>(testOptional.get(), HttpStatus.NO_CONTENT);
    }

}
