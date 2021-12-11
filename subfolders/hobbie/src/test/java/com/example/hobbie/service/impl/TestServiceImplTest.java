package com.example.hobbie.service.impl;

import com.example.hobbie.model.entities.Hobby;
import com.example.hobbie.model.entities.UserRoleEntity;
import com.example.hobbie.model.entities.enums.CategoryNameEnum;
import com.example.hobbie.model.entities.enums.LocationEnum;
import com.example.hobbie.model.repostiory.TestRepository;
import com.example.hobbie.model.service.TestServiceModel;
import com.example.hobbie.service.TestService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

class TestServiceImplTest {
    private TestRepository mockTestRepository = Mockito.mock(TestRepository.class);
    private TestService mockTestService = Mockito.mock(TestService.class);
    @Test
    void saveTest() {

        TestServiceModel testServiceModel = new TestServiceModel();
//        testServiceModel.setCategoryFive(CategoryNameEnum.ACTIVE);
//        testServiceModel.setCategoryFour(CategoryNameEnum.OTHER);
//        testServiceModel.setCategorySeven(CategoryNameEnum.RELAX);
//        testServiceModel.setCategoryOne(CategoryNameEnum.FUN);
//        testServiceModel.setCategoryTwo(CategoryNameEnum.CREATIVE);
//        testServiceModel.setCategoryThree(CategoryNameEnum.INTELLECTUAL);
//        testServiceModel.setLocation(LocationEnum.ZURICH);

        when(mockTestRepository.save(Mockito.any( com.example.hobbie.model.entities.Test.class)))
                .thenAnswer(i -> i.getArguments()[0]);
         mockTestService.saveTest(testServiceModel);

        assertNotNull(mockTestRepository.findById(1L));

    }
}