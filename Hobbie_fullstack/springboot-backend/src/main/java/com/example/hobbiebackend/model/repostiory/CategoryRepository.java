package com.example.hobbiebackend.model.repostiory;

import com.example.hobbiebackend.model.entities.Category;
import com.example.hobbiebackend.model.entities.enums.CategoryNameEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {


    Optional<Category> findByName(CategoryNameEnum category);
}
