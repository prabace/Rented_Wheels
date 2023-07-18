package com.example.demo.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name ="vehicle_type")
public class VehicleType {
    @Id
    @GeneratedValue
    private int id;
    private String type;
    private String title;
    private double price;
    private String img;
    

}
