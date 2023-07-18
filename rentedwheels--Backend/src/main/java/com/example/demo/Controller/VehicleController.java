package com.example.demo.Controller;

import com.example.demo.Entity.Booking;
import com.example.demo.Entity.Vehicle;
import com.example.demo.Entity.VehicleRatingDTO;
import com.example.demo.Services.BookingService;
import com.example.demo.Services.VehicleRatingService;
import com.example.demo.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController

@CrossOrigin(origins = "http://localhost:3000")

public class VehicleController {

    @Autowired
    VehicleService vehicleService;

    @Autowired
    BookingService bookingService;

    @Autowired
    VehicleRatingService vehicleRatingService;

    private VehicleRatingDTO vehicleRatingDTO;


    //Adds vehicle
    @PostMapping("/addWheel")
    public Vehicle addVehicle (@RequestBody Vehicle vehicle,@RequestParam(value="userId") int userId){
        return vehicleService.saveVehicle(vehicle, userId);
    }

    //Adds vehicle in list
    @PostMapping("/addWheels")
    public List<Vehicle> addVehicles(@RequestBody List<Vehicle> vehicles){
        return vehicleService.saveVehicles(vehicles);
    }

    // Books the vehicle
    @PostMapping("/bookVehicle/{id}")
    public Vehicle bookVehicle(@PathVariable int id){
        return vehicleService.bookingStatus(id);
    }

    @PostMapping("/changeBookingStatus/{id}")
    public Vehicle changeStatus(@PathVariable int id){
        return vehicleService.changeBookingStatus(id);
    }

    //End of post mapping

  //Gets vehicles list
    @GetMapping("/getVehicles")
    public List<Vehicle> getVehicles(){
        return vehicleService.getAllVehicles();
    }

    //Gets a vehicle
    @GetMapping("/getVehicle/{id}")
    public Vehicle getVehicleById(@PathVariable int id){
        return vehicleService.getById(id);
    }

    //Gets a vehicle of offroad type
    @GetMapping("/getOffroad/{vehicleType}")
    public List<Vehicle> getOffroad(@PathVariable String vehicleType){return vehicleService.getOffroads(vehicleType);}
//End of get request

    //Start of Put Request

    // Updates the vehicle info
    @PutMapping("/updateVehicle")
    public Vehicle updateVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(vehicle);
    }

    //Deletes the selected vehicle
    @DeleteMapping("/deleteVehicle/{id}")
    public String deleteVehicle(@PathVariable int id){ return vehicleService.deleteVehicle(id);}


    //Caluclating the average rating of vehicle
    @GetMapping("rating/{vehicleID}")
    public Double getVehicleRating(@PathVariable int vehicleID) throws Exception {
        return vehicleRatingService.findAverageRatingOFVehicle(vehicleID);
    }

    @PostMapping("rate/{userID}/{vehicleID}")
    public String rateVehicles(@PathVariable("userID") int userID,
                               @PathVariable("vehicleID") int vehicleID,
                               @RequestParam(value="comment",required=false) String comment,
                               @RequestParam(value="rating",required=false) Integer rating){
        vehicleRatingDTO = new VehicleRatingDTO();
        if(comment != null ){
            vehicleRatingDTO.setComment(comment);
        }
        if(rating != null && rating>0){
            vehicleRatingDTO.setRatings(rating);
        }
        if(rating ==null && comment == null){
            vehicleRatingDTO=null;
        }
        return vehicleRatingService.rateVehicle(userID, vehicleID, vehicleRatingDTO);

    }

    @PostMapping("/verifyVehicle")
    public Vehicle verifyVehicle(@RequestParam(value = "id") int id,
                                 @RequestParam(value = "vehicleStatus") String vehicleStatus){
        return vehicleService.verifyVehicle(id, vehicleStatus);
    }



// For the id method mentioned above

//    @PostMapping("/{userId}/{vehicleId}")
//    public Booking bookingVehicle(@PathVariable int userId, @PathVariable int vehicleId){
//        return bookingService.saveBookingName(userId, vehicleId);
//    }

}


