import './App.css';
import React, {useReducer} from 'react';

const initialState = {
  name:{
    value: "",
    error: ""
  },
  lname:{
    value:"",
    error:""
  },
  email:{
    value:"",
    error:""
  },
  hasBeenSubmitted: false
}
const reducer = (state,action) =>{
  switch (action.type){
    case "SET_NAME_VALUE":
      return{
        ...state,
        name:{
          ...state.name,
          value: action.payload
        }
      }
    case "SET_NAME_ERROR":
      return{
        ...state,
        name:{
          ...state.name.value,
          error: action.payload
        }
      }
    case "SET_LNAME_VALUE":
      return{
        ...state,
        lname:{
          ...state.lname,
          value: action.payload
        }
      }
    case "SET_LNAME_ERROR":
      return{
        ...state,
        lname:{
          ...state.lname.value,
          error: action.payload
        }
      }
    case "SET_EMAIL_VALUE":
      return{
        ...state,
        email:{
          ...state.email,
          value: action.payload
        }
      }
    case "SET_EMAIL_ERROR":
      return{
        ...state,
        email:{
          ...state.email.value,
          error:action.payload
        }
      }
    case "SET_HANDLE_SUBMIT":
      return{
        ...state,
        hasBeenSubmitted:action.payload
      }
      default:
        return state;
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleName = (e ) =>{
    if(e.target.value.length < 3) {
      dispatch({
        type:"SET_NAME_ERROR",
        payload: "The name must be more than 2 characters"
      });
    }else{
      dispatch({
        type: "SET_NAME_ERROR",
        payload: ""
      });
    }


    dispatch({
      type: "SET_NAME_VALUE",
      payload: e.target.value
    });
  }

  const handleLname =(e) => {
    if(e.target.value.length<=2){
      dispatch({
        type: "SET_LNAME_ERROR",
        payload: "The last name must be longer than 2 characters"
      });
    }else{
      dispatch({
        type: "SET_LNAME_ERROR",
        payload: ""
      });
    }

    dispatch({
      type: "SET_LNAME_VALUE",
      payload: e.target.value
    });
  }
  const handleEmail =(e) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)){
      dispatch({
        type:"SET_EMAIL_ERROR",
        payload: ""
      });
    }else{
      dispatch({
        type:"SET_EMAIL_ERROR",
        payload: "You have entered an invalid email address"
      });
    }



    dispatch({
      type:"SET_EMAIL_VALUE",
      payload: e.target.value
    });
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch({
      type: "SET_HANDLE_SUBMIT",
      payload:true
    });
  }






  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {/* <h1>{JSON.stringify(state)}</h1> */}
        {
          state.hasBeenSubmitted ?
          <h2>Form has been submited</h2>:
          <h2>Please submit the form</h2>
        }
        <div>
          <label>First Name</label>
          <input
            id="name"
            value={state.name.value}
            onChange={(e) => handleName(e)}
          />
          {
            state.name.error === "The name must be more than 2 characters" && state.name.value.length >0?
            <p>{state.name.error}</p>:
            state.name.error === ""?
            <p className='emptyp'></p>:
            <p className='emptyp'></p>
          }
        </div>
        <div>
          <label>Last Name</label>
          <input
          id="lname"
          value={state.lname.value}
          onChange={(e) => handleLname (e)}
          />
          {
            state.lname.error === "The last name must be longer than 2 characters" &&state.lname.value.length>0?
            <p>{state.lname.error}</p>:
            state.lname.error === ""?
            <p className='emptyp'></p>:
            <p className='emptyp'></p>
          }
        </div>
        <div>
          <label>Email</label>
          <input
          id="email"
          value={state.email.value}
          onChange={(e) => handleEmail (e)}
          />
          {
            state.email.error === "You have entered an invalid email address" && state.email.value.length >0?
            <p>{state.email.error}</p>:
            state.email.value === ""?
            <p className='emptyp'></p>:
            <p>Your email is valid</p>
          }
        </div>
        <input type="submit" value="submit" id="btn"/>
      </form>
  </div>
  );
}

export default App;
