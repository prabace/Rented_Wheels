package com.example.demo.Entity;

import lombok.*;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;


//@Getter
//@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="user")
public class User {
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)

    private int id;
    private String address;
    private String verificationToken;
    private boolean isVerified;

    private String emailAddress;
    private String fullName;
    private String phoneNumber;
    private String pickupOutlet;

    private boolean admin;
    private boolean deleted;
    private String username;
	private String password;
	
    @ManyToMany(fetch=FetchType.EAGER)
	private Collection<Role> roles=new ArrayList<Role>();
    
    public User(String username, String fullName, String emailAddress, String password, boolean admin, String address) {
    	this.username= username;
    	this.fullName= fullName;
    	this.emailAddress= emailAddress;
    	this.password= password;
    	this.address= address;
        this.admin = admin;
    }

}
