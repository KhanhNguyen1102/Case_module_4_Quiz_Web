package com.example.case_module4_quizweb.controller;

import com.example.case_module4_quizweb.model.User;
import com.example.case_module4_quizweb.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/users")
public class UserController {
@Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<Iterable<User>> findAllMode() {
        List<User> users = (List<User>) userService.findAll();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<User> save(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<>( HttpStatus.CREATED);
    }



}
