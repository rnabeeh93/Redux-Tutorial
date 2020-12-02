const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

//--------------------------------------------------- Notes ------------------------------------------------------------------------//

//* Asynchronous actions
//? All actions so far have been synchronous; as soon as an action was dispatched the state was immediately updated
//? this does not always work such as fetching from an api, we don't want to hold up the application as we wait

//* API call with redux
//? We need axios: to make request, redux-thunk: the standard way to define async action creators; it is a middleware

//-------------------------------------------------  Code  ----------------------------------------------------------------------------//

//Init state
const initialState = {
    loading: false,
    users: [],
    error: ''
}

//Actions
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}
const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

//Async action
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            const users = res.data.map(user => user.username);
            dispatch(fetchUsersSuccess(users))
        })
        .catch(err =>{
            dispatch(fetchUsersFailure(err.message));
        })
    }
}

//Reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return{
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    }
}

//Store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers());