package backend.hobbiebackend.service;

import backend.hobbiebackend.model.entities.Location;
import backend.hobbiebackend.model.entities.enums.LocationEnum;

import java.util.List;

public interface LocationService {
    List<Location> initLocations();

    Location getLocationByName(LocationEnum locationEnum);
}
