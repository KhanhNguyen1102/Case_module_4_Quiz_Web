package com.example.case_module4_quizweb.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String content;
    @NotNull
    private int correct;
//    (1 là đúng , 2 là sai)
    @ManyToOne
    private Quiz quiz;

    public Answer() {
    }

    public Answer(Long id, String content, int correct, Quiz quiz) {
        this.id = id;
        this.content = content;
        this.correct = correct;
        this.quiz = quiz;
    }

    public Answer(String content, int correct, Quiz quiz) {
        this.content = content;
        this.correct = correct;
        this.quiz = quiz;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getCorrect() {
        return correct;
    }

    public void setCorrect(int correct) {
        this.correct = correct;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}
