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

    // HELPER: Generates the ColorOption object and the image path automatically
    private Car.ColorOption createColor(String carFolder, String colorName, String colorShortName, String hex) {
        String fileName = colorName.toLowerCase().replace(" ", "-");
        String imagePath = "/assets/cars/" + carFolder + "/" + carFolder + "-" + colorShortName + ".png";
        return new Car.ColorOption(colorName, hex, imagePath);
    }

    private List<Car> getCarData() {
        ArrayList<Car> cars = new ArrayList<>();

        // --- 1. Forester 2.5i-S ---
        List<Car.ColorOption> f25Colors = Arrays.asList(
        // Added the short-name parameter to match your files
            createColor("forester25", "Autumn Green Metallic", "green", "#4B533A"),
            createColor("forester25", "Brilliant Bronze Metallic", "bronze", "#7A6E5D"),
            createColor("forester25", "Cashmere Gold Opal", "gold", "#d6cfc9"),
            createColor("forester25", "Crimson Red Pearl", "red", "#8B0000"),
            createColor("forester25", "Crystal White Pearl", "white", "#F2F2F2"),
            createColor("forester25", "River Rock Pearl", "grey", "#707372"),
            createColor("forester25", "Sapphire Blue Pearl", "blue", "#1B2A4E"),
            createColor("forester25", "Magnetite Grey Metallic", "dark-grey", "#3A3D40"),
            createColor("forester25", "Daybreak Blue Pearl", "light-blue", "#477499"),
            createColor("forester25", "Crystal Black Silica", "black", "#0A0A0A"),
            createColor("forester25", "Ice Silver Metallic", "silver", "#9DA1A4")
        );
        List<Car.Highlight> f25Highlights = Arrays.asList(
            new Car.Highlight("Direct Injection Boxer", "Enhanced 2.5L engine delivering 182hp.", "/assets/highlights/f25-engine.jpg"),
            new Car.Highlight("EyeSight® 4.0", "Next-gen safety with wider field of view.", "/assets/highlights/eyesight.jpg"),
            new Car.Highlight("Premium Interior", "High-quality leather and dual-zone climate.", "/assets/highlights/f25-interior.jpg")
        );

        List<Car.Variant> forester25Variants = new ArrayList<>();

        forester25Variants.add(new Car.Variant(
            "Forester 2.5i-S EyeSight", 221500.0, "/assets/cars/forester25/forester25-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "185 PS"),
                new Car.SpecItem("Torque", "247 Nm"),
                new Car.SpecItem("0-100 km/h", "9.7s"),
                new Car.SpecItem("Top Speed", "205 km/h"),
                new Car.SpecItem("Transmission", "Lineartronic CVT with paddle shifters"),
                new Car.SpecItem("Wheels", "18-inch alloy wheels"),
                new Car.SpecItem("Infotainment System", "11-inch Full HD touchscreen display"),
                new Car.SpecItem("Audio System", "Premium Harman Kardon speakers + subwoofer"),
                new Car.SpecItem("Safety", "Enchanced EyeSight 4.0\nwith new wide-angle camera")
            )
        ));

        List<String> f25Ext = Arrays.asList("/assets/cars/forester25/exterior/ext-1.jpg", "/assets/cars/forester25/exterior/ext-2.jpg", "/assets/cars/forester25/exterior/ext-3.jpg", "/assets/cars/forester25/exterior/ext-4.jpg");
        List<String> f25Int = Arrays.asList("/assets/cars/forester25/interior/int-1.jpg", "/assets/cars/forester25/interior/int-2.jpg", "/assets/cars/forester25/interior/int-3.jpg", "/assets/cars/forester25/interior/int-4.jpg");
        cars.add(new Car(1, "Forester 2.5i-S", 221500.0, "/assets/video/Forester2.5-image.jpg", "/assets/video/Forester2.5.mp4", "/assets/cars/forester25/forester25-side.png", "/assets/cars/forester25/forester25-front.png", "Unstoppable Adventure", "The flagship Forester.", "185PS", "247Nm", "205km/h", "9.7s", "9.5s", "CVT", f25Colors, Stream.concat(f25Ext.stream(), f25Int.stream()).collect(Collectors.toList()), f25Ext, f25Int, f25Highlights, forester25Variants));

        // --- 2. Forester (Standard) ---
        List<Car.ColorOption> fColors = Arrays.asList(
            createColor("forester", "Horizon Blue Pearl", "blue", "#2A4D69"),
            createColor("forester", "Cascade Green Silica", "green", "#2D4037"),
            createColor("forester", "Crystal Black Silica", "black", "#0A0A0A"),
            createColor("forester", "Ice Silver Metallic", "silver", "#9DA1A4"),
            createColor("forester", "Crystal White Pearl", "white", "#F2F2F2"),
            createColor("forester", "Magnetite Grey Metallic", "grey", "#3A3D40"),
            createColor("forester", "Brilliant Bronze Metallic", "bronze", "#7A6E5D")
        );
        List<Car.Highlight> fHighlights = Arrays.asList(
            new Car.Highlight("Symmetrical AWD", "Legendary traction and balance.", "/assets/highlights/awd.jpg"),
            new Car.Highlight("Subaru Global Platform", "Increased rigidity for smoother handling.", "/assets/highlights/sgp.jpg"),
            new Car.Highlight("X-MODE", "Optimizes engine/brakes for slippery surfaces.", "/assets/highlights/xmode.jpg")
        );

        List<Car.Variant> foresterVariants = new ArrayList<>();

        foresterVariants.add(new Car.Variant(
            "Forester 2.0i-L EyeSight", 166800.0, "/assets/cars/forester/forester-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "156 PS"),
                new Car.SpecItem("Torque", "196 Nm"),
                new Car.SpecItem("0-100 km/h", "10.3s"),
                new Car.SpecItem("Top Speed", "193 km/h"),
                new Car.SpecItem("Exterior", "Standard"),
                new Car.SpecItem("Wheels", "17-inch"),
                new Car.SpecItem("Interior", "Leather Seats"),
                new Car.SpecItem("X-Mode", "Standard (Dual Mode)"),
                new Car.SpecItem("Safety", "Core EyeSight")
            )
        ));
        foresterVariants.add(new Car.Variant(
            "Forester 2.0i-L EyeSight GT Edition", 172800.0, "/assets/cars/forester/forester-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "156 PS"),
                new Car.SpecItem("Torque", "196 Nm"),
                new Car.SpecItem("0-100 km/h", "10.3s"),
                new Car.SpecItem("Top Speed", "193 km/h"),
                new Car.SpecItem("Exterior", "GT Lite Aero Kit"),
                new Car.SpecItem("Wheels", "17-inch"),
                new Car.SpecItem("Interior", "Leather Seats"),
                new Car.SpecItem("X-Mode", "Standard (Dual Mode)"),
                new Car.SpecItem("Safety", "Core EyeSight")
            )
        ));
        foresterVariants.add(new Car.Variant(
            "Forester 2.0i-S EyeSight", 176800.0, "/assets/cars/forester/forester-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "156 PS"),
                new Car.SpecItem("Torque", "196 Nm"),
                new Car.SpecItem("0-100 km/h", "10.3s"),
                new Car.SpecItem("Top Speed", "193 km/h"),
                new Car.SpecItem("Exterior", "Standard\nLED Fogs"),
                new Car.SpecItem("Wheels", "18-inch"),
                new Car.SpecItem("Interior", "Leather Seats"),
                new Car.SpecItem("X-Mode", "Special (Dual Mode)"),
                new Car.SpecItem("Safety", "Enhanced EyeSight\nRear Sensors")
            )
        ));
        foresterVariants.add(new Car.Variant(
            "Forester 2.0i-S EyeSight GT Edition", 188800.0, "/assets/cars/forester/forester-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "156 PS"),
                new Car.SpecItem("Torque", "196 Nm"),
                new Car.SpecItem("0-100 km/h", "10.3s"),
                new Car.SpecItem("Top Speed", "193 km/h"),
                new Car.SpecItem("Exterior", "Full GT Aero Kit\nGT Wheels"),
                new Car.SpecItem("Wheels", "18-inch (GT Design)"),
                new Car.SpecItem("Interior", "Diamond Quilted Leather (2-Tone)"),
                new Car.SpecItem("X-Mode", "Special (Dual Mode)"),
                new Car.SpecItem("Safety", "Enhanced EyeSight\nRear Sensors")
            )
        ));

        List<String> fExt = Arrays.asList("/assets/cars/forester/exterior/ext-1.jpg", "/assets/cars/forester/exterior/ext-2.jpg", "/assets/cars/forester/exterior/ext-3.jpg", "/assets/cars/forester/exterior/ext-4.jpg");
        List<String> fInt = Arrays.asList("/assets/cars/forester/interior/int-1.jpg", "/assets/cars/forester/interior/int-2.jpg", "/assets/cars/forester/interior/int-3.jpg", "/assets/cars/forester/interior/int-4.jpg");
        cars.add(new Car(2, "Forester", 166800.0, "/assets/video/Forester-image.jpg", "/assets/video/Forester.mp4", "/assets/cars/forester/forester-side.png", "/assets/cars/forester/forester-front.png", "The All-Rounder", "Practical meets safety.", "156PS", "196Nm", "193km/h", "10.3s", "10s", "CVT", fColors, Stream.concat(fExt.stream(), fInt.stream()).collect(Collectors.toList()), fExt, fInt, fHighlights, foresterVariants));

        // --- 3. Subaru XV ---
        List<Car.ColorOption> xvColors = Arrays.asList(
            createColor("xv", "Dark Blue Pearl", "blue", "#20325e"),
            createColor("xv", "Crystal Black Silica", "black", "#262626"),
            createColor("xv", "Pure White", "white", "#FFFFFF"),
            createColor("xv", "Cool Grey Khaki", "cool-grey", "#a6b0b7"),
            createColor("xv", "Magnetite Grey Metallic", "grey", "#7b7c7e")
        );
        List<Car.Highlight> xvHighlights = Arrays.asList(
            new Car.Highlight("Urban Agility", "220mm ground clearance for city and trail.", "/assets/highlights/xv-urban.jpg"),
            new Car.Highlight("Smart Connectivity", "8-inch touchscreen with Apple CarPlay.", "/assets/highlights/xv-tech.jpg"),
            new Car.Highlight("Symmetrical AWD", "Legendary traction and balance.", "/assets/highlights/awd.jpg")
        );

        List<Car.Variant> xvVariants = new ArrayList<>();

        xvVariants.add(new Car.Variant(
            "XV 2.0i-P EyeSight", 155300.0, "/assets/cars/xv/xv-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "156 PS"),
                new Car.SpecItem("Torque", "196 Nm"),
                new Car.SpecItem("0-100 km/h", "10.4s"),
                new Car.SpecItem("Top Speed", "194 km/h"),
                new Car.SpecItem("Safety System", "EyeSight 4.0"),
                new Car.SpecItem("Wheels", "Standard 17-inch alloy wheels")
            )
        ));

        xvVariants.add(new Car.Variant(
            "XV 2.0i-P EyeSight GT Edition", 162300.0, "/assets/cars/xv/xv-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "156 PS"),
                new Car.SpecItem("Torque", "196 Nm"),
                new Car.SpecItem("0-100 km/h", "10.4s"),
                new Car.SpecItem("Top Speed", "194 km/h"),
                new Car.SpecItem("Safety System", "EyeSight 4.0"),
                new Car.SpecItem("Additional Technology", "360 Degree Camera\n Auto Vehicle Hold"),
                new Car.SpecItem("Audio System", "JBL Premium Audio system with subwoofer"),
                new Car.SpecItem("Ambient Lighting", "Cabin ambient lighting"),
                new Car.SpecItem("Wheels", "Unique GT-exclusive 17-inch alloy wheels")
            )
        ));

        List<String> xvExt = Arrays.asList("/assets/cars/xv/exterior/ext-1.jpg", "/assets/cars/xv/exterior/ext-2.jpg", "/assets/cars/xv/exterior/ext-3.jpg", "/assets/cars/xv/exterior/ext-4.jpg");
        List<String> xvInt = Arrays.asList("/assets/cars/xv/interior/int-1.jpg", "/assets/cars/xv/interior/int-2.jpg", "/assets/cars/xv/interior/int-3.jpg", "/assets/cars/xv/interior/int-4.jpg");
        cars.add(new Car(3, "XV", 155300.0, "/assets/video/XV-image.jpg", "/assets/video/XV.mp4", "/assets/cars/xv/xv-side.png", "/assets/cars/xv/xv-front.png", "Urban Explorer", "Style and capability.", "156PS", "196Nm", "194km/h", "10.4s", "10.4s", "CVT", xvColors, Stream.concat(xvExt.stream(), xvInt.stream()).collect(Collectors.toList()), xvExt, xvInt, xvHighlights, xvVariants));

        // --- 4. WRX ---
        List<Car.ColorOption> wrxColors = Arrays.asList(
            createColor("wrx", "WR Blue Pearl", "blue", "#0845AD"),
            createColor("wrx", "Ice Silver Metallic", "silver", "#9DA1A4"),
            createColor("wrx", "Ignition Red", "red", "#C40000"),
            createColor("wrx", "Ceramic White", "white", "#F4F4F4"),
            createColor("wrx", "Galaxy Purple Pearl", "purple", "#2E1A47"),
            createColor("wrx", "Sapphire Blue Pearl", "dark-blue", "#1B2A4E"),
            createColor("wrx", "Magnetite Grey Metallic", "grey", "#3A3D40"),
            createColor("wrx", "Crystal Black Silica", "black", "#0A0A0A")
        );
        List<Car.Highlight> wrxHighlights = Arrays.asList(
            new Car.Highlight("2.4L Turbo Boxer", "Rally-bred engine delivering 271hp.", "/assets/highlights/wrx-engine.jpg"),
            new Car.Highlight("Performance Chassis", "Aggressive suspension and stiffened body.", "/assets/highlights/wrx-chassis.jpg"),
            new Car.Highlight("11.6-inch Tablet Display", "High-res display for vehicle settings.", "/assets/highlights/wrx-dash.jpg")
        );

        List<Car.Variant> wrxVariants = new ArrayList<>();
        
        // Manual Variant
        wrxVariants.add(new Car.Variant(
            "WRX 2.4 6MT", 283500.0, "/assets/cars/wrx/wrx-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "275 PS"),
                new Car.SpecItem("Torque", "350 Nm"),
                new Car.SpecItem("0-100 km/h", "5.6s"),
                new Car.SpecItem("Top Speed", "250 km/h"),
                new Car.SpecItem("Transmission", "6-speed manual"),
                new Car.SpecItem("Adaptive Cruise Control", "No"),
                new Car.SpecItem("Lane Keep Assist", "No"),
                new Car.SpecItem("Pre-collision braking", "No"),
                new Car.SpecItem("Drive Mode", "None"),
                new Car.SpecItem("Parking brake", "Manual\nhand-operated")
            )
        ));

        wrxVariants.add(new Car.Variant(
            "WRX 2.4 CVT EyeSight", 289500.0, "/assets/cars/wrx/wrx-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "275 PS"),
                new Car.SpecItem("Torque", "350 Nm"),
                new Car.SpecItem("0-100 km/h", "5.4s"),
                new Car.SpecItem("Top Speed", "250 km/h"),
                new Car.SpecItem("Safety System", "EyeSight 4.0"),
                new Car.SpecItem("Transmission", "Sport Lineartronic CVT with\n8-speed manual mode & paddle shifters"),
                new Car.SpecItem("Adaptive Cruise Control", "Yes"),
                new Car.SpecItem("Lane Keep Assist", "Yes"),
                new Car.SpecItem("Pre-collision braking", "Yes"),
                new Car.SpecItem("Drive Mode", "Yes\n(Sport, Sport Sharp, Intelligent modes)"),
                new Car.SpecItem("Parking brake", "Electronic Parking Brake\nwith Auto Hold")
            )
        ));

        List<String> wrxExt = Arrays.asList("/assets/cars/wrx/exterior/ext-1.jpg", "/assets/cars/wrx/exterior/ext-2.jpg", "/assets/cars/wrx/exterior/ext-3.jpg", "/assets/cars/wrx/exterior/ext-4.jpg");
        List<String> wrxInt = Arrays.asList("/assets/cars/wrx/interior/int-1.jpg", "/assets/cars/wrx/interior/int-2.jpg", "/assets/cars/wrx/interior/int-3.jpg", "/assets/cars/wrx/interior/int-4.jpg");
        cars.add(new Car(4, "WRX", 283300.0, "/assets/video/WRX-image.jpg", "/assets/video/WRX.mp4", "/assets/cars/wrx/wrx-side.png", "/assets/cars/wrx/wrx-front.png", "Pure Performance", "Icon of speed.", "275PS", "350Nm", "250km/h", "5.8s", "5.4s", "6MT/CVT", wrxColors, Stream.concat(wrxExt.stream(), wrxInt.stream()).collect(Collectors.toList()), wrxExt, wrxInt, wrxHighlights, wrxVariants));

        // --- 5. BRZ ---
        List<Car.ColorOption> brzColors = Arrays.asList(
            createColor("brz", "Ignition Red", "red", "#C40000"),
            createColor("brz", "WR Blue Pearl", "blue", "#0845AD"),
            createColor("brz", "Crystal White Pearl", "white", "#F2F2F2"),
            createColor("brz", "Ice Silver Metallic", "silver", "#CFD4D9"),
            createColor("brz", "Magnetite Grey Metallic", "grey", "#4E5255"),
            createColor("brz", "Sapphire Blue Pearl", "dark-blue", "#1B2A4E"),
            createColor("brz", "Crystal Black Silica", "black", "#0A0A0A")
        );
        List<Car.Highlight> brzHighlights = Arrays.asList(
            new Car.Highlight("Ultra-Low CoG", "Center of gravity height of 456mm.", "/assets/highlights/brz-engine.jpg"),
            new Car.Highlight("RWD Soul", "Features Torsen® limited-slip differential.", "/assets/highlights/brz-rwd.jpg"),
            new Car.Highlight("Track Mode Cockpit", "Digital gauges with linear tachometer.", "/assets/highlights/brz-cockpit.jpg")
        );
        List<Car.Variant> brzVariants = new ArrayList<>();
        
        // Manual Variant
        brzVariants.add(new Car.Variant(
            "2.4L 6MT (Manual)", 249245.0, "/assets/cars/brz/brz-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "237 PS"),
                new Car.SpecItem("Torque", "250 Nm"),
                new Car.SpecItem("0-100 km/h", "6.3s"),
                new Car.SpecItem("Top Speed", "226 km/h"),
                new Car.SpecItem("Key Features", "Hill Start Assist,\nTorsen LSD")
            )
        ));

        // EyeSight Variant (with the 5th detail)
        brzVariants.add(new Car.Variant(
            "2.4L 6AT EyeSight", 259245.0, "/assets/cars/brz/brz-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "237 PS"),
                new Car.SpecItem("Torque", "250 Nm"),
                new Car.SpecItem("0-100 km/h", "6.9s"),
                new Car.SpecItem("Top Speed", "216 km/h"),
                new Car.SpecItem("Key Features", "Adaptive Cruise Control,\nPre-Collision Braking,\nSteering Wheel Paddle Shifters,\nSport/Snow Modes,\nReverse Automatic Braking")
            )
        ));
        List<String> brzExt = Arrays.asList("/assets/cars/brz/exterior/ext-1.jpg", "/assets/cars/brz/exterior/ext-2.jpg", "/assets/cars/brz/exterior/ext-3.jpg", "/assets/cars/brz/exterior/ext-4.jpg");
        List<String> brzInt = Arrays.asList("/assets/cars/brz/interior/int-1.jpg", "/assets/cars/brz/interior/int-2.jpg", "/assets/cars/brz/interior/int-3.jpg", "/assets/cars/brz/interior/int-4.jpg");
        cars.add(new Car(5, "BRZ", 249245.0, "/assets/video/BRZ-image.jpg", "/assets/video/BRZ.mp4", "/assets/cars/brz/brz-side.png", "/assets/cars/brz/brz-front.png", "Unleash Your Desire", "Pure sports car DNA.", "237PS", "250Nm", "226km/h", "6.3s", "6.9s", "6-speed manual", brzColors, Stream.concat(brzExt.stream(), brzInt.stream()).collect(Collectors.toList()), brzExt, brzInt, brzHighlights, brzVariants));

        // --- 6. Outback ---
        List<Car.ColorOption> outColors = Arrays.asList(
            createColor("outback", "Cashmere Gold Opal", "gold", "#d6cfc9"),
            createColor("outback", "Brilliant Bronze Metallic", "bronze", "#7A6E5D"),
            createColor("outback", "Sapphire Blue Pearl", "blue", "#565dad"),
            createColor("outback", "Crystal White Pearl", "white", "#F2F2F2"),
            createColor("outback", "Ice Silver Metallic", "silver", "#9DA1A4")
        );
        List<Car.Highlight> outHighlights = Arrays.asList(
            new Car.Highlight("Nappa Leather", "Exquisite tan seats for premium touring.", "/assets/highlights/outback-luxury.jpg"),
            new Car.Highlight("Driver Monitoring", "Facial recognition for safety.", "/assets/highlights/outback-safety.jpg"),
            new Car.Highlight("Symmetrical AWD", "Legendary traction and balance.", "/assets/highlights/awd.jpg")
        );

        List<Car.Variant> outbackVariants = new ArrayList<>();

        outbackVariants.add(new Car.Variant(
            "Outback 2.5i-TOURING EyeSight", 279000.0, "/assets/cars/outback/outback-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "188 PS"),
                new Car.SpecItem("Torque", "245 Nm"),
                new Car.SpecItem("0-100 km/h", "9.6s"),
                new Car.SpecItem("Top Speed", "206 km/h"),
                new Car.SpecItem("Engine Type", "2.5L Naturally-Aspirated Boxer Engine"),
                new Car.SpecItem("Safety System", "EyeSight Driver Assist Technology"),
                new Car.SpecItem("Interior Features", "Nappa leather\n11.6-inch touchscreen\nHarmon Kardon audio\nWireless Apple CarPlay/Android Auto")
            )
        ));

        outbackVariants.add(new Car.Variant(
            "Outback 2.4 R-Touring EyeSight", 309000.0, "/assets/cars/outback/outback-side.png",
            Arrays.asList(
                new Car.SpecItem("Horsepower", "249 PS"),
                new Car.SpecItem("Torque", "350 Nm"),
                new Car.SpecItem("0-100 km/h", "7.5s"),
                new Car.SpecItem("Top Speed", "221 km/h"),
                new Car.SpecItem("Engine Type", "2.4L Turbocharged Boxer Engine"),
                new Car.SpecItem("Safety System", "EyeSight Driver Assist Technology\nX-MODE with Hill Descent Control\nHands-free Power Rear Gate"),
                new Car.SpecItem("Interior Features", "Nappa leather\n11.6-inch touchscreen\nHarmon Kardon audio\nWireless Apple CarPlay/Android Auto")
            )
        ));

        List<String> outExt = Arrays.asList("/assets/cars/outback/exterior/ext-1.jpg", "/assets/cars/outback/exterior/ext-2.jpg", "/assets/cars/outback/exterior/ext-3.jpg", "/assets/cars/outback/exterior/ext-4.jpg");
        List<String> outInt = Arrays.asList("/assets/cars/outback/interior/int-1.jpg", "/assets/cars/outback/interior/int-2.jpg", "/assets/cars/outback/interior/int-3.jpg", "/assets/cars/outback/interior/int-4.jpg");
        cars.add(new Car(6, "Outback", 279000.0, "/assets/video/Outback-image.jpg", "/assets/video/Outback.mp4", "/assets/cars/outback/outback-side.png", "/assets/cars/outback/outback-front.png", "Luxury SUV", "Ultimate comfort and rugged utility.", "188PS", "245Nm", "206km/h", "9.6s", "9.6s", "CVT", outColors, Stream.concat(outExt.stream(), outInt.stream()).collect(Collectors.toList()), outExt, outInt, outHighlights, outbackVariants));

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