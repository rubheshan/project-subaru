package com.subaru.controller;

import com.google.gson.Gson;
import com.subaru.model.Location;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet({"/locations"})
public class LocationServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    private List<Location> getLocationData() {
    List<Location> locations = new ArrayList<>();

    locations.add(new Location("Shah Alam", "Selangor"));
    locations.add(new Location("Georgetown", "Penang"));
    locations.add(new Location("Johor Bahru", "Johor"));

    return locations;
}

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        List<Location> locationList = getLocationData();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        response.getWriter().print(gson.toJson(locationList));
    }
}
