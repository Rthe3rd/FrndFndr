import {useEffect, useState} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import "../styles/Main.css"
import magIcon from "../images/mag-icon.svg"



const PetSearchForm = (props) => {

    const [animal, setAnimal] = useState('')
    const [locale, setlocale] = useState('')
    const [token, setToken] = useState('')

    const [distance, setdistance] = useState('')
    const [searchErrors, setSearcErrors] = useState('')
    
    const navigate = useNavigate()

    // Post request to the API to retrieve for a token - see readme
    // useEffect(() => {
    //     axios.post(
    //         'https://api.petfinder.com/v2/oauth2/token',
    //         'grant_type=client_credentials&client_id=DQIKDmlCEqJgxmbVSeV9fjI3Lqja57S6014rEAkXcSNgZ7m2Ia&client_secret=yfqEgOtfa30PDQo3t16DdpgULiyCF0PoGxnAgvxY',
    //         {
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             }
    //         }
    //     )
    //     .then((response) => {
    //         props.setToken2(response.data.access_token)
    //         setToken(response.data.access_token)
    //     })
    //     .catch((error) => {console.log(error)})
    // }, [])

    const makeRequest = (event) => {
        console.log(token)
        event.preventDefault()
        navigate(`/${animal}/${locale}/${token}`)
    }

    return (
        <div className='form-container'>
                <div className = "input-group search-form">
                    <input 
                    onChange = {(event) => {setAnimal(event.target.value)}}
                    type="text" placeholder="Dog, Cat, Rabbit..." class="form-control"
                    />
                    <input 
                    onChange = {(event) => {setlocale(event.target.value)}}
                    type="text" placeholder="City, State | Chicao, IL" class="form-control"
                    />
                    <span class="input-group-text" onClick = {makeRequest}><img className='mag-icon' src = {magIcon} alt = "" ></img></span>
                </div>
        </div>
    )
}
export default PetSearchForm