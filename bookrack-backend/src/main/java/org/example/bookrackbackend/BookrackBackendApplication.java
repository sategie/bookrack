package org.example.bookrackbackend;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@SpringBootApplication
public class BookrackBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookrackBackendApplication.class, args);
    }

    @Configuration
    public class CloudinaryConfig {

        @Value("${cloudinary.cloud_name}") private String cloudName;
        @Value("${cloudinary.api_key}") private String apiKey;
        @Value("${cloudinary.api_secret}") private String apiSecret;

        @Bean
        public Cloudinary cloudinary() {
            Map<String, String> config = ObjectUtils.asMap(
                    "cloud_name", cloudName, // Replace with your Cloud Name//
                    "api_key", apiKey, // Replace with your API Key
                    "api_secret", apiSecret, // Replace with your API Secret
                    "secure", true);
            return new Cloudinary(config);

        }
    }

}
