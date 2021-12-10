package com.example.hobbiebackend.model.repostiory;

import com.example.hobbiebackend.model.entities.UserRoleEntity;
import com.example.hobbiebackend.model.entities.enums.UserRoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRoleEntity, Long> {


    Optional<UserRoleEntity> findByRole(UserRoleEnum roleEnum);
}
