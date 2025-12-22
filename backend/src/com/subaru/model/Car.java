package com.subaru.model;

import java.io.Serializable;
import java.util.List;

public class Car implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private int id;
    private String modelName;
    private double price;
    private String imageUrl;   
    private String videoUrl;
    private String sideImageUrl;  
    private String frontImageUrl; 
    private String tagline;
    private String description;
    private String horsepower;
    private String torque;
    private String topSpeed;
    private String accelerationMT;
    private String accelerationAT;
    private String transmission;
    
    // CHANGED: Instead of List<String>, we use the ColorOption object
    private List<ColorOption> colorOptions; 
    
    private List<String> allImages;
    private List<String> exteriorImages;
    private List<String> interiorImages;
    private List<Highlight> highlights;

    // --- Constructor ---
    public Car(int id, String modelName, double price, String imageUrl, String videoUrl, 
               String sideImageUrl, String frontImageUrl,
               String tagline, String description, 
               String horsepower, String torque, String topSpeed, 
               String accelerationMT, String accelerationAT, 
               String transmission, List<ColorOption> colorOptions, // <--- Updated type
               List<String> allImages, List<String> exteriorImages, List<String> interiorImages,
               List<Highlight> highlights) {
        this.id = id;
        this.modelName = modelName;
        this.price = price;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
        this.sideImageUrl = sideImageUrl;
        this.frontImageUrl = frontImageUrl;
        this.tagline = tagline;
        this.description = description;
        this.horsepower = horsepower;
        this.torque = torque;
        this.topSpeed = topSpeed;
        this.accelerationMT = accelerationMT;
        this.accelerationAT = accelerationAT;
        this.transmission = transmission;
        this.colorOptions = colorOptions; // <--- Updated here
        this.allImages = allImages;
        this.exteriorImages = exteriorImages;
        this.interiorImages = interiorImages;
        this.highlights = highlights;
    }

    // --- Inner Class for Color Options (Configurator) ---
    public static class ColorOption implements Serializable {
        private String name;
        private String hex;
        private String image;

        public ColorOption(String name, String hex, String image) {
            this.name = name;
            this.hex = hex;
            this.image = image;
        }

        public String getName() { return name; }
        public String getHex() { return hex; }
        public String getImage() { return image; }
    }

    // --- Inner Class for Highlights ---
    public static class Highlight implements Serializable {
        private String title;
        private String description;
        private String image;

        public Highlight(String title, String description, String image) {
            this.title = title;
            this.description = description;
            this.image = image;
        }

        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public String getImage() { return image; }
    }

    // --- Getters ---
    public int getId() { return id; }
    public String getModelName() { return modelName; }
    public double getPrice() { return price; }
    public String getImageUrl() { return imageUrl; }
    public String getVideoUrl() { return videoUrl; }
    public String getSideImageUrl() { return sideImageUrl; }
    public String getFrontImageUrl() { return frontImageUrl; }
    public String getTagline() { return tagline; }
    public String getDescription() { return description; }
    public String getHorsepower() { return horsepower; }
    public String getTorque() { return torque; }
    public String getTopSpeed() { return topSpeed; }
    public String getAccelerationMT() { return accelerationMT; }
    public String getAccelerationAT() { return accelerationAT; }
    public String getTransmission() { return transmission; }
    public List<ColorOption> getColorOptions() { return colorOptions; } // <--- Updated
    public List<String> getAllImages() { return allImages; }
    public List<String> getExteriorImages() { return exteriorImages; }
    public List<String> getInteriorImages() { return interiorImages; }
    public List<Highlight> getHighlights() { return highlights; }
}