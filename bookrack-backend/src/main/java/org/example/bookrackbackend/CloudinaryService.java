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

    @SuppressWarnings("unchecked")
    public String uploadImage(MultipartFile file) throws IOException {
        // Use the default temporary file directory provided by the operating system
        File fileToUpload = File.createTempFile("upload_", ".tmp");
        try {
            // Transfer the incoming file data to the temporary file
            file.transferTo(fileToUpload);

            // Upload the file to Cloudinary
            Map<String, Object> response = cloudinary.uploader().upload(fileToUpload, Map.of());

            // Return the URL from the upload response
            return response.get("url").toString();
        } finally {
            // Ensure the temporary file is deleted after uploading
            if (fileToUpload.exists() && !fileToUpload.delete()) {
                fileToUpload.deleteOnExit();
            }
        }
    }
}
