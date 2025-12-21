package com.subaru.model;

import java.io.Serializable;
import java.util.List;

public class Car implements Serializable {
    
    private int id;
    private String modelName;
    private double price;
    private String imageUrl;   // Thumbnail for listing
    private String videoUrl;
    
    // NEW DYNAMIC IMAGE FIELDS
    private String sideImageUrl;  // Act 1 Hero Image
    private String frontImageUrl; // Act 2 Performance Image

    private String tagline;
    private String description;
    private List<String> strengths;
    private String horsepower;
    private String torque;
    private String topSpeed;
    private String accelerationMT;
    private String accelerationAT;
    private String transmission;
    private List<String> colors;

    // Updated Constructor
    public Car(int id, String modelName, double price, String imageUrl, String videoUrl, 
               String sideImageUrl, String frontImageUrl,
               String tagline, String description, List<String> strengths, 
               String horsepower, String torque, String topSpeed, 
               String accelerationMT, String accelerationAT, 
               String transmission, List<String> colors) {
        this.id = id;
        this.modelName = modelName;
        this.price = price;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
        this.sideImageUrl = sideImageUrl;
        this.frontImageUrl = frontImageUrl;
        this.tagline = tagline;
        this.description = description;
        this.strengths = strengths;
        this.horsepower = horsepower;
        this.torque = torque;
        this.topSpeed = topSpeed;
        this.accelerationMT = accelerationMT;
        this.accelerationAT = accelerationAT;
        this.transmission = transmission;
        this.colors = colors;
    }

    // GETTERS
    public int getId() { return id; }
    public String getModelName() { return modelName; }
    public double getPrice() { return price; }
    public String getImageUrl() { return imageUrl; }
    public String getVideoUrl() { return videoUrl; }
    public String getSideImageUrl() { return sideImageUrl; }
    public String getFrontImageUrl() { return frontImageUrl; }
    public String getTagline() { return tagline; }
    public String getDescription() { return description; }
    public List<String> getStrengths() { return strengths; }
    public String getHorsepower() { return horsepower; }
    public String getTorque() { return torque; }
    public String getTopSpeed() { return topSpeed; }
    public String getAccelerationMT() { return accelerationMT; }
    public String getAccelerationAT() { return accelerationAT; }
    public String getTransmission() { return transmission; }
    public List<String> getColors() { return colors; }
}