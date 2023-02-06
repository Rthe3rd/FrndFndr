import {useEffect, useState} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'

const PetSearchForm = (props) => {

    const [animal, setAnimal] = useState('')
    const [locale, setlocale] = useState('')
    const [distance, setdistance] = useState('')
    const [token, setToken] = useState('')
    const [searchErrors, setSearcErrors] = useState('')
    
    const navigate = useNavigate()

    useEffect(() => {
        axios.post(
            'https://api.petfinder.com/v2/oauth2/token',
            'grant_type=client_credentials&client_id=DQIKDmlCEqJgxmbVSeV9fjI3Lqja57S6014rEAkXcSNgZ7m2Ia&client_secret=yfqEgOtfa30PDQo3t16DdpgULiyCF0PoGxnAgvxY',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
        .then((response) => {
            setToken(response.data.access_token)
            props.handleToken(response.data.access_token)
        })
        .catch((error) => {console.log(error)})
    }, [])

    const makeRequest = (event) => {
        console.log(token)
        event.preventDefault()
        navigate(`/${animal}/${locale}/${token}`)
    }

    return (
        <div>
            <form onSubmit = {makeRequest}>
                <div className="d-flex justify-content-center">
                    <div className="col-4 formInput mx-auto">
                        <input onChange = {(event) => {setAnimal(event.target.value)}} type="text" className="form-control" placeholder = "Enter Dog, Kitten, Boxer etc." />
                    </div>
                    <div className="col-4 formInput mx-auto">
                        <input onChange = {(event) => {setlocale(event.target.value)}} type="text" className="form-control" placeholder = "Enter City, State or Zip" />
                    </div>
                    <div className="col-2 formInput mx-auto">
                        <input type="submit" className="form-control btn btn-primary" />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default PetSearchForm