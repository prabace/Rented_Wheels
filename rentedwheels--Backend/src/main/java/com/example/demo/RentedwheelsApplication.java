package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
@SpringBootApplication
public class RentedwheelsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RentedwheelsApplication.class, args);
	}
	
//	 @Bean
//	 CommandLineRunner run(UserService userService) {
//	 	return args -> {
//	 		userService.saveRole(new Role("ROLE_USER"));
//	 		userService.saveRole(new Role("ROLE_MANAGER"));
//	 		userService.saveRole(new Role("ROLE_ADMIN"));
//	 		userService.saveRole(new Role("ROLE_SUPER_ADMIN"));
//
//	 		userService.saveUser(new User("barca123", "Sunandan Ghimere", "barca@gmail.com", "123456", true, "Kathmandu"));
//	 		userService.saveUser(new User("abiral123","Abiral Sangroula", "abiral@gmail.com", "123456", true, "Kathmandu"));
//
//	 		userService.addRoleToUser("abiral123", "ROLE_ADMIN");
//	 		userService.addRoleToUser("barca123", "ROLE_ADMIN");
//	 	};
//	 }
//
//
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	}
