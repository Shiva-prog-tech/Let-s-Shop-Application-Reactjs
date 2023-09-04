import { useEffect, useState } from "react";
import { createContext } from "react";

import { getCategoriesAndDocuments} from "../utils/firebase/firebase.component.js";
// import SHOP_DATA from "../shop-data.js"
export const CategoriesContext=createContext({
    categoriesMap:{},
})

export const CategoriesProvider=({children})=>{
    const [categoriesMap, setCategoriesMap]=useState({});
    useEffect(()=>{
        const getCategoriesMap= async()=>{
            
            const categoryMap=await getCategoriesAndDocuments()
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
            
        }
        return getCategoriesMap;
    },[])

    const value={categoriesMap}
    return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}