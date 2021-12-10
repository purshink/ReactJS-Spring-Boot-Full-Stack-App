package com.example.hobbiebackend.model.repostiory;

import com.example.hobbiebackend.model.entities.Location;
import com.example.hobbiebackend.model.entities.enums.LocationEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {


    Optional<Location> findByName(LocationEnum locationEnum);
}
