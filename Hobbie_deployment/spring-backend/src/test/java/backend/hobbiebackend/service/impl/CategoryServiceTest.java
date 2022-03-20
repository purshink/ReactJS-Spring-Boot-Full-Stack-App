package backend.hobbiebackend.service.impl;

import backend.hobbiebackend.model.entities.Category;
import backend.hobbiebackend.model.entities.enums.CategoryNameEnum;
import backend.hobbiebackend.model.repostiory.CategoryRepository;
import backend.hobbiebackend.service.CategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

class CategoryServiceTest {
    private CategoryService categoryServiceTest;
    private CategoryRepository mockCategoryRepository;
    private Category category;

    @BeforeEach
    public void setUp() {
        mockCategoryRepository = mock(CategoryRepository.class);
        categoryServiceTest = new CategoryServiceImpl(mockCategoryRepository);
        category = new Category();
        category.setName(CategoryNameEnum.ACTIVE);
    }

    @Test
    void findByName_should_Work() {
        Mockito.when(mockCategoryRepository.findByName(CategoryNameEnum.ACTIVE)).
                thenReturn(Optional.of(category));
        Category byName = categoryServiceTest.findByName(CategoryNameEnum.ACTIVE);

        assertEquals(category.getName(), byName.getName());
    }

    @Test
    void initCategories_should_Work() {
        categoryServiceTest.initCategories();
        assertEquals(7, categoryServiceTest.initCategories().size());
    }
}
