import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImageSlider from '../components/ImageSlider' 
import PetSearchForm from '../components/PetSearchForm'
import PetsNearby from '../components/PetsNearby'


const Main = ({setToken2, passToken, quickSearch}) => {

    const [token, setToken] = useState('')
    const [randomAnimals, setrandomAnimals] = useState('')

    useEffect(() => {
        // NEED TO FIX API CALL TO ADJUST TO REQ PARAMS!
        axios.get('https://api.petfinder.com/v2/animals', {
            params: {
                'type': 'dog',
                'location' : 'Chicago, IL',
                'distance' : '40'
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log("RANDOM ANIMALS: ", response.data.animals)
            setrandomAnimals(response.data.animals)
        })
        .catch((error) => {
            console.log("MAIN/TOKEN ERROR: ", error)
            console.log(quickSearch)

            // console.log(error.response.data['invalid-params'])
        })
    }, [])

    const handleToken = (liftedToken) => {
        setToken(liftedToken)
    }

    return(
        <div className = "">
            <div className = "subDiv topSubDiv">
                <PetSearchForm setToken2 = {setToken2} handleToken = {handleToken}/>
            </div>
            <div className = "subDiv d-flex justify-content-center">
                {/* <ImageSlider/> */}
            </div>
            <div className = "">
                {/* <ImageSlider/> */}
            </div>
        </div>
    )
}
export default Main