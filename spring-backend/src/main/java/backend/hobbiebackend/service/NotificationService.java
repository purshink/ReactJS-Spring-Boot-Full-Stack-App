package backend.hobbiebackend.service;

import backend.hobbiebackend.model.entities.AppClient;
import backend.hobbiebackend.model.entities.UserEntity;
import org.springframework.scheduling.annotation.Async;

public interface NotificationService {
    @Async
    void sendNotification(UserEntity userEntity);
}
