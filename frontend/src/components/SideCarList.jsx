import "../css/SideCarList.css";
import { useState } from "react";
import { useEffect } from "react";
const API_URL = 'http://localhost:8080/backend/products';

function SideCarList({isShown}){

    const [carData, setCarData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Fetch data from your Tomcat server
        const response = await fetch(API_URL);
        
        // Handle non-200 responses (like a 404 or 500)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCarData(data); // Store the fetched data
        setError(null); // Clear any previous errors

      } catch (e) {
        console.error("Error fetching car data:", e);
        setError("Failed to load car data from the backend.");
      } finally {
        setIsLoading(false); // Stop loading regardless of success/fail
      }
    };

    fetchCarData();
  }, []);


  
const sideCarImg = carData;

    return(
        <div className={`side-car-list ${isShown ?  "open" : ""}`}>
            {sideCarImg.map((car, index) => (
                <div className="side-car-item" key={index}>
                <p className="car-name">{car.modelName}</p>
                <img
                  src={`http://localhost:8080/backend${car.sideImgUrl}`}
                  alt={car.name}
                />
              </div>
            ))}
        </div>
    );

}

export default SideCarList;