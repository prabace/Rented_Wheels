package com.example.demo.Services;

import com.example.demo.Entity.User;
import com.example.demo.Entity.Vehicle;
import com.example.demo.Entity.VehicleRating;
import com.example.demo.Entity.VehicleRatingDTO;
import com.example.demo.Repository.VehicleRatingRepository;
import com.example.demo.Repository.VehicleRepository;
import org.apache.tomcat.util.digester.ArrayStack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.OptionalDouble;

@Service
public class VehicleRatingService {

    @Autowired
    private VehicleService vehicleService;
    @Autowired
    private UserService userService;
    @Autowired
    private VehicleRatingRepository vehicleRatingRepository;
    @Autowired
    private VehicleRepository vehicleRepository;

    public String rateVehicle(int userID, int vehicleID, VehicleRatingDTO dto) {

        VehicleRating rating = new VehicleRating();
        Vehicle vehicle = vehicleService.getById(vehicleID);
        User user = userService.getById(userID);

        if (vehicle == null) {
            return "Vehicle Not Found";
        }
        if (user == null) {
            return "User Not Found";
        }
        if (dto == null) {
            return "Thank you Visit Again";
        }
        if (dto.getComment() != null) {
            rating.setComment(dto.getComment());
        }

        if (dto.getRatings() < 6 || dto.getRatings() > 0) {
            rating.setRating(dto.getRatings());
        }

        rating.setVehicle(vehicle);
        rating.setUser(user);
        vehicleRatingRepository.save(rating);
        return "Rated";
    }


    public List<VehicleRatingDTO> findRatingDetailsByVehicle(int vehicleID) throws Exception {
        Vehicle vehicle = vehicleService.getById(vehicleID);

        List<VehicleRating> ratingDetails = new ArrayList<>();
        List<VehicleRatingDTO> dtoList = new ArrayStack<>();
        if (vehicle != null) {
            ratingDetails = vehicleRatingRepository.findVehicleRatingByVehicle(vehicle);

            for (VehicleRating rating : ratingDetails) {
                User user = new User();
                VehicleRatingDTO dto = new VehicleRatingDTO();
                dto.setUserName(rating.getUser().getUsername());

                dto.setRatings(rating.getRating());
                if (rating.getComment() != null && !rating.getComment().isEmpty()) {
                    dto.setComment(rating.getComment());
                }
                dto.setRatingDate(String.valueOf(LocalDate.now()));
                dto.setId(rating.getId());
                dtoList.add(dto);

            }
            return dtoList;
        }else{
            throw  new Exception("Vehicle Not Found");
        }
    }

    public Double findAverageRatingOFVehicle(int vehicleID) throws Exception {
        Vehicle vehicle = vehicleService.getById(vehicleID);
        if (vehicle != null) {
            List<VehicleRating> vehicles = vehicleRatingRepository.findVehicleRatingByVehicle(vehicle);
            Double average = vehicles.stream().filter(s -> s.getRating() > 0)
                    .mapToInt(VehicleRating::getRating).average().getAsDouble();

            Double returnAverage = BigDecimal.valueOf(average)
                    .setScale(1, RoundingMode.HALF_UP)
                    .doubleValue();
            return returnAverage;
        } else {
            throw new Exception("Vehicle Not Found");
        }
    }

    public String deleteRating(int id) {
        VehicleRating rating = vehicleRatingRepository.findById(id).get();
        vehicleRatingRepository.deleteById(id);
        return "Deleted";
    }
}
