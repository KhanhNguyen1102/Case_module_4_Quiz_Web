package com.example.case_module4_quizweb.repository;

import com.example.case_module4_quizweb.model.Quiz;
import com.example.case_module4_quizweb.model.Result;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends PagingAndSortingRepository<Result,Long> {
    @Query("SELECT r FROM Result r WHERE r.test.id = :id order by r.score desc")
    Page<Result> findAllByTestOrderByScore(Pageable pageable,@Param("id") Long id);


}
