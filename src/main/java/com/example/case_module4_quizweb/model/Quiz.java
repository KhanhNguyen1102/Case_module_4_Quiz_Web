package com.example.case_module4_quizweb.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String content;
    @ManyToOne
    private Category category;

    private int value;
    @NotNull
    private int status;
//    (1 là active, 2 là inactive)

    public Quiz() {
    }

    public Quiz(Long id, String content, Category category, int value, int status) {
        this.id = id;
        this.content = content;
        this.category = category;
        this.value = value;
        this.status = status;
    }

    public Quiz(String content, Category category, int value, int status) {
        this.content = content;
        this.category = category;
        this.value = value;
        this.status = status;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
