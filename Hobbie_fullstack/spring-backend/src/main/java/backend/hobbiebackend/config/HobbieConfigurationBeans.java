package backend.hobbiebackend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class HobbieConfigurationBeans {

//    @Bean
//    public PasswordEncoder createPasswordEncoder() {
//        return new Pbkdf2PasswordEncoder();
//    }

    @Bean
    public ModelMapper createModelMapper() {
        return new ModelMapper();
    }


}
