package com.example.case_module4_quizweb.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private int score;
    @ManyToOne
    private User user;
    @ManyToOne
    private Test test;

    public Result() {
    }

    public Result(Long id, int score, User user, Test test) {
        this.id = id;
        this.score = score;
        this.user = user;
        this.test = test;
    }

    public Result(int score, User user, Test test) {
        this.score = score;
        this.user = user;
        this.test = test;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }
}
