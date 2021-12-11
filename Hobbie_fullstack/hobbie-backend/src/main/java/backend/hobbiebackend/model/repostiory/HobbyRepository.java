package backend.hobbiebackend.model.repostiory;

import backend.hobbiebackend.model.entities.Hobby;
import backend.hobbiebackend.model.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HobbyRepository extends JpaRepository<Hobby, Long> {

    List<Hobby> findAllByBusinessOwnerBusinessName(String businessName);
    List<Hobby> findAllByLocation(Location location);

}
