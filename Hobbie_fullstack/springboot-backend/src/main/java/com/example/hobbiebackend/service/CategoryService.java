package com.example.hobbiebackend.service;

import com.example.hobbiebackend.model.entities.Category;
import com.example.hobbiebackend.model.entities.enums.CategoryNameEnum;

import java.util.List;

public interface CategoryService {
    Category findByName(CategoryNameEnum category);

    List<Category> initCategories();

}
