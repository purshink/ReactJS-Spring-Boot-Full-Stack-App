package com.example.hobbie.service.impl;

import com.example.hobbie.model.entities.AppClient;
import com.example.hobbie.model.entities.Entry;
import com.example.hobbie.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;


@Service
public class NotificationServiceImpl implements NotificationService {
    private final JavaMailSender javaMailSender;

    @Autowired
    public NotificationServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    @Override
    public void sendNotification(AppClient appClient, Entry entry) {
        SimpleMailMessage mail = new SimpleMailMessage();
       String mailBody ="http://localhost:8080/confirm-update-entry/" + entry.getId();
        String date = (new SimpleDateFormat("MM/dd/yyyy").format(Calendar.getInstance().getTime()));
        mail.setTo(appClient.getEmail());
        mail.setFrom("findyourhobbie@gmail.com");
        mail.setSubject("New Entry!");
        mail.setText("You made a new entry on: " + date + ". Click the link to confirm your entry: " +  mailBody);

        javaMailSender.send(mail);
    }
}
