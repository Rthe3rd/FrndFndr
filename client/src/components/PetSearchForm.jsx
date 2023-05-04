import {useEffect, useState} from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import magIcon from "../images/mag-icon.svg"



const PetSearchForm = (props) => {

    const [animal, setAnimal] = useState('')
    const [locale, setlocale] = useState('')
    const [token, setToken] = useState('')

    const [distance, setdistance] = useState('')
    const [searchErrors, setSearcErrors] = useState('')
    
    const navigate = useNavigate()
    // setQuickSearch = {setQuickSearch} quickSearch = {quickSearch} token = {token}

    const makeRequest = (event) => {
        let cleanToken = localStorage.getItem("API_TOKEN").slice(1, -1)
        navigate(`/${animal}/${locale}/${cleanToken}`)
    }

    return (
        <div className='form-container'>
                <div className = "input-group search-form">
                    <input 
                    onChange = {(event) => {setAnimal(event.target.value)}}
                    type="text" placeholder="Dog, Cat, Rabbit..." className="form-control"
                    />
                    <input 
                    onChange = {(event) => {setlocale(event.target.value)}}
                    type="text" placeholder="City, State | Chicao, IL" className="form-control"
                    />
                    <span className ="input-group-text" onClick = {makeRequest}><img className='mag-icon' src = {magIcon} alt = "" ></img></span>
                </div>
        </div>
    )
}
export default PetSearchForm