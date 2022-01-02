package com.example.case_module4_quizweb.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private int status;
//    (1 là đang hoạt động,2 là block)
    @ManyToOne
    private User user;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Quiz> quizzes;

    public Test() {
    }

    public Test(Long id, String name, int status, User user, Set<Quiz> quizzes) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.user = user;
        this.quizzes = quizzes;
    }

    public Test(String name, int status, User user, Set<Quiz> quizzes) {
        this.name = name;
        this.status = status;
        this.user = user;
        this.quizzes = quizzes;
    }

    public Test(String name, int status, User user) {
        this.name = name;
        this.status = status;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Quiz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
    }
}
