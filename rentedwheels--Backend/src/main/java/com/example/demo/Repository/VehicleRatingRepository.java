package com.example.demo.Repository;

import com.example.demo.Entity.Vehicle;
import com.example.demo.Entity.VehicleRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface VehicleRatingRepository extends JpaRepository<VehicleRating, Integer> {

    VehicleRating findVehicleRatingByUserAndVehicle(int userID, int vehicleID);

//    @Query("Select v from VehicleRating where v.")
    List<VehicleRating> findVehicleRatingByVehicle(Vehicle vehicle);

    VehicleRating deleteVehicleRatingById(int id);
}
