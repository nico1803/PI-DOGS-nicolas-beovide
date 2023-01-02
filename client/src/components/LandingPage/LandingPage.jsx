import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../NavBar/NavBar.jsx'
import './landingPage.css'
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function LandingPage() {
  return (
    <div className='GlobalContainerL'>
        <Navbar/>
        <div className='LandingContainerL'>
        <div className='ContactButtonsL'>
                        <Link className='NavLinkL' to={{pathname: 'https://www.linkedin.com/in/nicolas-beovide'}} target='_blank'>
                            <BsLinkedin className='iconLINK' size={30}/>
                        </Link>
                        <Link className='NavLinkL' to={{pathname: 'https://github.com/nico1803'}} target='_blank'>
                            <BsGithub className='iconGIT' size={30}/>
                        </Link>
                    </div>

                    <div className='LandingTextDivL'>
                        <div className='LandingPreSloganL'>Hola, soy&nbsp;<span className='LPL'>Nico</span></div>
                        <div className='LandingSloganL'>
                            HENRY<br/>P I - dogs!
                        </div>
                        <Link to='/home'>
                            <button className='BtnL'>JOIN</button>
                        </Link>
                    </div>

        </div>

    </div>
  )
}

