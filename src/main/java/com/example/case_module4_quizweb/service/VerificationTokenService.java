package com.example.case_module4_quizweb.service;


import com.example.case_module4_quizweb.model.VerificationToken;

public interface VerificationTokenService {
    VerificationToken findByToken(String token);

    void save(VerificationToken token);
}