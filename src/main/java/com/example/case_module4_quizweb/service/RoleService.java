package com.example.case_module4_quizweb.service;


import com.example.case_module4_quizweb.model.Role;

public interface RoleService {
    Iterable<Role> findAll();


    void save(Role role);

    Role findByName(String name);
}
