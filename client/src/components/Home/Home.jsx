import React from 'react';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {KeyboardArrowLeft} from '@styled-icons/material-rounded/KeyboardArrowLeft'
import {KeyboardArrowRight} from '@styled-icons/material-rounded/KeyboardArrowRight'
import './home.css'

import { BsFilterRight } from 'react-icons/bs';

import { getDogs, getDogByName, nameAsc, setSource, nameDesc, weightAsc, weightDesc, filterDogsByTemps, getTemperaments, filterDogsByBreed } from '../../redux/actions/actions'

import { Card } from '../Card/Card.jsx'
import Loading from '../Loading/Loading.jsx'
import NavBar from '../NavBar/NavBar'
import Dropdown from '../Dropdown/Dropdown.jsx'


let Home = ({getDogs, getDogByName, setSource, nameAsc, nameDesc, weightAsc, weightDesc, getTemperaments, dogs, filterDogsByBreed, filteredDogs, filterDogsByTemps, temperaments}) => {
  let [dog, setDog] = useState('')
  let [temps,setTemps] = useState(null)
  let [page, setPage] = useState(0)
  let [emptyDb, setEmptyDb] = useState(false)
  let [notFind, setNotFind] = useState(false)
  let [refresh, setRefresh] = useState(false)
  let [weight, setWeight] = useState('')
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {     
    getTemperaments()    
    getDogs()
    function handleResize() {
      setWidth(window.innerWidth)    
}
    window.addEventListener('resize', handleResize)
  },[])

let handleChange = (e) => {
if(e){
  setDog(e.target.value)
}                    
} 
let handleSubmit = async (e) => {
e.preventDefault()
await filterDogsByBreed(dog)
e.target.reset();
setPage(0)
}

let handleTemp = async (e) => {
await filterDogsByTemps(e)
setPage(0)
}


if(!dogs.length) return (<Loading/>)
return (
<div className='GlobalContainer'>
  <NavBar  setPage={setPage} setTemps={setTemps} />
  <div className='GlobalHomeContainer'>

    <div className='Header'>

      <div className='Pagination'>
        <button className='PaginationButton' onClick={()=>page>0?setPage(page-=1):null}><KeyboardArrowLeft className='IconPgn' size={40}/></button>
        <button className='PaginationButton' onClick={()=>(page<Math.ceil(filteredDogs.length?filteredDogs.length/8:dogs.length/8)-1)?setPage(page+=1):null}><KeyboardArrowRight className='IconPgn' size={40}/></button>
      </div>

      <div className='FilterContainer'>
      <Filters dogs={dogs} weight={weight} setWeight={setWeight} setEmptyDb={setEmptyDb} nameAsc={nameAsc} nameDesc={nameDesc} weightAsc={weightAsc} weightDesc={weightDesc} setRefresh={setRefresh} refresh={refresh} setSource={setSource}/>
      </div>

    </div>

    <div className='HomeBody'>

      <div className='OptionsContainer'>
        <form className='Form' onSubmit={(e)=>handleSubmit(e)}>
          <input className='SearchBar' placeholder='Search by breed...' type='text' name='input'onChange={(e)=>{handleChange(e)}}/>    
        </form> 
        <Dropdown setTemps={setTemps} temps={temps} temperaments={temperaments} handleTemp={handleTemp}/> 
        {width>650 && <div className='CreateDog'>
                <Link to='/create'><div className='CreateText'>Create Dog</div></Link> 
              </div>}
      </div>

      <div className='HomeCardsContainer'>
        {filteredDogs.length?filteredDogs.slice(page*8,page*8+8).map(dog=><Card dog={dog}/>):dogs.slice(page*8,page*8+8).map(dog=><Card dog={dog}/>)}
      </div>

    </div>

  </div>
    

</div>
)
}

//========================FILTER MENU =============================
let Filters = ({ dogs,setEmptyDb, nameAsc, setRefresh, weight, setWeight, refresh, nameDesc, weightAsc, weightDesc, setSource }) => {
  return (
    <div className='dropdown'>
        <nav>
         <ul>
            <li><div className='main-menu'><BsFilterRight size={40} className='icon'/></div>
               <ul className='filter-buttons'>
                  <li><div>🐶 By Name</div>
                     <ul>
                        <li><div onClick={()=>{
                          nameAsc()
                          setRefresh(prevRefresh => !prevRefresh)
                          }}>A/Z</div></li>
                        <li><div onClick={()=>{
                          nameDesc()
                          setRefresh(prevRefresh => !prevRefresh)
                          }}>Z/A</div></li>
                     </ul>
                  </li>
                  <li><div>⚖️ By Weight</div>
                     <ul>
                        <li><div onClick={()=>{
                          if(weight==='ASC'){
                            return
                          }
                          weightAsc()
                          setWeight('ASC')
                          setRefresh(prevRefresh => !prevRefresh)
                          }}>ASC</div></li>
                        <li><div onClick={()=>{
                          if(weight==='DESC'){
                            return
                          }
                          weightDesc()
                          setWeight('DESC')
                          setRefresh(prevRefresh => !prevRefresh)
                          }}>DESC</div></li>
                     </ul>
                  </li>
                  <li><div>📁 Source</div>
                     <ul>
                        <li><div onClick={()=>{
                          setSource('All')
                          setRefresh(prevRefresh => !prevRefresh)
                          }}>All</div></li>
                        <li><div onClick={()=>{
                          setSource('API')
                          setRefresh(prevRefresh => !prevRefresh)
                          }}>API</div></li>
                        <li><div onClick={()=>{
                          setSource('DB')
                          setRefresh(prevRefresh => !prevRefresh)
                          }}>DB</div></li>
                     </ul>
                  </li>
               </ul>
            </li>
         </ul>
      </nav>
                
    </div>
  )
  }
  
//=================================================================


let mapStateToProps = (state) => {
  return {
      dogs: state.dogs,
      details: state.details,
      temperaments: state.temperaments,
      filteredDogs : state.filteredDogs
  };
}

export default connect(mapStateToProps,{ getDogs,getDogByName, nameAsc, nameDesc, weightAsc, weightDesc, filterDogsByTemps, filterDogsByBreed, setSource, getTemperaments })(Home);