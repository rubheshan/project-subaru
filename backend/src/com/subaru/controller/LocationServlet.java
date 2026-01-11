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

    locations.add(new Location("Petaling Jaya (Motor Image)", "Selangor"));
    locations.add(new Location("Kota Damansara (Ipoh Auto City)", "Selangor"));
    locations.add(new Location("Bandar Botanic (Sebangga Auto)", "Selangor"));
    locations.add(new Location("Glenmarie (Karrus Automotive)", "Selangor"));
    locations.add(new Location("Kajang (SV Prestige)", "Selangor"));
    locations.add(new Location("Putrajaya (SS Auto Venture)", "Putrajaya"));
    locations.add(new Location("Kepong (Robust Synergy)", "Kuala Lumpur"));
    locations.add(new Location("Bayan Lepas (Gembira Motor)", "Penang"));
    locations.add(new Location("Butterworth (Gembira Motor)", "Penang"));
    locations.add(new Location("Ipoh (Ipoh Auto City)", "Perak"));
    locations.add(new Location("Johor Bahru (Motor Image Malaysia)", "Johor"));
    locations.add(new Location("Skudai (AK Wheels Marketing)", "Johor"));
    locations.add(new Location("Seremban (SV Prestige)", "Negeri Sembilan"));
    locations.add(new Location("Kuantan (Eastern Boxer)", "Pahang"));
    locations.add(new Location("Kuala Terengganu (Star East Motors)", "Terengganu"));

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
