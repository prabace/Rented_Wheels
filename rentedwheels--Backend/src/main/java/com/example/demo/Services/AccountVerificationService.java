package com.example.demo.Services;

import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AccountVerificationService {

    private  final EmailSenderService emailSenderService;
    private final UserRepository userRepository;
    public String sendVerificationEmail( User user){

        Integer userId = user.getId();
        UUID uuid = UUID.randomUUID();
        String verificationToken = uuid.toString();
        String body = "Dear, " + user.getUsername() + " you have successfully registered in our system." +
                " Click the link below to verify your email. "
                + "http://localhost:3000/verifyEmail/" + verificationToken + "/" + userId;

        emailSenderService.sendEmail(user.getEmailAddress(),body,"RentedWheels Alert Message");

        user.setVerificationToken(verificationToken);
        userRepository.save(user);
        return null;

    }

}
