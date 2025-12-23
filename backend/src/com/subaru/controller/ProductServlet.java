package com.subaru.controller;

import com.subaru.model.Car;
import com.google.gson.Gson; // Will now be available because you added the JAR
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// The annotation maps the URL "/products" to this Servlet.
@WebServlet("/products") 
public class ProductServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    // ----------------------------------------------------
    // OOP Method to generate our product list (Business Logic)
    // In a real app, this would be a database connection.
    // ----------------------------------------------------
    private List<Car> getCarData() {
        List<Car> cars = new ArrayList<>();

        // NOTE: Prices are converted to numeric double. Image/Video paths are public URLs.
        // Assuming React serves assets from the root path (/)
        cars.add(new Car(1, "Forester 2.5i-S", 221500.00, "/assets/video/Forester2.5-image.jpg", "/assets/video/Forester2.5.mp4"));
        cars.add(new Car(2, "Forester", 163500.00, "/assets/video/Forester-image.jpg", "/assets/video/Forester.mp4"));
        cars.add(new Car(3, "Subaru XV", 155300.00, "/assets/video/XV-image.jpg", "/assets/video/XV.mp4"));
        cars.add(new Car(4, "WRX", 289500.00, "/assets/video/WRX-image.jpg", "/assets/video/WRX.mp4"));
        cars.add(new Car(5, "BRZ", 268500.00, "/assets/video/BRZ-image.jpg", "/assets/video/BRZ.mp4"));
        cars.add(new Car(6, "Outback", 279000.00, "/assets/video/Outback-image.jpg", "/assets/video/Outback.mp4"));
    
        return cars;
    }

    // Handles GET requests (which is what React will use to fetch data)
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
                         throws ServletException, IOException {
        
        // 1. Get the data from our OOP model/method
        List<Car> carList = getCarData();
        
        // 2. Convert the Java List of Car objects into a single JSON string
        String jsonCarList = this.gson.toJson(carList);
        
        // 3. Set the required response headers (CRITICAL for React/CORS)
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        // IMPORTANT: Allow your React app (running on a different port/address) to access this data
        response.setHeader("Access-Control-Allow-Origin", "*"); 
        
        // 4. Write the JSON string to the output stream
        PrintWriter out = response.getWriter();
        out.print(jsonCarList);
        out.flush();
    }
}