package com.example.demo.Services;

import com.example.demo.Entity.Booking;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Vehicle;
import com.example.demo.Repository.BookingRepository;
import com.example.demo.Repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service

public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    VehicleRepository vehicleRepository;


    // userService and vehicleService objects were made for the case where booking table draws id of vehicle and user
//not applicable right now so ignore

    @Autowired
    UserService userService;

    @Autowired
    VehicleService vehicleService;

    @Autowired
    EmailSenderService emailSenderService;

    //Gives Booking list
    public List<Booking> getAllBookings(){
        List<Booking> bookingList= bookingRepository.findAll();
        List<Booking> newBookingList= new ArrayList<>();
        for(Booking booking: bookingList){
            if(!booking.isBookingDeleted()){
                newBookingList.add(booking);
            }
        }
        return newBookingList;
         }

         //Below code was for case when the entity id from one table were drawn for the booking table

//    //Saves Booking
    public  Booking saveBookingName(Booking booking, int userId, int vehicleId){ // int userId is also added inside paranthesis incase user needs to be saved
        Vehicle vehicle= vehicleService.getById(vehicleId);
        User user = userService.getById(userId);
        vehicle.setBooked(true);
        vehicleRepository.save(vehicle);
        booking.setBookedBy(user);
        booking.setVehicle(vehicle);
        booking.setBooked(true);
        bookingRepository.saveAndFlush(booking);
        userService.userBookingRequestMail(booking,user.getUsername(),vehicle.getVehicleName());
        return booking;
    }
//
//    //Finding the booking
//    public Booking getById(int id){
//        return (Booking) bookingRepository.findById(id).orElse(null);
//    }
//    //Update the booking
//    public Booking updateBooking(Booking booking) {
//        Booking booking1 = bookingRepository.findById(booking.getId()).get();
//
//        booking1.setBookedBy(booking.getBookedBy());
//
//        return bookingRepository.save(booking1);
//    }

//This is the new code for booking service i.e. getting info from the user again

    //Saves Booking
    public  Booking saveBooking(Booking booking, int userId, int vehicleId){

           return saveBookingName(booking,userId, vehicleId);
    }

    //Finding the booking
    public Booking getBooking(int id){
        return (Booking) bookingRepository.findById(id).orElse(null);
    }
    //Update the booking
    public Booking updateBooking(Booking booking) {
        Booking booking1 = bookingRepository.findById(booking.getId()).get();

        booking1.setBookingStatus(booking.getBookingStatus());
        booking1.setCity(booking.getCity());
        booking1.setFirstName(booking.getFirstName());
        booking1.setLastName(booking.getLastName());
        booking1.setFromDate(booking.getFromDate());
        booking1.setToDate(booking.getToDate());
        booking1.setMailAddress(booking.getMailAddress());
        booking1.setPhNumber(booking.getPhNumber());
        booking1.setZipCode(booking.getZipCode());
        booking1.setVname(booking.getVname());
        booking1.setVprice(booking.getVprice());
        booking1.setVimage(booking.getVimage());
        booking1.setDestination(booking.getDestination());
        booking1.setCitizenshipAttachment(booking.getCitizenshipAttachment());
        booking1.setPaymentMethod(booking.getPaymentMethod());
        return bookingRepository.save(booking1);
    }

    //Get booking by user id
    public List<Booking> getBookingByUserId(int userId){
        List<Booking> bookingList= bookingRepository.findAll();
        List<Booking> newBookingList= new ArrayList<>();
        for(Booking booking: bookingList){
            if(!booking.isBookingDeleted() && booking.getBookedBy().getId()==userId){
                newBookingList.add(booking);
            }
        }
        return newBookingList;
    }

    //Deletes the user
    //Deletes the booking

    public Booking deleteBooking(int id){
        Booking booking = bookingRepository.findById(id).get();
        booking.setBookingDeleted(true);
        booking.setBooked(false);

        // Calling vehicle
        Vehicle vehicle = vehicleRepository.getVehicleByBookingId(id);
        vehicle.setBooked(false);
        vehicleRepository.save(vehicle);

        return bookingRepository.save(booking);
    }

    public Booking vehicleDispatchStatusTrue(int id){
        Booking booking = bookingRepository.findById(id).get();
            booking.setVehicleDispatched(true);

        return bookingRepository.save(booking);
    }

    public Booking vehicleDispatchStatusFalse(int id){
        Booking booking = bookingRepository.findById(id).get();
        booking.setVehicleDispatched(false);

        return bookingRepository.save(booking);
    }



    public Booking verifyBooking(int id, String bookingStatus) {
        Booking booking = bookingRepository.findById(id).get();
        booking.setBookingStatus(bookingStatus);
        userService.userBookingRequestAcceptedMail(booking);
        return bookingRepository.save(booking);
    }






}
