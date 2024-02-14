import React, { createContext, useContext, useReducer } from 'react'

const ContextProvider = createContext()


const actionTypes = {
    SET_USER : "SET_USER",
    LOGIN_USER : "LOGIN_USER",
    LOGOUT_USER : "LOGOUT_USER",
    ADD_NEW_MESSAGE : "ADD_NEW_MESSAGE",
};

const initialState = {
    isLoggedIn : false,
    currUser : null,
    messages : ([])
}

const reducer = (state,action) =>{
    switch(action.type){
        // case actionTypes.DARK_MODE:
        //     return {...state, darkMode: !state.darkMode}
        
        case actionTypes.SET_USER:
            return {...state, currUser: action.payload}

        case actionTypes.LOGIN_USER:
            return {...state, isLoggedIn: true}

        case actionTypes.LOGOUT_USER:
            return {...state, isLoggedIn: false}

        case actionTypes.ADD_NEW_MESSAGE:
            return {...state, messages:action.payload}
        
        default:
            return state;
    }
}

export const Context = ({children}) => {

    

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ContextProvider.Provider value={{state,dispatch,actionTypes}}>
            {children}
        </ContextProvider.Provider>
    )
}

export const useGlobalStore = () => {

    const context = useContext(ContextProvider)

    if(!context){
        console.log("useContext must be use inside ContextProvider")
    }

    return context

}
