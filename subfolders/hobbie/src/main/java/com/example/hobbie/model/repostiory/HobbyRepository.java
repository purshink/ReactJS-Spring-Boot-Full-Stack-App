package com.example.hobbie.model.repostiory;

import com.example.hobbie.model.entities.Hobby;
import com.example.hobbie.model.entities.Location;
import com.example.hobbie.model.entities.enums.LocationEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HobbyRepository extends JpaRepository<Hobby, Long> {

    List<Hobby> findAllByBusinessOwnerBusinessName(String businessName);
    List<Hobby> findAllByLocation(Location location);

}
