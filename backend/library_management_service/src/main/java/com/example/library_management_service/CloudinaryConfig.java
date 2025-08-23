package com.example.library_management_service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dtnjhu4v2",
                "api_key", "784145426939329",
                "api_secret", "DKXh3RdYo-94jRG1xlT_LRP0pGk",
                "secure", true
        ));
    }
}