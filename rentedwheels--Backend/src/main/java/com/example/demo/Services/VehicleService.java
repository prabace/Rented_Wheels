package com.example.demo.Services;

import com.example.demo.Entity.Booking;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Vehicle;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleService {

    @Autowired
    UserService userService;
    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    UserRepository userRepository;

    //Gives vehicles list
    public List<Vehicle> getAllVehicles(){
        return vehicleRepository.findAll();
    }

    //Saves Vehicle
    public  Vehicle saveVehicle(Vehicle vehicle, int userId){

        User user = userService.getById(userId);
        vehicle.setVehicleAddedBy(user);
        vehicle.setUsername(user.getUsername());
        return vehicleRepository.save(vehicle);
    }

    //Saves multiple vehicles at once
    public List<Vehicle> saveVehicles(List<Vehicle> vehicles) {

        return vehicleRepository.saveAll(vehicles);
    }

    //Finding the vehicle
    public Vehicle getById(int id){
        return (Vehicle) vehicleRepository.findById(id).orElse(null);

    }

    //Returns offroad vehicles only
    public List<Vehicle> getOffroads(String vehicleType){
        List<Vehicle> offroadList = vehicleRepository.findAll();
        List<Vehicle> newOffroadList= new ArrayList<>();
        for(Vehicle vehicle: offroadList){
            System.out.println("vehicle = " + vehicle);
            if(vehicle.getVehicleType().equalsIgnoreCase(vehicleType)){
                newOffroadList.add(vehicle);
            }
        }
        return newOffroadList;

    }




    //Updating the vehicle
    public  Vehicle updateVehicle(Vehicle vehicle){
        Vehicle vehicle1 = vehicleRepository.findById(vehicle.getId()).get();        

        vehicle1.setVehicleName(vehicle.getVehicleName());
        vehicle1.setVehicleStatus(vehicle.getVehicleStatus());
        vehicle1.setAddedByUser(vehicle.isAddedByUser());
        vehicle1.setVehiclePrice(vehicle.getVehiclePrice());
        vehicle1.setVehicleType(vehicle.getVehicleType());
        vehicle1.setVehicleRating(vehicle.getVehicleRating());
        vehicle1.setVehicleReview(vehicle.getVehicleReview());
        vehicle1.setVehicleNumber(vehicle.getVehicleNumber());
        vehicle1.setTopSpeed(vehicle.getTopSpeed());
        vehicle1.setMaxPower(vehicle.getMaxPower());
        vehicle1.setAc(vehicle.getAc());
        vehicle1.setAccelerationTime(vehicle.getAccelerationTime());
        vehicle1.setAutoManual(vehicle.getAutoManual());
        vehicle1.setSeats(vehicle.getSeats());
        vehicle1.setFuelElectric(vehicle.getFuelElectric());
        vehicle1.setVehicleImage(vehicle.getVehicleImage());
        vehicle1.setVehicleNumber(vehicle.getVehicleNumber());



    return (Vehicle) vehicleRepository.save(vehicle1);
    }

    //Deleting the vehicle
    public String deleteVehicle(int id){
        vehicleRepository.deleteById(id);
        return "Vehicle removed " + id;
    }

    //Booking status
    public Vehicle bookingStatus(int id){
        Vehicle vehicle = vehicleRepository.findById(id).get();
        vehicle.setBooked(true);
        return vehicleRepository.save(vehicle);

    }
    public Vehicle changeBookingStatus(int id){
        Vehicle vehicle = vehicleRepository.findById(id).get();
        vehicle.setBooked(false);
        return vehicleRepository.save(vehicle);
    }

    public Vehicle verifyVehicle(int id, String vehicleStatus) {
        Vehicle vehicle = vehicleRepository.findById(id).get();
        vehicle.setVehicleStatus(vehicleStatus);
        return vehicleRepository.save(vehicle);
    }


// Uploading image from the local storage
//    private final String Folder_Path = "C:\\Users\\user\\OneDrive\\DesktopMy Files";
//    public String uploadImageToFileSystem (MultipartFile file) throws IOException{
//
//        String filePath = Folder_Path + file.getOriginalFilename();
//        Vehicle fileData = vehicleRepository.save(Vehicle.builder()
//                .type(file.getContentType())
//                .filePath(filePath).build());
//
//        file.transferTo(new File(filePath));
//
//        if (fileData != null) {
//    return "File uploaded Sucessfully" + filePath;
//        }
//
//        return null;
//    }


}
