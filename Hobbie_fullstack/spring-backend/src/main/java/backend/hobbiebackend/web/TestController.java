package backend.hobbiebackend.web;


import backend.hobbiebackend.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class TestController {

    private final TestService testService;


    @Autowired
    public TestController(TestService testService) {
        this.testService = testService;
    }



    @PostMapping("/test")
    public String saveTestResults(){


//                this.testService.saveTest();

                return "test";
            }

}
