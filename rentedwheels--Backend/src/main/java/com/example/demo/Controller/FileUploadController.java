package com.example.demo.Controller;

import com.example.demo.Entity.Vehicle;
import com.example.demo.Repository.VehicleRepository;
import com.example.demo.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicReference;



@RestController
public class FileUploadController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private VehicleRepository vehicleRepository;

    //Save the uploaded file to this folder (when using web, put the uploaded_folder location pointing towards the web location)
    private static String UPLOADED_FOLDER = "D://barca";

    @PostMapping("/upload/{id}") // //new annotation since 4.3
    public String singleFileUpload(@RequestParam("file") MultipartFile file,
                                   @PathVariable("id") int id,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            System.out.println("Empty Ch");
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "Empty";
        }

        try {
            System.out.println("File upload started chikan "+file.getOriginalFilename());
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();

            File dir = new File(UPLOADED_FOLDER);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Create the file on server
            File serverFile = new File(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
            stream.write(bytes);
            stream.close();

            System.out.println("Server File Location=" + serverFile.getAbsolutePath());

            Vehicle vehicle= vehicleService.getById(id);
            if(vehicle != null){
                vehicle.setFilePath(UPLOADED_FOLDER+"//"+file.getOriginalFilename());
                vehicleRepository.save(vehicle);
            }else {
                return "Vehicle Not Found";
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return "Uploaded Successfully";
    }


}
