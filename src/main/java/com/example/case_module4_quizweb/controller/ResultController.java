package com.example.case_module4_quizweb.controller;

import com.example.case_module4_quizweb.model.Result;
import com.example.case_module4_quizweb.sevice.result.IResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/results")
public class ResultController {
    @Autowired
    private IResultService resultService;

    @GetMapping("")
    public ResponseEntity<Iterable<Result>> findAllResult() {
        List<Result> results = (List<Result>) resultService.findAll();
        if (results.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
    @PostMapping("")
    public ResponseEntity<Result> findResultById(@RequestParam Long id) {
        Optional<Result> resultOptional = resultService.findById(id);
        if (!resultOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Result result = resultOptional.get();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<Result> createResult(@RequestBody Result result) {
        return new ResponseEntity<>(resultService.save(result), HttpStatus.OK);
    }
    @PutMapping("")
    public ResponseEntity<Result> updateResult(@RequestParam Long id, @RequestBody Result result) {
        Optional<Result> resultOptional = resultService.findById(id);
        if (!resultOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        result.setId(resultOptional.get().getId());

        return new ResponseEntity<>(resultService.save(result), HttpStatus.OK);
    }
    @DeleteMapping("")
    public ResponseEntity<Result> deleteQuiz(@RequestParam Long id) {
        Optional<Result> resultOptional = resultService.findById(id);
        if (!resultOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        resultService.remove(id);
        return new ResponseEntity<>(resultOptional.get(), HttpStatus.NO_CONTENT);
    }
}
