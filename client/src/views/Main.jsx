import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ImageSlider from '../components/ImageSlider' 
import PetSearchForm from '../components/PetSearchForm'
import PetsNearby from '../components/PetsNearby'


const Main = (props) => {

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
            // console.log(error.response.data['invalid-params'])
        })
    }, [])

    const handleToken = (liftedToken) => {
        setToken(liftedToken)
    }

    return(
        <div className = "">
            <div className = "subDiv topSubDiv">
                <PetSearchForm handleToken = {handleToken} />
            </div>
            <div className = "subDiv d-flex justify-content-center">
                {/* <PetsNearby imageSource = {"https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGV0c3xlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60"}/>
                <PetsNearby imageSource = {"./images/carousel1.jpg"}/>
                <PetsNearby imageSource = {"https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGV0c3xlbnwwfDF8MHx8&auto=format&fit=crop&w=400&q=60"}/> */}
                <ImageSlider/>
            </div>
            <div className = "">
                {/* <ImageSlider/> */}
            </div>
        </div>
    )
}
export default Main