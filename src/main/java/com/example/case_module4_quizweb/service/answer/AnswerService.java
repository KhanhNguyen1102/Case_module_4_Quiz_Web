package com.example.case_module4_quizweb.service.answer;

import com.example.case_module4_quizweb.model.Answer;
import com.example.case_module4_quizweb.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnswerService implements IAnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public Iterable<Answer> findAll() {
        return answerRepository.findAll();
    }

    @Override
    public Optional<Answer> findById(Long id) {
        return answerRepository.findById(id);
    }

    @Override
    public Answer save(Answer answer) {
        return answerRepository.save(answer);
    }

    @Override
    public void remove(Long id) {
        answerRepository.deleteById(id);
    }
}
