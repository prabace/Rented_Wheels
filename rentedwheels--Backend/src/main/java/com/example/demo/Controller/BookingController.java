package com.example.demo.Controller;

import com.example.demo.Entity.Booking;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Vehicle;
import com.example.demo.Services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class BookingController {
    @Autowired
    BookingService bookingService;
    @PostMapping("/addBooking")
  public Booking saveBooking(@RequestBody Booking booking,
                             @RequestParam(value="userId",required=false) int userId,
                             @RequestParam(value="vehicleId",required=false) int vehicleId){
        return bookingService.saveBooking(booking, userId, vehicleId);
    }

    @GetMapping("/getBooking/{id}")
    public Booking getVehicleBooking(@PathVariable int id){
        return bookingService.getBooking(id);
    }

    @GetMapping("/getBookings")
    public List<Booking> getVehicleBooking(){
        return bookingService.getAllBookings();
    }


    @PutMapping("/updateBooking/{id}")
    public Booking updateBooking(@RequestBody Booking booking){
        return bookingService.updateBooking(booking);
    }

    @DeleteMapping("deleteBooking/{id}")
    public Booking deleteBooking(@PathVariable int id){
        return bookingService.deleteBooking(id);
    }

    @PostMapping("vehicleDispatchStatusTrue/{id}")
    public Booking vehicleDispatchStatusSetTrue(@PathVariable int id){
        return bookingService.vehicleDispatchStatusTrue(id);
    }

    @PostMapping("vehicleDispatchStatusFalse/{id}")
    public Booking vehicleDispatchStatusSetFalse(@PathVariable int id){
        return bookingService.vehicleDispatchStatusFalse(id);
    }


    
//
    @GetMapping("/getBookingByUserId/{id}")
    public List<Booking> getBookingByUserId(@PathVariable int id){
        return bookingService.getBookingByUserId(id);
    }

    @PostMapping("/verifyBooking")
    public Booking verifyBooking(@RequestParam(value = "id") int id,
                                 @RequestParam(value = "bookingStatus") String bookingStatus){
        return bookingService.verifyBooking(id, bookingStatus);
    }


}
