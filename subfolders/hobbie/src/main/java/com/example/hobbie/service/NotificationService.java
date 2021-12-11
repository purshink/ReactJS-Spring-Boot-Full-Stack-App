package com.example.hobbie.service;

import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.Entry;
import org.springframework.scheduling.annotation.Async;

public interface NotificationService {

    @Async
    void sendNotification(AppClient appClient, Entry entry);
}
