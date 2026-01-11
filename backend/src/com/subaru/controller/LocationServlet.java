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

/**
 * LocationServlet provides a list of all Subaru showrooms and service centers.
 * This endpoint is consumed by the 'Find a Dealer' or 'Location' page in the frontend.
 * Endpoint: /backend/locations
 */
@WebServlet({"/locations"})
public class LocationServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    
    // Google Gson instance used to convert Java objects to JSON format
    private Gson gson = new Gson();

    /**
     * Hardcoded data source for Subaru locations across Malaysia.
     * Each Location object consists of (Dealer Name, State).
     * @return List of showroom locations.
     */
    private List<Location> getLocationData() {
        List<Location> locations = new ArrayList<>();

        // --- Selangor & Putrajaya ---
        locations.add(new Location("Petaling Jaya (Motor Image)", "Selangor"));
        locations.add(new Location("Kota Damansara (Ipoh Auto City)", "Selangor"));
        locations.add(new Location("Bandar Botanic (Sebangga Auto)", "Selangor"));
        locations.add(new Location("Glenmarie (Karrus Automotive)", "Selangor"));
        locations.add(new Location("Kajang (SV Prestige)", "Selangor"));
        locations.add(new Location("Putrajaya (SS Auto Venture)", "Putrajaya"));

        // --- Kuala Lumpur ---
        locations.add(new Location("Kepong (Robust Synergy)", "Kuala Lumpur"));

        // --- Northern Region (Penang & Perak) ---
        locations.add(new Location("Bayan Lepas (Gembira Motor)", "Penang"));
        locations.add(new Location("Butterworth (Gembira Motor)", "Penang"));
        locations.add(new Location("Ipoh (Ipoh Auto City)", "Perak"));

        // --- Southern Region (Johor & Negeri Sembilan) ---
        locations.add(new Location("Johor Bahru (Motor Image Malaysia)", "Johor"));
        locations.add(new Location("Skudai (AK Wheels Marketing)", "Johor"));
        locations.add(new Location("Seremban (SV Prestige)", "Negeri Sembilan"));

        // --- East Coast (Pahang & Terengganu) ---
        locations.add(new Location("Kuantan (Eastern Boxer)", "Pahang"));
        locations.add(new Location("Kuala Terengganu (Star East Motors)", "Terengganu"));

        return locations;
    }

    /**
     * Handles the GET request to retrieve all locations in JSON format.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Fetch the hardcoded location list
        List<Location> locationList = getLocationData();

        // --- Set Response Headers ---
        // Setting content type to JSON so the frontend browser knows how to parse it
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        // CORS (Cross-Origin Resource Sharing) Header
        // Allows the React.js frontend to fetch data from this API even if hosted on a different port
        response.setHeader("Access-Control-Allow-Origin", "*");

        // Convert the Java List into a JSON string and send it to the client
        response.getWriter().print(gson.toJson(locationList));
    }
}