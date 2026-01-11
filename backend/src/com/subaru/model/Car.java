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
    
    // Quick Stats
    private String horsepower;
    private String torque;
    private String topSpeed;
    private String accelerationMT;
    private String accelerationAT;
    private String transmission;
    
    // --- NEW: Detailed Specs for Comparison Page ---
    private Specifications specs; 

    private List<ColorOption> colorOptions; 
    private List<String> allImages;
    private List<String> exteriorImages;
    private List<String> interiorImages;
    private List<Highlight> highlights;
    private List<Variant> variants;

    // --- UPDATED CONSTRUCTOR WITH 'Specifications' ---
    public Car(int id, String modelName, double price, String imageUrl, String videoUrl, 
               String sideImageUrl, String frontImageUrl,
               String tagline, String description, 
               String horsepower, String torque, String topSpeed, 
               String accelerationMT, String accelerationAT, 
               String transmission, 
               Specifications specs, // <--- THIS PARAMETER WAS MISSING
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
        this.specs = specs; // <--- ASSIGN IT
        this.colorOptions = colorOptions;
        this.allImages = allImages;
        this.exteriorImages = exteriorImages;
        this.interiorImages = interiorImages;
        this.highlights = highlights;
        this.variants = variants;
    }

    // --- NEW: The Detailed Specifications Class ---
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

    // --- Inner Classes (Keep existing) ---
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

    public static class SpecItem implements Serializable {
        private String label;
        private String value;
        public SpecItem(String label, String value) { this.label = label; this.value = value; }
        public String getLabel() { return label; }
        public String getValue() { return value; }
    }

    public static class ColorOption implements Serializable {
        private String name;
        private String hex;
        private String image;
        public ColorOption(String name, String hex, String image) { this.name = name; this.hex = hex; this.image = image; }
        public String getName() { return name; }
        public String getHex() { return hex; }
        public String getImage() { return image; }
    }

    public static class Highlight implements Serializable {
        private String title;
        private String description;
        private String image;
        public Highlight(String title, String description, String image) { this.title = title; this.description = description; this.image = image; }
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public String getImage() { return image; }
    }

    // --- Getters ---
    public Specifications getSpecs() { return specs; } // <--- NEW GETTER
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