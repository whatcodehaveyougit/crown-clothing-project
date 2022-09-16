import { createContext, useState, useEffect } from "react";
import SHOP_DATA from '../shop-data';
import { addCollectionAndDocuments, getCatagoriesAndDocuments } from "../utils/firebase/firebase.js";

// The value I want to access
export const CatagoriesContext = createContext({
    catagoriesMap: {},
});

export const CatagoriesProvider = ({ children }) => {
    const [ catagoriesMap, setCatagoriesMap ] = useState( {} );

    // This got all the data into the Firestore DB.  Although I could not get the SHOP_DATA js import to work. 
    // useEffect( () => {
    //     console.log( SHOP_DATA )
    //     console.log('Use Effect for addCollectionAndDocuments running');
    //     addCollectionAndDocuments( 'catagories', SHOP_DATA );
    // }, [] )

    useEffect(() => {
        // When using an async funcion inside of useEffect, don't make the useEffect async, create a new function inside.
        const getCatagoriesMap = async () => {
            const catagoryMap = await getCatagoriesAndDocuments();
            setCatagoriesMap(catagoryMap)
        }
        getCatagoriesMap();
    }, [])

    const value = { catagoriesMap };


    return (
        <CatagoriesContext.Provider value={value}>{children}</CatagoriesContext.Provider>
    )
}