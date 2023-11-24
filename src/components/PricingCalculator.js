import React, { useState } from 'react';
//import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const PricingCalculator = () => {
  const host = process.env.REACT_APP_HOST
  const [calculation, setCalculation] = useState({
    distance: "",
    waitingTime: "",
    totalTime:"",
    day:""
  });
  const state=useSelector((state) => state)
  const isLoggedin = state.isLoggedin;
  const mycredentials = state.credentials;  
  const [price,setPrice]=useState("")
  const [showPrice,setShowPrice]=useState(false)
  const handleInputChange = (e) => {
   // e.preventDefault();
    console.log(e.target.value,e.target.name)

   if(e.target.name=="day" || e.target.value>=0 )
    setCalculation({
      ...calculation,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    console.log(calculation)
    if(calculation.day!=="Sun" && calculation.day!=="Mon" && calculation.day!=="Tue" && calculation.day!=="Wed" && calculation.day!=="Thu"  && calculation.day!=="Fri" && calculation.day!=="Sat"){
      alert("please select day from dropdown")
      return ;
    }
    // Send a POST request to your Express backend to calculate the price
    setShowPrice(true)
    fetch(`${host}/price/calculate`,{
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({data:calculation, mycredentials})
  }).then((data)=>data.json()).
    then((data)=>{

      setPrice(data.price)
    })
  };

  return (
<div class="container mt-5">
  <h2 class="text-center">Pricing Calculator</h2>
  
  <form onSubmit={handleCalculate}>
  <div class="row mb-3">
    <div class="col-md-6">
      <label for="totalDistance" class="form-label">Total Distance</label>
      <input
        type="number"
        class="form-control"
        id="totalDistance"
        name="distance"
        value={calculation.distance}
        onChange={handleInputChange}
        required
      />
    </div>
    <div class="col-md-6">
      <label for="waitingTime" class="form-label">Waiting Time</label>
      <input
        type="number"
        class="form-control"
        id="waitingTime"
        name="waitingTime"
        value={calculation.waitingTime}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>


  <div class="row mb-3">
    <div class="col-md-6">
      <label for="dateOfJourney" class="form-label">Select Date of Journey</label>
      <input
        class="form-control"
        list="datalistOptions"
        id="dateOfJourney"
        placeholder="Type to search..."
        onChange={handleInputChange}
        name="day"
       // value={calculation.day}
        required
      />
      <datalist id="datalistOptions">
        <option value="Sun" />
        <option value="Mon" />
        <option value="Tue" />
        <option value="Wed" />
        <option value="Thu" />
        <option value="Fri" />
        <option value="Sat" />
      </datalist>
    </div>
    <div class="col-md-6 d-flex align-items-end">
    <div class="col-md-6">
      <label for="waitingTime" class="form-label">Total Time</label>
      <input
        type="number"
        class="form-control"
        id="totlaTime"
        name="totalTime"
        value={calculation.totalTime}
        onChange={handleInputChange}
        required
      />
    </div>
     
    </div>
  </div>
  <button class="btn btn-primary" >Calculate Price</button>
  {showPrice && <p class="text-center">Calculated Price: {price}</p>}
  </form>
</div>

  );
};

export default PricingCalculator;
