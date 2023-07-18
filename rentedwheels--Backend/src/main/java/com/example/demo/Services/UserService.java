package com.example.demo.Services;

import com.example.demo.Entity.Booking;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Vehicle;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    UserRepository userRepository;

    @Autowired
    private AccountVerificationService accountVerificationService;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Gives users list
    public List<User> getAllUsers() {
        List<User> userList = userRepository.findAll();
        List<User> newUserList = new ArrayList<>();
        for (User user : userList) {
            if (!user.isDeleted()) {
                newUserList.add(user);
            }
        }
        return newUserList;
        // return userRepository.findAll().stream().filter(x ->
        // !x.isDeleted()).collect(Collectors.toList());
    }

    // Gives admin list
    public List<User> getAllAdmin() {
        List<User> adminList = userRepository.findAll();
        List<User> newAdminList = new ArrayList<>();
        for (User user : adminList) {
            if (user.isAdmin()) {
                newAdminList.add(user);
            }
        }
        return newAdminList;

    }

    // Finding the user
    public User getById(int id) {
        return (User) userRepository.findById(id).orElse(null);
    }

    //Update the user
    public User updateUser(User user) {
        User user1 = userRepository.findById(user.getId()).get();

        user1.setAddress(user.getAddress());
        user1.setFullName(user.getFullName());
        user1.setEmailAddress(user.getEmailAddress());
        user1.setPassword(user.getPassword());
        user1.setPickupOutlet(user.getPickupOutlet());
        user1.setPhoneNumber(user.getPhoneNumber());
        return userRepository.save(user1);
    }

    // Deletes the user

    public User deleteUser(int id) {
        User user = userRepository.findById(id).get();
        user.setDeleted(true);
        return userRepository.save(user);
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        User user = userRepository.findByUsername(username);
        System.out.println(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found In the Database");
        } else {
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                authorities);
    }


    public User saveUser(User user) {
        // TODO Auto-generated method stub
        Integer emailCount = userRepository.emailCount(user.getEmailAddress());
        if (emailCount > 0)
        {
            throw new RuntimeException("Email address already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setVerified(false);
        userRepository.saveAndFlush(user);
        accountVerificationService.sendVerificationEmail(user);
        return user;
    }
    public User userBookingRequestMail(Booking booking,String username, String vehicleName){
        String body = "Dear, admin\n" +
                "You have received a request for a new booking:\n "
                +"User Name: " + username+"\n"
                +"Vehicle Name: " + vehicleName+"\n"
                +"Date: From " + booking.getFromDate() + " to " + booking.getToDate() ;

        emailSenderService.sendEmail("prabeshdace@gmail.com",body,"RentedWheels Booking Notification");
        return null;
    }

    public User userBookingRequestAcceptedMail(Booking booking){
        String body = "Dear, " + booking.getBookedBy().getUsername() + " your request for booking of " +
                booking.getVehicle().getVehicleName() + "has been accepted";

        emailSenderService.sendEmail(booking.getMailAddress(),body,"RentedWheels Booking Notification");
        return null;
    }
    public Role saveRole(Role role) {
        // TODO Auto-generated method stub
        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        // TODO Auto-generated method stub
        User user = userRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    public User getUser(String username) {
        // TODO Auto-generated method stub
        return userRepository.findByUsername(username);
    }

    public List<User> getUsers() {
        // TODO Auto-generated method stub
        return userRepository.findAll();
    }


    public boolean verifyAccount(String verificationToken, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found for given id"));
        String databaseToken = user.getVerificationToken();
        if (databaseToken == null) {
            throw new RuntimeException("Invalid Request");
        }
        if (!Objects.equals(verificationToken, databaseToken)) {
            throw new RuntimeException("Invalid verification token");
        }
        user.setVerified(true);
        userRepository.save(user);
        return true;
    }
}
