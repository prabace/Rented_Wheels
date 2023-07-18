package com.example.demo.Controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.User;
import com.example.demo.Entity.Vehicle;
import com.example.demo.Entity.VehicleRatingDTO;
import com.example.demo.Services.UserService;
import com.example.demo.Services.VehicleRatingService;
import com.example.demo.Services.VehicleService;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    VehicleService vehicleService;
    @Autowired
    VehicleRatingService vehicleRatingService;


    @PostMapping("/addUser")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable int id){
        return userService.getById(id);
    }

    @GetMapping("/getUsers")
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getAdmins")
    public List<User> getAdmins(){return userService.getAllAdmin();}

	@GetMapping("/verify-account")
	public boolean verifyAccount(@RequestParam String verificationToken, @RequestParam Integer userId){
		return userService.verifyAccount(verificationToken, userId);
	}


    @PutMapping("/updateUser/{id}")
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }



    @DeleteMapping("deleteUser/{id}")
    public User deleteUser(@PathVariable int id){
        return userService.deleteUser(id);
    }

    @GetMapping("/token/refresh")
	public void refreshToken(HttpServletRequest request, HttpServletResponse response ) throws JsonGenerationException, JsonMappingException, IOException {
		String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			try {
				String refresh_token = authorizationHeader.substring("Bearer ".length());
				Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
				JWTVerifier verifier = JWT.require(algorithm).build();
				DecodedJWT decodedJWT = verifier.verify(refresh_token);
				String username = decodedJWT.getSubject();
				
				User user= userService.getUser(username);
				
				String access_token = JWT.create().withSubject(user.getUsername())
						.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
						.withIssuer(request.getRequestURI().toString())
						.withClaim("roles",
								user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
						.sign(algorithm);
				
//				response.setHeader("access_token", access_token);
//				response.setHeader("refresh_token", refresh_token);
				Map<String, String> tokens= new HashMap<>();
				tokens.put("access_token", access_token);	
				tokens.put("refresh_token", refresh_token);	
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), tokens);
			} catch (Exception e) {
				e.printStackTrace();
				response.setHeader("error",e.getMessage());
				response.setStatus(HttpStatus.FORBIDDEN.value());
				//response.sendError(HttpStatus.FORBIDDEN.value());
				Map<String, String> error= new HashMap<>();
				error.put("ERROR_MSG", e.getMessage());	
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				new ObjectMapper().writeValue(response.getOutputStream(), error);
			}
		}else {
			throw new RuntimeException("Refresh Token is Missing");
		}
	}
}

@Data
class RoleToUserForm {
	private String username;
	private String roleName;
}
