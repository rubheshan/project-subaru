// backend/src/Car.java

package com.subaru.model; // Use a package name to organize your code

import java.io.Serializable;

// Implementing Serializable is a good practice for objects that will be passed over a network (like to a Servlet)
public class Car implements Serializable {
    
    // Private Fields (Data Encapsulation)
    private int id;
    private String modelName;
    private double price;
    private String imageUrl;
    private String videoUrl;
    
    // Constructor (Used to create a new Car object)
    public Car(int id, String modelName, double price, String imageUrl, String videoUrl) {
        this.id = id;
        this.modelName = modelName;
        this.price = price;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
    }
    
    // Public Getter Methods (Read access) - Demonstrates OOP
    public int getId() {
        return id;
    }

    public String getModelName() {
        return modelName;
    }

    public double getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    // Public Setter Methods (Write/Update access) - You can add business logic here later, like validation
    public void setPrice(double price) {
        // Example: You could add logic here to ensure price > 0
        this.price = price;
    }
    
    // (You can omit setters for ID, Name, and URLs if you don't want them changeable after creation)
    
    // Optional: toString() method for easy debugging
    @Override
    public String toString() {
        return "Car [id=" + id + ", modelName=" + modelName + ", price=" + price + "]";
    }
}