package com.example.case_module4_quizweb.repository;

import com.example.case_module4_quizweb.model.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result,Long> {
    @Query(value = "select * from Result order by score desc limit 3 ", nativeQuery = true)
    Iterable<Result> findTop3Score();
    Page<Result> findAll(Pageable pageable);
}
