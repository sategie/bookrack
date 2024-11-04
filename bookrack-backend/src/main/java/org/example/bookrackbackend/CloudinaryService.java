package org.example.bookrackbackend;

import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile image) throws IOException {
        // Creates a temporary file in the system's default temp directory
        File fileToUpload = File.createTempFile("upload_", ".tmp");
        try {
            // Transfer multipart file to the temporary file
            image.transferTo(fileToUpload);

            // Upload file using Cloudinary
            Map response = cloudinary.uploader().upload(fileToUpload, Map.of());

            // Return the URL upon successful upload
            return response.get("url").toString();
        } finally {
            // Ensure that the temporary file is deleted once its job is done
            fileToUpload.delete();
        }
    }
}
