package com.example.hobbie.service;

import com.example.hobbie.model.entities.Location;
import com.example.hobbie.model.entities.enums.LocationEnum;

import java.util.List;

public interface LocationService {
    List<Location> initLocations();

    Location getLocationByName(LocationEnum locationEnum);
}
