import { createContext,useEffect,useState } from "react";


export const SavedContext = createContext();

export const SavedContextProvider = ({children})=>{

    const [savedUser, setSavedUser] = useState(
        JSON.parse(localStorage.getItem("save")) || false
    );

    const updateSave = (data)=>setSavedUser(data);

    useEffect(() => {
        localStorage.setItem("save",JSON.stringify(savedUser));
    }, [savedUser])
    

return(
    <SavedContext.Provider value={{savedUser,setSavedUser,updateSave}}>
        {children}
    </SavedContext.Provider>
    )

}