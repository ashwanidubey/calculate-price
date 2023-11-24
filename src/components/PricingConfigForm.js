import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const PricingConfigForm = () => {
  const host = process.env.REACT_APP_HOST
  const [config, setConfig] = useState({
    
    distanceBasePriceSunP:"", distanceBasePriceMonP:"", distanceBasePriceTueP:"", distanceBasePriceWedP:"",distanceBasePriceThuP:"", distanceBasePriceFriP:"", distanceBasePriceSatP:"",
    distanceBasePriceSunD:"", distanceBasePriceMonD:"", distanceBasePriceTueD:"", distanceBasePriceWedD:"",distanceBasePriceThuD:"", distanceBasePriceFriD:"", distanceBasePriceSatD:"",    
    DAPR:"",DAPK:"",
    TMFUT:"",TMFUM:"",TMFAM:"",
    WCRS:"",WCT:"",WCIT:""
  });
  const state=useSelector((state) => state)
  const isLoggedin = state.isLoggedin;
  const mycredentials = state.credentials;
  const navigate=useNavigate();
  useEffect(()=>{
    if(isLoggedin===false)
      navigate('/login')
  })
  const handleInputChange = (e) => {
   
    if (e.target.value >= 0) {
      console.log(e.target.name,e.target.value)
      setConfig((prevConfig) => ({
        ...prevConfig,
        [e.target.name]:e.target.value
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${host}/price/confi`,{
      method: "POST",
      headers: {
          "Content-Type": "application/json"
          
      },
      body: JSON.stringify({config,mycredentials})
  }).
    then((data)=>data.json()).
    then((data)=>{
      console.log(data)
      if(data.status==="done") alert("configured succefully")
      else alert("some error")
      //setPrice(data.price)
    })
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <h2 className="text-center">Pricing Configuration</h2>
           
          <form onSubmit={handleFormSubmit}>
          <label htmlFor={`distanceBasePrice`} className="form-label col-md-8">{`Distance Base Price eg:80rs  Upto 3KMs on Mon`}</label>
        
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="row mb-2">
                <label htmlFor={`distanceBasePrice-${day}`} className="form-label col-md-2">{`${day}:`}</label>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    id={`distanceBasePrice-${day}`}
                    name={`distanceBasePrice${day}P`}
                    value={config[`distanceBasePrice${day}P`] || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <span className="input-group-text">rs Upto</span>
                </div>
                <div className="col-md-2">
                  <input
                    type="number"
                    className="form-control"
                    id={`distanceBasePrice-${day}`}
                    name={`distanceBasePrice${day}D`}
                    value={config[`distanceBasePrice${day}D`] || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <span className="input-group-text">Km</span>
                </div>
              </div>
            ))}


            <label htmlFor={`distanceAdditionalPrice`} className="form-label col-md-8">{`Distance Additional Price eg:30rs/Km after 3KMs`}</label>
              
            <div className="row mb-3">
             <div className="col-md-8">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id={`distanceAdditionalRate`}
                    name="DAPR"
                    value={config["DAPR"] || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text">rs/Km after</span>
                  <input
                    type="number"
                    className="form-control"
                    id={`distanceAdditionalKms`}
                    name="DAPK"
                    value={config["DAPK"] || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text">KMs</span>
                </div>
              </div>
            </div>


            <label htmlFor={`timeMultiplierFactor`} className="form-label col-md-8">{`Time Multiplier Factor eg:Under 1 hour - 1x, After the initial hour - 2x`}</label>
             
            <div className="row mb-3">
              <div className="col-md-8">
                <div className="input-group">
                  <span className="input-group-text">Under</span>
                  <input
                    type="number"
                    className="form-control"
                    id={`timeMultiplierUnderHour`}
                    name="TMFUT"
                    value={config["TMFUT"] || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text">hour -</span>
                  <input
                    type="number"
                    className="form-control"
                    id={`timeMultiplierUnderHourRate`}
                    name="TMFUM"
                    value={config["TMFUM"]|| ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text">x, After the initial hour -</span>
                  <input
                    type="number"
                    className="form-control"
                    id={`timeMultiplierAfterHour`}
                    name="TMFAM"
                    value={config["TMFAM"] || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text">x</span>
                </div>
              </div>
            </div>


            <label htmlFor={`waitingCharges`} className="form-label col-md-8">{`Waiting Charges eg: 5rs/3min after initial 3mins`}</label>
            
            <div className="row mb-3">
              <div className="col-md-8">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id={`waitingChargeRate`}
                    name="WCRS"
                    value={config["WCRS"] || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text">rs/</span>
                  <input
                    type="number"
                    className="form-control"
                    id={`waitingChargeTimeInitial`}
                    name="WCT"
                    value={config["WCT"] || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text">min After initial</span>
                  <input
                    type="number"
                    className="form-control"
                    id={`waitingChargeTimeAfter`}
                    name="WCIT"
                    value={config["WCIT"] || ''}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text">mins</span>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-primary">Save Configuration</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PricingConfigForm;
