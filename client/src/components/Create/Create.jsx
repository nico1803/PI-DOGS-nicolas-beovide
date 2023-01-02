import React from 'react'
import './create.css'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { postDog, getTemperaments, getDogs } from '../../redux/actions/actions.js'
import NavBar from '../NavBar/NavBar.jsx'
import { Card } from '../Card/Card.jsx';
import DropdownMulti from '../DropdownMulti/DropdownMulti.jsx';

let Create = ({ postDog, getTemperaments, temperaments, dogs }) => {
  
  let [errors, setErrors] = useState({})
  let [temps, setTemps] = useState([])
  let [created,setCreated] = useState(false)
  let [dog, setDog] = useState({
                                   name:'',
                                  minHeight:'',
                                  maxHeight:'',
                                  minWeight:'',
                                  maxWeight:'',
                                  age:'',
                                  image:'',
                                  temperaments:''
                                }) 

  useEffect(() => {
    getDogs()
    getTemperaments()
  },[])

  let handleChange = (e) => {
    e.preventDefault()
    setDog({
      ...dog,
      [e.target.name]:e.target.value
    })
    setErrors(formValidation({
      ...dog,
      [e.target.name]: e.target.value
  }))
  }
  
  let handleSubmit = async (e,fileToUpload) => {
    e.preventDefault()
    let finalDog = {
                      name:dog.name,
                      image:dog.image,
                      temperaments:temps,
                      height:`${dog.minHeight} - ${dog.maxHeight}`,
                      weight:`${dog.minWeight} - ${dog.maxWeight}`,
                      age:dog.age
                    }
    postDog(finalDog)
    setCreated(true)
  }

  let formValidation = (dog) => {
    
    let errors = {}

    if(!dog.name){
      errors.name = 'Name cannot be empty'
    } else if(!/^[a-zA-Z\s]*$/.test(dog.name)) {
      errors.name = 'Name can only contain letters'
    } else if(dog.name?.length>30) {
      errors.name = 'Name cannot be more than 30 characters'
    } else if(dogs?.filter(e=>e.name.toLowerCase() ===dog.name?.toLowerCase() ).length) {
      errors.name = 'Already exists a dog with this name'
    }

    if(!dog.minHeight) {
      errors.height = 'Min height cannot be empty'
    } else if(!dog.maxHeight) {
      errors.height = 'Max height cannot be empty'
    } else if(parseInt(dog.minHeight)>parseInt(dog.maxHeight)) {
      errors.height = 'The maximum height must be greater than the minimum'
    }

    if(!dog.minWeight) {
      errors.weight = 'Min weight cannot be empty'
    } else if(!dog.maxWeight) {
      errors.weight = 'Max weight cannot be empty'
    } else if(parseInt(dog.minWeight)>parseInt(dog.maxWeight)) {
      errors.weight = 'The maximum weight must be greater than the minimum'
    } 

    if(!dog.age) {
      errors.age = 'Age cannot be empty'
    }

    if(!dog.image){
      errors.image = 'Image URL cannot be empty'
    }

    return errors
  }
  
  return (
    <>
      <NavBar/>
      <div className='CreateContainerG'>        
        <form className='FormContainerG'>
          <div className='FormTitleG'>Create your dog!</div>
                <div className='FormInputContainerG'>
                  <input className='FormInputG' type='text' placeholder='Name' id='name' name='name'   onChange={(e)=>{handleChange(e)}}/>
                  <span className='ErrorMessageG'>{errors.name}</span>
                </div>

                <div className='HeightWeightContainerG'>
                  <input className='HeightWeightG' type='number' placeholder='Min height' name='minHeight'  min='0' onChange={(e)=>{handleChange(e)}}/>
                  <input className='HeightWeightG' type='number' placeholder='Max height' name='maxHeight'   min='0' onChange={(e)=>{handleChange(e)}}/>
                </div>                
                <span className='ErrorMessageG'>{errors.height}</span>
                
                <div className='HeightWeightContainerG'>
                  <input className='HeightWeightG' type='number' placeholder='Min weight' name='minWeight'   min='0' onChange={(e)=>{handleChange(e)}}/>
                  <input className='HeightWeightG' type='number' placeholder='Max weight' name='maxWeight'   min='0' onChange={(e)=>{handleChange(e)}}/>
                </div>
                <span className='ErrorMessageG'>{errors.weight}</span>
                
                <div className='FormInputContainerG'>
                  <input className='FormInputG' type='number' placeholder='Age' name='age'   min='0' onChange={(e)=>{handleChange(e)}}/>
                  <span className='ErrorMessageG'>{errors.age}</span>
                </div>

                <div className='FormInputContainerG'>
                  <input className='FormInputG' type='text' placeholder='Image URL' name='image'   onChange={(e)=>{handleChange(e)}}/>
                  <span className='ErrorMessageG'>{errors.image}</span>
                </div>

                <div className='TempsContainerG'>
                  {temps?.map(e=><><div className='Temp' onClick={()=>setTemps(temps.filter(t=>t!==e))}>{temperaments[e-1]} ✖️</div></>)}
                </div>

                <div className='SelectDivG'>
                  <DropdownMulti setTemps={setTemps} temps={temps} temperaments={temperaments}/>
                  <span className='ErrorMessageG'>{!temps?.length&&errors.image?'You must select at least one temperament':null}</span>  
                </div>              
                
                <div>
                  {
                   <button className='CreateButtonG' type='submit' onClick={(e) => {
                    if(!Object.keys(errors).length && dog.age && temps.length)handleSubmit(e)
                    }}>Create</button>
                  }            
                
                </div>            
          </form>
        <div className='PreviewContainerG'>
        <div className='PreviewTitleG'>Preview</div>

                  <div className='PreviewCardContainerG'>
                  <Card dog={{
                                name:dog.name,
                                image:dog.image,
                                temperament:`${temps.map(e=>temperaments[e-1])}`,
                                height:`${dog.minHeight} - ${dog.maxHeight}`,
                                weight:`${dog.minWeight} - ${dog.maxWeight}`,
                                age:dog.age
                            }}/>  
                  </div>

        </div>
      </div>


    </>
  )
}

let mapStateToProps = (state) => {
  return {
      temperaments: state.temperaments,
      dogs: state.dogs
  };
}
  
export default connect(mapStateToProps,{ postDog, getDogs, getTemperaments })(Create);