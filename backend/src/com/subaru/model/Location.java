package com.subaru.model;

/**
 * The Location class represents a physical Subaru dealership or service center.
 * This model is used by the LocationServlet to provide a structured list 
 * of branches to the frontend.
 */
public class Location {

    // The name of the city or the specific dealer name, Example: Petaling Jaya
    private String city;
    
    // The Malaysian state where the branch is located Example: Selangor
    private String state;

    /**
     * Constructor to create a new location entry.
     * @param city  The name of the branch/city.
     * @param state The state the branch belongs to.
     */
    public Location(String city, String state) {
        this.city = city;
        this.state = state;
    }

    /**
     * Returns the city/dealer name.
     * Used by Gson to generate the "city" key in the JSON response.
     */
    public String getCity() {
        return city;
    }

    /**
     * Returns the state name.
     * Used by Gson to generate the "state" key in the JSON response.
     */
    public String getState() {
        return state;
    }
}