package com.example.hobbiebackend.model.repostiory;

import com.example.hobbiebackend.model.entities.BusinessOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessOwnerRepository extends JpaRepository<BusinessOwner, Long> {
    Optional<BusinessOwner> findByUsername(String username);


    Optional<BusinessOwner> findByBusinessName(String businessName);
}
