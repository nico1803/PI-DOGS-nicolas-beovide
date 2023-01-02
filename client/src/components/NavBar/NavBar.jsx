import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5'

import './navBar.css'

import logoImage from '../../assets/logoMain.png'
import { getDogs, resetFilters } from '../../redux/actions/actions.js';
import Loading from '../Loading/Loading.jsx'

let NavBar = ({ getDogs, setPage, setTemps, filteredDogs, dogs, resetFilters }) => {
  
    let [extendNav, setExtendNav] = useState(false);
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [width, setWidth] = useState(window.innerWidth)
    
  
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)    
  }
    window.addEventListener('resize', handleResize)
    setInterval(() => {
      setIsDisplayed(false);
    }, 1500);
  }, []);
    if(isDisplayed) return (<Loading/>)                   
    return (
        <nav className='NavContainerN'>
            <div className='NavMenuN'>

            <div className='LeftContainerN'>
          <div className='NavToHomeContainerN'>
            <Link to='/home'>
              <img className='LogoN' src={logoImage  } onClick={async ()=>{                
                await getDogs()  
                await setIsDisplayed(true)              
                resetFilters()
                if(setPage)setPage(0)
                if(setTemps)setTemps(null)
                }} alt='not found'/>
            </Link>
          </div>
        </div>

        <div className='RightContainerN'>
          <Link className='NavLinkN' to='/'>LANDING</Link>
          <Link className='NavLinkN' to='/contact'>CONTACT</Link>
          <button className='OpenLinksButtonN'  onClick={()=>{
            setExtendNav((curr)=>!curr) 
          }}>{extendNav?<IoClose />:<IoMenu/>}</button>
        </div>

            </div>

            {extendNav&&(
        <div className='NavExpandedMenuN'>
          <Link className='NavLinkExtendedN' to='/'>LANDING</Link>
          <Link className='NavLinkExtendedN' to='/contact'>CONTACT</Link>
          <Link className='NavLinkExtendedN' to='/create'>CREATE DOG</Link>
        </div>
      )}
        </nav>
    )
}


let mapStateToProps = (state) => {
  return {
      dogs: state.dogs,
      filteredDogs : state.filteredDogs
  };
}

export default connect(mapStateToProps,{getDogs, resetFilters})(NavBar);
