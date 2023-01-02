import React from 'react'
import './details.css'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import { getDogDetails } from '../../redux/actions/actions.js'
import Loading from '../Loading/Loading.jsx';
import NavBar from '../NavBar/NavBar.jsx'


let Details = ({ getDogDetails, details }) => {
  let {id} = useParams()  

  useEffect(() => {
   getDogDetails(id)
  }, [])
  console.log(details[0])
  if(!details.length) return (<Loading/>)
  if(!details[0].tempers) return (    
    <div className='GlobalContainer'>
    <NavBar/>
      <div className='FullDetailsContainer'>  
        <div className='DetailsTitle'>
          Dog Details API
        </div> 
        <div className='CardContainer'>
        <img className='ImageContainer' src={details[0].image} alt='img'/>
          <div className='DetailsContainer'>
            <div className='DogTitle'>{details[0].name}</div>
            <div className='NormalDetail'>Age: {details[0].age}</div> 
            <div className='NormalDetail'>Weight: {details[0].weight}</div>
            <div className='NormalDetail'>Height: {details[0].height}</div>                 
            <div className='TemperamentsDiv'>Temperaments</div>
            <div className='TempContainer'>{details[0].temperament?.split(',').slice(0,6).map(e=><div className='Temp'>{e}</div>)}</div>
          </div>

        </div>   
      </div>
    </div>
  )

return (    
  <div className='GlobalContainer'>
  <NavBar/>
    <div className='FullDetailsContainer'>  
      <div className='DetailsTitle'>
        Dog Details DB
      </div> 
      <div className='CardContainer'>
        <img className='ImageContainer' src={details[0].image} alt='img'/>
        <div className='DetailsContainer'>
          <div className='DogTitle'>{details[0].name}</div>        
          {details[0].origin?<div className='NormalDetail'>Origin: {details[0].origin}</div>:null}  
          <div className='NormalDetail'>Age: {details[0].age}</div>   
          <div className='NormalDetail'>Weight: {details[0].weight}</div>
          <div className='NormalDetail'>Height: {details[0].height}</div>                 
          <div className='TemperamentsDiv'>Temperaments</div>
          <div className='TempContainer'>{
          details[0].tempers?.slice(0,6).map(e=><div className='Temp'>{e.name}</div>)
          
          }</div>
        </div>
      </div>   
    </div>
  </div>
)  
}
let mapStateToProps = (state) => {
return {
    details:state.details
};
}

export default connect(mapStateToProps,{getDogDetails})(Details);