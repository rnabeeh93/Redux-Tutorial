const redux = require('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger();

//--------------------------------------------------- Notes ------------------------------------------------------------------------//

//* Action
//? The only way your application can interact with the store
//? Carry information from your app to the redux store
//? Plate js objects
//? Must have a type property that indicates the type of action to be performed (typically a string constant)

//* Reducers
//? Specify how the app's state changes in response to actions sent to the store
//? Function that accepts state and action as args, and returns the new state of the app (prevState, action) => newState
//! You will have more than one reducer for each job type for scalability. In our example we have one for cake and ice cream

//* Store
//? One store for the entire app
/* Responsibilities - 
      ? holds app state
      ? allows access to state via getState()
      ? allows state to be updated via dispatch(action)
      ? register listeners via subscribe(listener)
      ? handles unregistering of listeners via the function returned by subscribe(listener)
*/

//* Middleware
//? Extend redux with additional functionality, provides an extension between dispatching an action and it reaching redux
//! We will be using redux logger as an example

//-------------------------------------------------  Code  ----------------------------------------------------------------------------//

//*action 
const BUY_CAKE = 'BUY_CAKE';
function buyCake(){  //? action creator - a function that returns an action. We do this to simplify dispatch method and have a single source of change
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}
const BUY_ICECREAM = 'BUY_ICECREAM';
function buyIceCream(){  
    return {
        type: BUY_ICECREAM        
    }
}

//*reducer
const initialCakeState = { //Cake shopkeeper
    numOfCakes: 10
}
const initialIceCreamState = {
    numOfIceCreams: 20
}
const cakeReducer = (state = initialCakeState, action) => {    
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default:
            return state;
    }
}
const iceCreamReducer = (state = initialIceCreamState, action) => {    
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: iceCreamReducer
});

//*store
const store = createStore(rootReducer, applyMiddleware(logger));
console.log('Initial state', store.getState());
const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState());
});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();