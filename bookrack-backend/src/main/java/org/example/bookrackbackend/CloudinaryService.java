package org.example.bookrackbackend;

import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }



    @SuppressWarnings("unchecked")
    public String uploadImage(MultipartFile image) throws IOException {
        File fileToUpload = File.createTempFile("file", null);
        try {
            image.transferTo(fileToUpload);
            Map<String, Object> response = cloudinary.uploader().upload(fileToUpload, Map.of());
            return response.get("url").toString();
        } finally {
            Files.deleteIfExists(Path.of(fileToUpload.toURI()));
        }
    }
}
