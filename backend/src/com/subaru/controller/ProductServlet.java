package com.subaru.controller;

import com.google.gson.Gson;
import com.subaru.model.Car;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@WebServlet({"/products"})
public class ProductServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    private List<Car> getCarData() {
        ArrayList<Car> cars = new ArrayList<>();

        // --- 1. Forester 2.5i-S ---
        List<Car.Highlight> f25Highlights = Arrays.asList(
            new Car.Highlight("Direct Injection Boxer", "Enhanced 2.5L engine delivering 182hp.", "/assets/highlights/f25-engine.jpg"),
            new Car.Highlight("EyeSight® 4.0", "Next-gen safety with wider field of view.", "/assets/highlights/eyesight.jpg"),
            new Car.Highlight("Premium Interior", "High-quality leather and dual-zone climate.", "/assets/highlights/f25-interior.jpg")
        );
        List<String> f25Ext = Arrays.asList("/assets/cars/forester25/exterior/ext-1.jpg", "/assets/cars/forester25/exterior/ext-2.jpg", "/assets/cars/forester25/exterior/ext-3.jpg", "/assets/cars/forester25/exterior/ext-4.jpg");
        List<String> f25Int = Arrays.asList("/assets/cars/forester25/interior/int-1.jpg", "/assets/cars/forester25/interior/int-2.jpg", "/assets/cars/forester25/interior/int-3.jpg", "/assets/cars/forester25/interior/int-4.jpg");
        cars.add(new Car(1, "Forester 2.5i-S", 221500.0, "/assets/video/Forester2.5-image.jpg", "/assets/video/Forester2.5.mp4", "/assets/cars/forester-side.png", "/assets/cars/forester-front.png", "Unstoppable Adventure", "The flagship Forester.", "182hp", "239Nm", "193km/h", "9.5s", "9.5s", "CVT", Arrays.asList("Blue", "Black"), Stream.concat(f25Ext.stream(), f25Int.stream()).collect(Collectors.toList()), f25Ext, f25Int, f25Highlights));

        // --- 2. Forester (Standard) ---
        List<Car.Highlight> fHighlights = Arrays.asList(
            new Car.Highlight("Symmetrical AWD", "Legendary traction and balance.", "/assets/highlights/awd.jpg"),
            new Car.Highlight("Subaru Global Platform", "Increased rigidity for smoother handling.", "/assets/highlights/sgp.jpg"),
            new Car.Highlight("X-MODE", "Optimizes engine/brakes for slippery surfaces.", "/assets/highlights/xmode.jpg")
        );
        List<String> fExt = Arrays.asList("/assets/cars/forester/exterior/ext-1.jpg", "/assets/cars/forester/exterior/ext-2.jpg", "/assets/cars/forester/exterior/ext-3.jpg", "/assets/cars/forester/exterior/ext-4.jpg");
        List<String> fInt = Arrays.asList("/assets/cars/forester/interior/int-1.jpg", "/assets/cars/forester/interior/int-2.jpg", "/assets/cars/forester/interior/int-3.jpg", "/assets/cars/forester/interior/int-4.jpg");
        cars.add(new Car(2, "Forester", 163500.0, "/assets/video/Forester-image.jpg", "/assets/video/Forester.mp4", "/assets/cars/forester-side.png", "/assets/cars/forester-front.png", "The All-Rounder", "Practical meets safety.", "156hp", "196Nm", "180km/h", "10s", "10s", "CVT", Arrays.asList("White"), Stream.concat(fExt.stream(), fInt.stream()).collect(Collectors.toList()), fExt, fInt, fHighlights));

        // --- 3. Subaru XV ---
        List<Car.Highlight> xvHighlights = Arrays.asList(
            new Car.Highlight("Urban Agility", "220mm ground clearance for city and trail.", "/assets/highlights/xv-urban.jpg"),
            new Car.Highlight("Smart Connectivity", "8-inch touchscreen with Apple CarPlay.", "/assets/highlights/xv-tech.jpg"),
            new Car.Highlight("SRH Headlights", "Beams move in the direction of your turn.", "/assets/highlights/led.jpg")
        );
        List<String> xvExt = Arrays.asList("/assets/cars/xv/exterior/ext-1.jpg", "/assets/cars/xv/exterior/ext-2.jpg", "/assets/cars/xv/exterior/ext-3.jpg", "/assets/cars/xv/exterior/ext-4.jpg");
        List<String> xvInt = Arrays.asList("/assets/cars/xv/interior/int-1.jpg", "/assets/cars/xv/interior/int-2.jpg", "/assets/cars/xv/interior/int-3.jpg", "/assets/cars/xv/interior/int-4.jpg");
        cars.add(new Car(3, "XV", 155300.0, "/assets/video/XV-image.jpg", "/assets/video/XV.mp4", "/assets/cars/xv-side.png", "/assets/cars/xv-front.png", "Urban Explorer", "Style and capability.", "156hp", "196Nm", "194km/h", "10.4s", "10.4s", "CVT", Arrays.asList("Orange"), Stream.concat(xvExt.stream(), xvInt.stream()).collect(Collectors.toList()), xvExt, xvInt, xvHighlights));

        // --- 4. WRX ---
        List<Car.Highlight> wrxHighlights = Arrays.asList(
            new Car.Highlight("2.4L Turbo Boxer", "Rally-bred engine delivering 271hp.", "/assets/highlights/wrx-engine.jpg"),
            new Car.Highlight("Performance Chassis", "Aggressive suspension and stiffened body.", "/assets/highlights/wrx-chassis.jpg"),
            new Car.Highlight("11.6-inch Tablet Display", "High-res display for vehicle settings.", "/assets/highlights/wrx-dash.jpg")
        );
        List<String> wrxExt = Arrays.asList("/assets/cars/wrx/exterior/ext-1.jpg", "/assets/cars/wrx/exterior/ext-2.jpg", "/assets/cars/wrx/exterior/ext-3.jpg", "/assets/cars/wrx/exterior/ext-4.jpg");
        List<String> wrxInt = Arrays.asList("/assets/cars/wrx/interior/int-1.jpg", "/assets/cars/wrx/interior/int-2.jpg", "/assets/cars/wrx/interior/int-3.jpg", "/assets/cars/wrx/interior/int-4.jpg");
        cars.add(new Car(4, "WRX", 289500.0, "/assets/video/WRX-image.jpg", "/assets/video/WRX.mp4", "/assets/cars/wrx-side.png", "/assets/cars/wrx-front.png", "Pure Performance", "Icon of speed.", "271hp", "350Nm", "250km/h", "6.0s", "6.1s", "6MT/CVT", Arrays.asList("Blue"), Stream.concat(wrxExt.stream(), wrxInt.stream()).collect(Collectors.toList()), wrxExt, wrxInt, wrxHighlights));

        // --- 5. BRZ ---
        List<Car.Highlight> brzHighlights = Arrays.asList(
            new Car.Highlight("Ultra-Low CoG", "Center of gravity height of 456mm.", "/assets/highlights/brz-engine.jpg"),
            new Car.Highlight("RWD Soul", "Features Torsen® limited-slip differential.", "/assets/highlights/brz-rwd.jpg"),
            new Car.Highlight("Track Mode Cockpit", "Digital gauges with linear tachometer.", "/assets/highlights/brz-cockpit.jpg")
        );
        List<String> brzExt = Arrays.asList("/assets/cars/brz/exterior/ext-1.jpg", "/assets/cars/brz/exterior/ext-2.jpg", "/assets/cars/brz/exterior/ext-3.jpg", "/assets/cars/brz/exterior/ext-4.jpg");
        List<String> brzInt = Arrays.asList("/assets/cars/brz/interior/int-1.jpg", "/assets/cars/brz/interior/int-2.jpg", "/assets/cars/brz/interior/int-3.jpg", "/assets/cars/brz/interior/int-4.jpg");
        cars.add(new Car(5, "BRZ", 268500.0, "/assets/video/BRZ-image.jpg", "/assets/video/BRZ.mp4", "/assets/cars/brz-side.png", "/assets/cars/brz-front.png", "Unleash Your Desire", "Pure sports car DNA.", "234hp", "250Nm", "216km/h", "6.4s", "6.8s", "6-speed manual", Arrays.asList("WR Blue Pearl", "Ignition Red"), Stream.concat(brzExt.stream(), brzInt.stream()).collect(Collectors.toList()), brzExt, brzInt, brzHighlights));

        // --- 6. Outback ---
        List<Car.Highlight> outHighlights = Arrays.asList(
            new Car.Highlight("Nappa Leather", "Exquisite tan seats for premium touring.", "/assets/highlights/outback-luxury.jpg"),
            new Car.Highlight("Driver Monitoring", "Facial recognition for safety.", "/assets/highlights/outback-safety.jpg"),
            new Car.Highlight("Hands-Free Tailgate", "Open rear gate with a simple motion.", "/assets/highlights/outback-gate.jpg")
        );
        List<String> outExt = Arrays.asList("/assets/cars/outback/exterior/ext-1.jpg", "/assets/cars/outback/exterior/ext-2.jpg", "/assets/cars/outback/exterior/ext-3.jpg", "/assets/cars/outback/exterior/ext-4.jpg");
        List<String> outInt = Arrays.asList("/assets/cars/outback/interior/int-1.jpg", "/assets/cars/outback/interior/int-2.jpg", "/assets/cars/outback/interior/int-3.jpg", "/assets/cars/outback/interior/int-4.jpg");
        cars.add(new Car(6, "Outback", 279000.0, "/assets/video/Outback-image.jpg", "/assets/video/Outback.mp4", "/assets/cars/outback-side.png", "/assets/cars/outback-front.png", "Luxury SUV", "Ultimate comfort and rugged utility.", "188hp", "245Nm", "206km/h", "9.6s", "9.6s", "CVT", Arrays.asList("Autumn Green"), Stream.concat(outExt.stream(), outInt.stream()).collect(Collectors.toList()), outExt, outInt, outHighlights));

        return cars;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        List<Car> carList = this.getCarData();
        String idParam = request.getParameter("id");
        Object responseData;

        if (idParam != null && !idParam.isEmpty()) {
            try {
                int searchId = Integer.parseInt(idParam);
                responseData = carList.stream().filter((car) -> car.getId() == searchId).findFirst().orElse(null);
            } catch (NumberFormatException e) {
                responseData = carList;
            }
        } else {
            responseData = carList;
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().print(this.gson.toJson(responseData));
    }
}