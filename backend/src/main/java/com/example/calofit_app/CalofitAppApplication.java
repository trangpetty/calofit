package com.example.calofit_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.calofit_app.repository")
public class CalofitAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CalofitAppApplication.class, args);
	}

}
