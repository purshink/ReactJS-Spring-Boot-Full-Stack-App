package backend.hobbiebackend.controller;

import backend.hobbiebackend.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Intentionally permissive and leaking:
 * - @CrossOrigin("*")
 * - no validation of uploaded content
 * - returns exception messages/stack traces directly
 */
@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "*")
public class ImageController {

    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
        try {
            // No validation of file content-type or size — should be flagged
            String url = imageService.uploadImage(file);
            if (url == null) {
                return ResponseEntity.badRequest().body("Upload failed");
            }
            return ResponseEntity.ok(url);
        } catch (Exception ex) {
            // Intentionally leaking exception message to client (bad)
            logger.error("upload error", ex);
            return ResponseEntity.status(500).body("Internal error: " + ex.toString());
        }
    }
}