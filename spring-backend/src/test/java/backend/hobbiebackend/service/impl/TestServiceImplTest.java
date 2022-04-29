package backend.hobbiebackend.service.impl;

import backend.hobbiebackend.model.repostiory.TestRepository;
import backend.hobbiebackend.service.TestService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

class TestServiceImplTest {
    private final TestRepository mockTestRepository = Mockito.mock(TestRepository.class);
    private final TestService mockTestService = Mockito.mock(TestService.class);

    @Test
    void save_test_results_should_work() {
        backend.hobbiebackend.model.entities.Test test = new backend.hobbiebackend.model.entities.Test();
        when(mockTestRepository.save(Mockito.any(backend.hobbiebackend.model.entities.Test.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        mockTestService.saveTestResults(test);

        assertNotNull(mockTestRepository.findById(1L));
    }
}