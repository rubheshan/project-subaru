package com.subaru.model;

import java.io.Serializable;
import java.util.List;

/**
 * The Car class is the primary Data Model for the application.
 * It implements Serializable to allow the objects to be converted into 
 * byte streams (necessary for some web server operations and JSON conversion).
 */
public class Car implements Serializable {
    private static final long serialVersionUID = 1L;
    
    // Basic Identification & Marketing Data
    private int id;
    private String modelName;
    private double price;
    private String imageUrl;   
    private String videoUrl;
    private String sideImageUrl;  
    private String frontImageUrl; 
    private String tagline;
    private String description;
    
    // Quick Stats: Displayed on the main product cards
    private String horsepower;
    private String torque;
    private String topSpeed;
    private String accelerationMT;
    private String accelerationAT;
    private String transmission;
    
    // Detailed Specs: Used for the technical comparison tables
    private Specifications specs; 

    // Media & Feature Collections
    private List<ColorOption> colorOptions; 
    private List<String> allImages;
    private List<String> exteriorImages;
    private List<String> interiorImages;
    private List<Highlight> highlights;
    private List<Variant> variants;

    /**
     * Main Constructor to initialize a full Car object with all nested data.
     */
    public Car(int id, String modelName, double price, String imageUrl, String videoUrl, 
               String sideImageUrl, String frontImageUrl,
               String tagline, String description, 
               String horsepower, String torque, String topSpeed, 
               String accelerationMT, String accelerationAT, 
               String transmission, 
               Specifications specs,
               List<ColorOption> colorOptions,
               List<String> allImages, List<String> exteriorImages, List<String> interiorImages,
               List<Highlight> highlights,
               List<Variant> variants) {
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
        this.specs = specs;
        this.colorOptions = colorOptions;
        this.allImages = allImages;
        this.exteriorImages = exteriorImages;
        this.interiorImages = interiorImages;
        this.highlights = highlights;
        this.variants = variants;
    }

    /**
     * Inner class representing technical dimensions and engine details.
     */
    public static class Specifications implements Serializable {
        private String engineType;      
        private String displacement;    
        private String fuelSystem;      
        private String fuelCapacity;    
        private String length;          
        private String width;           
        private String height;          
        private String wheelbase;       
        private String groundClearance; 
        private String curbWeight;      
        private String seatingCapacity; 
        private String tireSize;        

        public Specifications(String engineType, String displacement, String fuelSystem, String fuelCapacity,
                              String length, String width, String height, String wheelbase, 
                              String groundClearance, String curbWeight, String seatingCapacity, String tireSize) {
            this.engineType = engineType;
            this.displacement = displacement;
            this.fuelSystem = fuelSystem;
            this.fuelCapacity = fuelCapacity;
            this.length = length;
            this.width = width;
            this.height = height;
            this.wheelbase = wheelbase;
            this.groundClearance = groundClearance;
            this.curbWeight = curbWeight;
            this.seatingCapacity = seatingCapacity;
            this.tireSize = tireSize;
        }
    }

    /**
     * Inner class for specific car models like GT Edition vs Standard
     */
    public static class Variant implements Serializable {
        private String name;
        private double price;
        private String image;
        private List<SpecItem> specs;

        public Variant(String name, double price, String image, List<SpecItem> specs) {
            this.name = name;
            this.price = price;
            this.image = image;
            this.specs = specs;
        }
        public String getName() { return name; }
        public double getPrice() { return price; }
        public String getImage() { return image; }
        public List<SpecItem> getSpecs() { return specs; }
    }

    /**
     * Represents a single label-value pair for technical lists.
     */
    public static class SpecItem implements Serializable {
        private String label;
        private String value;
        public SpecItem(String label, String value) { this.label = label; this.value = value; }
        public String getLabel() { return label; }
        public String getValue() { return value; }
    }

    /**
     * Represents a paint color choice with a Hex code for UI rendering.
     */
    public static class ColorOption implements Serializable {
        private String name;
        private String hex;
        private String image;
        public ColorOption(String name, String hex, String image) { this.name = name; this.hex = hex; this.image = image; }
        public String getName() { return name; }
        public String getHex() { return hex; }
        public String getImage() { return image; }
    }

    /**
     * Represents a specific feature "Highlight" with an image and text.
     */
    public static class Highlight implements Serializable {
        private String title;
        private String description;
        private String image;
        public Highlight(String title, String description, String image) { this.title = title; this.description = description; this.image = image; }
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public String getImage() { return image; }
    }

    // --- Getters for Accessing Data ---
    public Specifications getSpecs() { return specs; } 
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
    public List<ColorOption> getColorOptions() { return colorOptions; }
    public List<String> getAllImages() { return allImages; }
    public List<String> getExteriorImages() { return exteriorImages; }
    public List<String> getInteriorImages() { return interiorImages; }
    public List<Highlight> getHighlights() { return highlights; }
    public List<Variant> getVariants() { return variants; }
}