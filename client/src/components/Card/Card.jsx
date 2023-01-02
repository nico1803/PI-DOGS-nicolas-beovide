import React from 'react'
import { Link } from 'react-router-dom';
import error from '../../assets/not-found.png'
import './card.css'

export function Card({dog}) {

  if(!dog.tempers){
return (
    <Link to={`/dogs/${dog.id}`}>
      
    <div className='CardContainerC'>
      <img className='CardImageC' src={dog.image?dog.image:error} width='240'  alt='error'/>     
      <div className='DogNameC'>{dog.name?.split(' ').slice(0,3).join(' ')}</div>      
      <div className='WeightC'>Weight (kg): {dog.weight}</div>
     <div className='TempContainerC'>
      {dog.temperament?.split(',').slice(0,3).map(e=>{if(e.length)return <div className='TemperamentDivC'>{e}</div>})}      
      <div className='TemperamentDivC' style={{color:'#2596ed',fontWeight:'bolder', textShadow:'1px 2px 4px rgb(37 150 237 / 40%)'}}>More...</div>     
     </div>       
    </div>
    </Link>
  )} 
return (
  <Link to={`/dogs/${dog.id}`}>
      
    <div className='CardContainerC'>
      <img className='CardImageC' src={dog.image?dog.image:error} width='240'  alt='error'/>     
      <div className='DogNameC'>{dog.name?.split(' ').slice(0,3).join(' ')}</div>      
      <div className='WeightC'>Weight: (kg): {dog.weight}</div>
      <div className='TempContainerC'>
      {dog.tempers?.map(e=><div className='TemperamentDivC'>{e.name}</div>)}      
      <div className='TemperamentDivC' style={{color:'#2596ed',fontWeight:'bolder', textShadow:'1px 2px 4px rgb(37 150 237 / 40%)'}}>More...</div>     
     </div>       
    </div>
    </Link>
)
}

