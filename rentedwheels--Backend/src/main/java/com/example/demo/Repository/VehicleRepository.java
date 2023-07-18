package com.example.demo.Repository;

import com.example.demo.Entity.User;
import com.example.demo.Entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    @Query(nativeQuery = true, value = "select * from vehicle\n" +
            "         inner join bookings b on b.vehicle = vehicle.id\n" +
            "where b.id = ?1")
    Vehicle getVehicleByBookingId(int bookingId);

}
