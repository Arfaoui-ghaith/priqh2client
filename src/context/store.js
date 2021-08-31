import React from 'react';

const StoreStateContext = React.createContext();
const StoreDispatchContext = React.createContext();

let projet = null;
let prestataire = null;
let newProjet = null;
let commune = null;
let memoire = null;
let financements = null;
let decompte = null;
let gouvernorat = localStorage.getItem('gouvernoratPriqh2');

if(!gouvernorat){
    gouvernorat = 'Bizerte';
}


const storeReducer = (state, action) => {
    switch(action.type) {
        case 'decompteEdit' :
            return {
                ...state,
                decompte: action.payload,
            }
        case 'financementEdit' :
            return {
                ...state,
                financements: action.payload,
            }
        case 'memoireEdit' :
            return {
                ...state,
                memoire: action.payload,
            }
        case 'prestataireEdit' :
            return {
                ...state,
                prestataire: action.payload,
            }
        case 'newProjet' :
            return {
                ...state,
                newProjet: action.payload,
            }
        case 'projetEdit' :
            return {
                ...state,
                projet: action.payload
            }
        case 'communeEdit' :
            return {
                ...state,
                commune: action.payload
            }
        case 'gouvernoratEdit' :
            localStorage.setItem('gouvernoratPriqh2',action.payload);
            return {
                ...state,
                gouvernorat: action.payload
            }

        default:
            throw new Error(`Unkonwn action type: ${action.type}`);
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(storeReducer, { projet, commune, gouvernorat, newProjet, prestataire, memoire, financements, decompte });

    return (
        <StoreDispatchContext.Provider value={dispatch}>
            <StoreStateContext.Provider value={state}>
                {children}
            </StoreStateContext.Provider>
        </StoreDispatchContext.Provider>
    );
}

export const useStoreState = () => React.useContext(StoreStateContext);
export const useStoreDispatch = () => React.useContext(StoreDispatchContext);