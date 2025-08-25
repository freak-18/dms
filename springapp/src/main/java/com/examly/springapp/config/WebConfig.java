package com.examly.springapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://8081-dceeddfbaddeebdedeacdadbaffdcfddeefbafdffade.premiumproject.examly.io") // Adjust this for security
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
