package com.example.hobbie.model.repostiory;

import com.example.hobbie.model.entities.Category;
import com.example.hobbie.model.entities.enums.CategoryNameEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {


    Optional<Category> findByName(CategoryNameEnum category);
}
