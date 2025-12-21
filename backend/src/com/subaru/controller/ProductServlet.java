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

        // 1. Forester 2.5i-S
        List<String> f25Ext = Arrays.asList("/assets/cars/forester25/exterior/ext-1.jpg", "/assets/cars/forester25/exterior/ext-2.jpg", "/assets/cars/forester25/exterior/ext-3.jpg", "/assets/cars/forester25/exterior/ext-4.jpg");
        List<String> f25Int = Arrays.asList("/assets/cars/forester25/interior/int-1.jpg", "/assets/cars/forester25/interior/int-2.jpg", "/assets/cars/forester25/interior/int-3.jpg", "/assets/cars/forester25/interior/int-4.jpg");
        List<String> f25All = Stream.concat(f25Ext.stream(), f25Int.stream()).collect(Collectors.toList());
        cars.add(new Car(1, "Forester 2.5i-S", 221500.0, "/assets/video/Forester2.5-image.jpg", "/assets/video/Forester2.5.mp4", "/assets/cars/forester-side.png", "/assets/cars/forester-front.png", "Unstoppable Adventure", "Standard SUV Description", Arrays.asList("AWD", "Safety"), "182hp", "239Nm", "193km/h", "9.5s", "9.5s", "CVT", Arrays.asList("Blue", "Black"), f25All, f25Ext, f25Int));

        // 2. Forester (Standard)
        List<String> fExt = Arrays.asList("/assets/cars/forester/exterior/ext-1.jpg", "/assets/cars/forester/exterior/ext-2.jpg", "/assets/cars/forester/exterior/ext-3.jpg", "/assets/cars/forester/exterior/ext-4.jpg");
        List<String> fInt = Arrays.asList("/assets/cars/forester/interior/int-1.jpg", "/assets/cars/forester/interior/int-2.jpg", "/assets/cars/forester/interior/int-3.jpg", "/assets/cars/forester/interior/int-4.jpg");
        List<String> fAll = Stream.concat(fExt.stream(), fInt.stream()).collect(Collectors.toList());
        cars.add(new Car(2, "Forester", 163500.0, "/assets/video/Forester-image.jpg", "/assets/video/Forester.mp4", "/assets/cars/forester-side.png", "/assets/cars/forester-front.png", "The All-Rounder", "Description", Arrays.asList("Safe"), "156hp", "196Nm", "180km/h", "10s", "10s", "CVT", Arrays.asList("White"), fAll, fExt, fInt));

        // 3. Subaru XV
        List<String> xvExt = Arrays.asList("/assets/cars/xv/exterior/ext-1.jpg", "/assets/cars/xv/exterior/ext-2.jpg", "/assets/cars/xv/exterior/ext-3.jpg", "/assets/cars/xv/exterior/ext-4.jpg");
        List<String> xvInt = Arrays.asList("/assets/cars/xv/interior/int-1.jpg", "/assets/cars/xv/interior/int-2.jpg", "/assets/cars/xv/interior/int-3.jpg", "/assets/cars/xv/interior/int-4.jpg");
        List<String> xvAll = Stream.concat(xvExt.stream(), xvInt.stream()).collect(Collectors.toList());
        cars.add(new Car(3, "Subaru XV", 155300.0, "/assets/video/XV-image.jpg", "/assets/video/XV.mp4", "/assets/cars/xv-side.png", "/assets/cars/xv-front.png", "Urban Explorer", "Description", Arrays.asList("Compact"), "156hp", "196Nm", "180km/h", "10s", "10s", "CVT", Arrays.asList("Orange"), xvAll, xvExt, xvInt));

        // 4. WRX
        List<String> wrxExt = Arrays.asList("/assets/cars/wrx/exterior/ext-1.jpg", "/assets/cars/wrx/exterior/ext-2.jpg", "/assets/cars/wrx/exterior/ext-3.jpg", "/assets/cars/wrx/exterior/ext-4.jpg");
        List<String> wrxInt = Arrays.asList("/assets/cars/wrx/interior/int-1.jpg", "/assets/cars/wrx/interior/int-2.jpg", "/assets/cars/wrx/interior/int-3.jpg", "/assets/cars/wrx/interior/int-4.jpg");
        List<String> wrxAll = Stream.concat(wrxExt.stream(), wrxInt.stream()).collect(Collectors.toList());
        cars.add(new Car(4, "WRX", 289500.0, "/assets/video/WRX-image.jpg", "/assets/video/WRX.mp4", "/assets/cars/wrx-side.png", "/assets/cars/wrx-front.png", "Pure Performance", "Description", Arrays.asList("Turbo", "AWD"), "271hp", "350Nm", "250km/h", "6.0s", "6.1s", "6MT/CVT", Arrays.asList("Blue"), wrxAll, wrxExt, wrxInt));

        // 5. BRZ
        List<String> brzExt = Arrays.asList("/assets/cars/brz/exterior/ext-1.jpg", "/assets/cars/brz/exterior/ext-2.jpg", "/assets/cars/brz/exterior/ext-3.jpg", "/assets/cars/brz/exterior/ext-4.jpg");
        List<String> brzInt = Arrays.asList("/assets/cars/brz/interior/int-1.jpg", "/assets/cars/brz/interior/int-2.jpg", "/assets/cars/brz/interior/int-3.jpg", "/assets/cars/brz/interior/int-4.jpg");
        List<String> brzAll = Stream.concat(brzExt.stream(), brzInt.stream()).collect(Collectors.toList());
        cars.add(new Car(5, "BRZ", 268500.0, "/assets/video/BRZ-image.jpg", "/assets/video/BRZ.mp4", "/assets/cars/brz-side.png", "/assets/cars/brz-front.png", "Unleash Your Desire", "Discover the thrill of the Subaru BRZ...", Arrays.asList("Subaru Boxer Engine", "Rear Wheel Drive", "Aerodynamic Design"), "234hp", "250 Nm", "216km/h", "6.4s", "6.8s", "6-speed manual", Arrays.asList("WR Blue Pearl", "Ignition Red"), brzAll, brzExt, brzInt));

        // 6. Outback
        List<String> outExt = Arrays.asList("/assets/cars/outback/exterior/ext-1.jpg", "/assets/cars/outback/exterior/ext-2.jpg", "/assets/cars/outback/exterior/ext-3.jpg", "/assets/cars/outback/exterior/ext-4.jpg");
        List<String> outInt = Arrays.asList("/assets/cars/outback/interior/int-1.jpg", "/assets/cars/outback/interior/int-2.jpg", "/assets/cars/outback/interior/int-3.jpg", "/assets/cars/outback/interior/int-4.jpg");
        List<String> outAll = Stream.concat(outExt.stream(), outInt.stream()).collect(Collectors.toList());
        cars.add(new Car(6, "Outback", 279000.0, "/assets/video/Outback-image.jpg", "/assets/video/Outback.mp4", "/assets/cars/outback-side.png", "/assets/cars/outback-front.png", "Luxury SUV", "Description", Arrays.asList("Luxury", "Space"), "188hp", "245Nm", "200km/h", "9.6s", "9.6s", "CVT", Arrays.asList("Autumn Green"), outAll, outExt, outInt));

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