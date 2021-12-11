package com.example.hobbie.view;

import java.util.Date;

public class EntryViewModel {
    private Long id;
    private String date;
    private Long aboId;
    private boolean isInProcess;

    public EntryViewModel() {
    }

    public Long getAboId() {
        return aboId;
    }

    public void setAboId(Long abId) {
        this.aboId = abId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isInProcess() {
        return isInProcess;
    }

    public void setInProcess(boolean inProcess) {
        isInProcess = inProcess;
    }
}
