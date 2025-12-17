import "../css/SideCarList.css";
import {carData} from "../data/TrialCarData.js";

function SideCarList({isShown,setIsShown}){

    console.log(carData[0].model);

    return(
        <div className={`side-car-list ${isShown ?  "open" : ""}`}>
            {carData.map((car)=>(
                <div key={car.id}>
                    <p>{car.model}</p>
                    <img src={car.image} alt={car.model}></img>
                </div>
            ))}
        </div>
    );

}

export default SideCarList;