package com.example.demo.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="bookings")

public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private int id;

    //Below code was for case when the entity id from one table were drawn for the booking table

    @OneToOne
    @JoinColumn(name = "bookedBy", referencedColumnName = "id")
    private User bookedBy;

    @OneToOne
    @JoinColumn(name = "vehicle", referencedColumnName = "id")
    private Vehicle vehicle;

    private  String bookingStatus;
    private String firstName;
    private String lastName;
    private String mailAddress;
    private String phNumber;
    private String city;
    private String zipCode;
    private String fromDate;
    private String toDate;
    private String vname;
    private String vprice;
    private String vimage;
    private String vnumber;
    private String destination;
    private String citizenshipAttachment;
    private String paymentMethod;
    private boolean vehicleDispatched;




    private boolean booked;
    private boolean bookingDeleted;


}
