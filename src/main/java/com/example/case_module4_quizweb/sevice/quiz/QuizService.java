package com.example.case_module4_quizweb.sevice.quiz;

import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizService implements IQuizService {
    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Iterable<Quiz> findAll() {
        return quizRepository.findAll();
    }

    @Override
    public Optional<Quiz> findById(Long id) {
        return quizRepository.findById(id);
    }

    @Override
    public Quiz save(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public void remove(Long id) {
            quizRepository.deleteById(id);
    }
}
