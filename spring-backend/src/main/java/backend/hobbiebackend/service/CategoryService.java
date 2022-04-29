package backend.hobbiebackend.service;

import backend.hobbiebackend.model.entities.Category;
import backend.hobbiebackend.model.entities.enums.CategoryNameEnum;

import java.util.List;

public interface CategoryService {
    Category findByName(CategoryNameEnum category);

    List<Category> initCategories();
}
