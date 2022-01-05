package com.example.case_module4_quizweb.service.user;

import com.example.case_module4_quizweb.model.User;
import com.example.case_module4_quizweb.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService extends IGeneralService<User> {
    Page<User> findAll(Pageable pageable);
}
