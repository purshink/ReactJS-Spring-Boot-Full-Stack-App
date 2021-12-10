package com.example.hobbiebackend.service;

import com.example.hobbiebackend.model.entities.Location;
import com.example.hobbiebackend.model.entities.enums.LocationEnum;

import java.util.List;

public interface LocationService {
    List<Location> initLocations();

    Location getLocationByName(LocationEnum locationEnum);
}
