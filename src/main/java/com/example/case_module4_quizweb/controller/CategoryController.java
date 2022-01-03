package com.example.case_module4_quizweb.controller;

import com.example.case_module4_quizweb.model.Category;
import com.example.case_module4_quizweb.sevice.category.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    ICategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<Iterable<Category>> findAllBlog() {
        List<Category> categories = (List<Category>) categoryService.findAll();
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @PostMapping("")
    public ResponseEntity<Category> findBlogById(@RequestParam Long id) {
        Optional<Category> categoryOptional = categoryService.findById(id);
        if (!categoryOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Category category = categoryOptional.get();
        return new ResponseEntity<>(category, HttpStatus.OK);
    }
//    @PutMapping("")
//    public ResponseEntity<Category> updateBlog(@RequestParam Long id, @RequestBody Category category) {
//        Optional<Category> categoryOptional = categoryService.findById(id);
//        if (!categoryOptional.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        category.setId(categoryOptional.get().getId());
//
//        return new ResponseEntity<>(categoryService.save(category), HttpStatus.OK);
//    }
}
