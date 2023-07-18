package com.example.demo.jwt.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Stream;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@CrossOrigin(origins = "http://localhost:3000")
@Component
public class FilterUtil {

	public void filterAuthentication(String authorizationHeader) {
		String token = authorizationHeader.substring("Bearer ".length());
		Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
		JWTVerifier verifier = JWT.require(algorithm).build();
		DecodedJWT decodedJWT = verifier.verify(token);
		String username = decodedJWT.getSubject();
		String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		Stream.of(roles).forEach(role -> {
			authorities.add(new SimpleGrantedAuthority(role));
		});
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null,
				authorities);
		SecurityContextHolder.getContext().setAuthentication(authToken);
	}

}