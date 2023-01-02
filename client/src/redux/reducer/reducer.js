import { GET_DOGS, GET_DOG_BY_NAME, GET_DOG_DETAILS, GET_TEMPERAMENTS, POST_DOG, RESET_FILTERS, FILTER_DOGS_BY_TEMPS, FILTER_DOGS_BY_BREED, NAME_ASC, NAME_DESC, WEIGHT_ASC, WEIGHT_DESC, SET_SOURCE } from '../actions/actions.js'

let initialState = {
    dogs: [],
    temperaments: [],
    details: [],
    filteredDogs : [],
}



export default function reducer(state = initialState, action) {
    switch(action.type){
      case GET_DOGS:{
        
        return{
          ...state,
           dogs: action.payload.filter(dog=>dog.id!==232&&dog.id!==48&&dog.id!==128&&dog.id!==211),
             details: [],
        }
      }
      case GET_DOG_BY_NAME: {
        return{
        ...state,
        dogs: action.payload
        }
      }
      case GET_DOG_DETAILS: {
        return{
        ...state,
        details: action.payload
        }
      }
      case GET_TEMPERAMENTS: {
        return{
        ...state,
        temperaments: action.payload
        }
      }
      case POST_DOG: {
        console.log(action.payload)
        return{
        ...state,
        dogs: state.dogs.concat(action.payload)
        }
      }
      case RESET_FILTERS: {
        return{
        ...state,
        filteredDogs: state.dogs
        }
      }
      case NAME_ASC: {
        return{
        ...state,
        filteredDogs: state.filteredDogs?.length?state.filteredDogs
        .sort((a,b)=>a.name>b.name?1
        :b.name>a.name?-1:0):state.dogs
        .sort((a,b)=>a.name>b.name?1
        :b.name>a.name?-1:0)
        }
      }
      case NAME_DESC: {
        return{
        ...state,
        filteredDogs: state.filteredDogs?.length
        ?state.filteredDogs
        .sort((a,b)=>a.name>b.name?1
        :b.name>a.name?-1:0).reverse():state.dogs
        .sort((a,b)=>a.name>b.name?1
        :b.name>a.name?-1:0).reverse()
        }
      } 
      case WEIGHT_ASC: {
        return{
        ...state,
        filteredDogs: state.filteredDogs?.length
        ? state.filteredDogs.filter(item => item.name !== 'Olde English Bulldogge')
        .sort((a, b) => !a.weight.includes('NaN') && a.weight.slice(0,2).trim() - b.weight.slice(0,2).trim())
        : state.dogs.filter(item => item.name !== 'Olde English Bulldogge')
        .sort((a, b) => !a.weight.includes('NaN') && a.weight.slice(0,2).trim() - b.weight.slice(0,2).trim())
        }
      }
      case WEIGHT_DESC: {
        return{
          ...state,
          filteredDogs: state.filteredDogs?.length
          ? state.filteredDogs.filter(item => item.name !== 'Olde English Bulldogge')
          .sort((a, b) => !a.weight.includes('NaN') && a.weight.slice(0,2).trim() - b.weight.slice(0,2).trim()).reverse()
          : state.dogs.filter(item => item.name !== 'Olde English Bulldogge')
          .sort((a, b) => !a.weight.includes('NaN') && a.weight.slice(0,2).trim() - b.weight.slice(0,2).trim()).reverse()
          }
      }
      case SET_SOURCE: {
        return{
        ...state,
          filteredDogs: action.payload === 'API' 
        ? state.dogs.filter(e=>typeof e.id === 'number')
        : action.payload==='DB'
        ? state.dogs.filter(e=>typeof e.id === 'string')
        : state.dogs
        }
      }
      case FILTER_DOGS_BY_TEMPS: {
        return{
        ...state,
        filteredDogs: action.payload==='All'?state.dogs:state.dogs.filter(e=>e.temperament?.includes(action.payload))
        }
      }
      case FILTER_DOGS_BY_BREED: {
        return{
        ...state,
        filteredDogs: state.dogs.filter(e=>e.name.toLowerCase().includes(action.payload.toLowerCase()))
        }
      }
      default: {
       return state
      }
    };
};