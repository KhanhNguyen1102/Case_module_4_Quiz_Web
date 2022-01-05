package com.example.case_module4_quizweb.repository;

import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User,Long> {
    User findByUsername(String username);
    @Override
    Page<User> findAll(Pageable pageable);
}
