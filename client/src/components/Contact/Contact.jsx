import React, {useState} from 'react'
import './contact.css'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx'
import emailjs from 'emailjs-com';

import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5'

export default function Contact() {
  let [emailSent, setEmailSent] = useState(false)
  let [errors, setErrors] = useState({})
  let [email, setEmail] = useState({name: '',email: '',message: ''})
  
  let sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_v1cgva9', 'template_0unahwb', e.target, 'mj8OtvvSNN98qSM54')
      .then((result)=>{
        setEmailSent(true)
      },(error)=>{
      })
      e.target.reset()
  }

  let handleChange = (e) => {
    e.preventDefault()
    setEmail({
      ...email,
      [e.target.name]:e.target.value
    })
    setErrors(formValidation({
      ...email,
      [e.target.name]: e.target.value
  }))
  }

  let formValidation = (email) => {
    let errors = {}
    if(!email.name){
      errors.name = 'Name cannot be empty'
    } else if(!/^[a-zA-Z\s]*$/.test(email.name)) {
      errors.name = 'Name can only contain letters'
    } else if(email.name?.length>30) {
      errors.name = 'Name cannot be more than 30 characters'
    }
    if(!email.email) {
      errors.email = 'Email cannot be empty'
    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.email)){
      errors.email = 'Enter a valid email'      
    }
    if(!email.message){
      errors.message = 'Message cannot be empty'
    }
    return errors
  }

  return (
    <div className='GlobalContainerT'>
        <NavBar/>        
        <div className='ContactContainerT'>

          <div className='ContactTitleT'>CONTACT</div>

          <div className='FormContainerT'>

              <form className='EmailContainerT' onSubmit={(!Object.keys(errors).length&&email.name.length)?sendEmail:null}>
                  <div className='EmailFieldT'>
                  <div className='EmailTitleT'>Send me a Message</div>
            
                    <input className='InputT' placeholder='Your name' name='name' onChange={(e)=>{handleChange(e)}}/>
                    <span className='ErrorT'>{errors.name}</span>
            
                    <input className='InputT' placeholder='Your email' name='email' onChange={(e)=>{handleChange(e)}}/>
                    <span className='ErrorT'>{errors.email}</span>
            
                    <textarea className='MessageT' placeholder='Message' name='message' onChange={(e)=>{handleChange(e)}}/>
                    <span className='ErrorT'>{errors.message}</span>
            
                  </div>
            
                  <button className='SendButtonT' type='submit'>SEND</button>
              </form>

            
            <div className='ContactInfoContainerT'>
                <div className='ContactInfoT'>
                  <div className='LocationT'>
                    <IoLocationOutline size={30}/><div className='InfoT'> C.A.B.A, ARG</div> 
                  </div>
                  <div className='MailT'>
                    <IoMailOutline size={30}/><div className='InfoT'>nico1803o@hotmail.com.ar</div>   
                  </div>             
                </div>
            
                <div className='SeparationT'/>
            
                <div className='ContactIconsT'>
                  <Link to={{pathname: 'https://github.com/AlejoUfano'}} target='_blank'>                
                    <BsGithub/>
                  </Link>
            
                  <Link to={{pathname: 'https://www.linkedin.com/in/alejo-ufano-837a68244/'}} target='_blank'>
                    <BsLinkedin/>
                  </Link>
                </div>
            
            </div>
          </div>
        </div>
    </div>
  )
}