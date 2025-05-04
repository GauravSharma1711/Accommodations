import { createContext,useEffect,useState } from "react";

export const FilterContext = createContext();

export const FilterContextProvider = ({children})=>{

    const [currentFilterData, setCurrentFilterData] = useState(
         JSON.parse(localStorage.getItem("filter")) || null
    )

    const updateFilterData = (data)=> setCurrentFilterData(data);

    useEffect(() => {
        localStorage.setItem("filter",JSON.stringify(currentFilterData));
    }, [currentFilterData])
    


 return(
    <FilterContext.Provider value={{currentFilterData,setCurrentFilterData,updateFilterData}}>
    {children}
    </FilterContext.Provider>
    )
}