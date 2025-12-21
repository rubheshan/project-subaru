package com.subaru.controller;

import com.google.gson.Gson;
import com.subaru.model.Car;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebServlet({"/products"})
public class ProductServlet extends HttpServlet {
   private static final long serialVersionUID = 1L;
   private Gson gson = new Gson();

   public ProductServlet() {
   }

   private List<Car> getCarData() {
      ArrayList<Car> cars = new ArrayList<>();

      // 1. Forester 2.5i-S
      cars.add(new Car(1, "Forester 2.5i-S", 221500.0, "/assets/video/Forester2.5-image.jpg", "/assets/video/Forester2.5.mp4", 
                "/assets/cars/forester-side.png", "/assets/cars/forester-front.png", // Added side/front
                "Unstoppable Adventure", "Standard SUV Description", Arrays.asList("AWD", "Safety"), "182hp", "239Nm", "193km/h", "9.5s", "9.5s", "CVT", Arrays.asList("Blue", "Black")));

      // 2. Forester
      cars.add(new Car(2, "Forester", 163500.0, "/assets/video/Forester-image.jpg", "/assets/video/Forester.mp4", 
                "/assets/cars/forester-side.png", "/assets/cars/forester-front.png", // Added side/front
                "Placeholder", "Description", Arrays.asList("Safe"), "156hp", "196Nm", "180km/h", "10s", "10s", "CVT", Arrays.asList("White")));

      // 3. Subaru XV
      cars.add(new Car(3, "Subaru XV", 155300.0, "/assets/video/XV-image.jpg", "/assets/video/XV.mp4", 
                "/assets/cars/xv-side.png", "/assets/cars/xv-front.png", // Added side/front
                "Placeholder", "Description", Arrays.asList("Compact"), "156hp", "196Nm", "180km/h", "10s", "10s", "CVT", Arrays.asList("Orange")));

      // 4. WRX
      cars.add(new Car(4, "WRX", 289500.0, "/assets/video/WRX-image.jpg", "/assets/video/WRX.mp4", 
                "/assets/cars/wrx-side.png", "/assets/cars/wrx-front.png", // Added side/front
                "Pure Performance", "Description", Arrays.asList("Turbo", "AWD"), "271hp", "350Nm", "250km/h", "6.0s", "6.1s", "6MT/CVT", Arrays.asList("Blue")));

      // 5. BRZ
      cars.add(new Car(5, "BRZ", 268500.0, "/assets/video/BRZ-image.jpg", "/assets/video/BRZ.mp4", 
                "/assets/cars/brz-side.png", "/assets/cars/brz-front.png", // Added side/front
                "Unleash Your Desire", "Discover the thrill of the Subaru BRZ, which combines stunning design with an exhilarating driving experience...", Arrays.asList("Subaru Boxer Engine", "Rear Wheel Drive", "Aerodynamic Design"), "234hp", "250 Nm", "216km/h", "6.4s", "6.8s", "6-speed manual or 6-speed automatic", Arrays.asList("WR Blue Pearl", "Ignition Red")));

      // 6. Outback
      cars.add(new Car(6, "Outback", 279000.0, "/assets/video/Outback-image.jpg", "/assets/video/Outback.mp4", 
                "/assets/cars/outback-side.png", "/assets/cars/outback-front.png", // Added side/front
                "Luxury SUV", "Description", Arrays.asList("Luxury", "Space"), "188hp", "245Nm", "200km/h", "9.6s", "9.6s", "CVT", Arrays.asList("Autumn Green")));

      return cars;
   }

   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      List<Car> carList = this.getCarData();
      String idParam = request.getParameter("id");
      Object responseData;

      if (idParam != null && !idParam.isEmpty()) {
         try {
            int searchId = Integer.parseInt(idParam);
            responseData = carList.stream().filter((car) -> {
               return car.getId() == searchId;
            }).findFirst().orElse(null);
         } catch (NumberFormatException var8) {
            responseData = carList;
         }
      } else {
         responseData = carList;
      }

      String jsonResponse = this.gson.toJson(responseData);
      response.setContentType("application/json");
      response.setCharacterEncoding("UTF-8");
      response.setHeader("Access-Control-Allow-Origin", "*");
      PrintWriter out = response.getWriter();
      out.print(jsonResponse);
      out.flush();
   }
}