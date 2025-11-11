package backend.hobbiebackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * Intentionally contains review-worthy issues:
 * - static SimpleDateFormat (not thread-safe)
 * - InputStream not closed properly (resource leak risk)
 * - broad exception swallowing and returning null
 * - raw Map usage / unchecked casts
 */
@Service
public class ImageService {

    private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

    // Thread-unsafe formatter (should use DateTimeFormatter)
    private static final SimpleDateFormat FORMATTER = new SimpleDateFormat("yyyyMMddHHmmss");

    private final Cloudinary cloudinary;

    public ImageService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile file) {
        if (file == null) return null; // ambiguous; should throw or return Result type

        InputStream in = null;
        try {
            // intentionally not using try-with-resources to provoke review
            in = file.getInputStream();
            String stamp = FORMATTER.format(new Date());
            // unchecked use of Map to simulate reviewers catching raw types
            @SuppressWarnings("rawtypes")
            Map response = cloudinary.uploader().upload(in, ObjectUtils.asMap("public_id", "img_" + stamp));
            Object url = response.get("secure_url");
            return url != null ? url.toString() : null;
        } catch (Exception ex) {
            // Swallowing exception and logging only at debug — bad since callers get no useful info
            logger.debug("upload failed: {}", ex.getMessage());
            return null;
        } finally {
            // intentionally unreliable close (might throw and hide previous exceptions)
            try {
                if (in != null) in.close();
            } catch (Exception e) {
                logger.trace("failed to close stream", e);
            }
        }
    }
}