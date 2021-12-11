package com.example.hobbie;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;


@SpringBootApplication
@EnableAsync
public class HobbieApplication {

    public static void main(String[] args) {

        SpringApplication.run(HobbieApplication.class, args);
    }

}
