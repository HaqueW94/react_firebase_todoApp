import React from 'react';

export const AddContext=React.createContext();

export function AddItemProvider({children}){
    const [show,setShow]=React.useState("none");
     const Value={show,setShow}
    return(
        <AddContext.Provider value={Value}>
            {children}
        </AddContext.Provider>
    );
}


