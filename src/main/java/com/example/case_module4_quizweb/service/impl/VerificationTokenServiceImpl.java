package com.example.case_module4_quizweb.service.impl;



import com.example.case_module4_quizweb.model.VerificationToken;
import com.example.case_module4_quizweb.repository.VerificationTokenRepository;
import com.example.case_module4_quizweb.service.VerificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerificationTokenServiceImpl implements VerificationTokenService {

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Override
    public VerificationToken findByToken(String token) {
        return verificationTokenRepository.findByToken(token);
    }

    @Override
    public void save(VerificationToken token) {
        verificationTokenRepository.save(token);
    }
}