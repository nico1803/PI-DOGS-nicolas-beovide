import React from 'react'
import { connect } from 'react-redux';
import './dropdownMulti.css'
import { getTemperaments } from '../../redux/actions/actions.js'

let DropdownMulti = ({temperaments, setTemps, temps }) => {
  return (
    <>
      <details class='custom-select' id='create'>        
	      <summary class='radios'>  
          <input type='radio' title='Select...' name='item' defaultChecked id='default'/>  
          {temperaments.map((e,index)=><input type='radio' name='item' id={`item${index+1}`} title={e}/>)}        
	      </summary>
	      <ul class='list'>
          {temperaments.map((e,index)=><li onClick={()=>{if(temps?.length<3&&!temps?.includes(index+1))setTemps(temps.concat([index+1]))}} class='li'><label class='label' for={`item${index+1}`}>{e}</label></li>)}
	      </ul>
      </details>
    </>
  )
}

let mapStateToProps = (state) => {
    return {
        temperaments:state.temperaments,
    };
}    
export default connect(mapStateToProps,{ getTemperaments })(DropdownMulti);