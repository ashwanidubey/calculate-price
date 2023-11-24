import { PRODUCTDESC , CREDENTIALS , ISLOGGEDIN } from './actions';
import initialvalue from './initialstate';

// Reducer function
const counterReducer = (state = initialvalue, action) => {
  switch(action.type){
    case  CREDENTIALS:
          console.log({...initialvalue,credentials:action.data})
          return {...initialvalue,credentials:action.data , isLoggedin:!state.isLoggedin};
    case ISLOGGEDIN:
          return {...initialvalue,isLoggedin:action.data}                
    default :
       return state;       
 }
};

export default counterReducer;