package com.example.case_module4_quizweb.service;

import java.util.Optional;

public interface IGeneralService<T> {
    void save(T t);
    Iterable<T> findAll();
    Optional<T> findById(Long id);
    void remove(Long id);
}
