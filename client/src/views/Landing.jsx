import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
// style sheet
import '../styles/Landing.css'
// components
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import PetSearchForm from '../components/PetSearchForm'
// images
import dog1 from '../images/dog.png'
import cat from '../images/cat.png'
import other from '../images/other.png'
import quickCat from '../images/quick-cat.jpg'
import quickDog from '../images/quick-dog.jpg'
import house from '../images/house.png'
import catIcon from "../images/cat-icon-1.png"
import dogIcon from "../images/dog-icon-1.png"
import mouseIcon from "../images/mouse-icon-1.png"
import axios from 'axios'
import PetsNearby from '../components/PetsNearby'

const Landing = (props) => {

    const [cleanToken, setcleanToken] = useState('')

    const navigate = useNavigate();

    const setqQuickSearch = (event) => {
        // props.setQuickSearch(event.target.getAttribute("data-custom"))
        // navigate(`/${event.target.getAttribute("data-custom")}`)
    } 
    
    useEffect(() => {
        // Getting token from local storage and slicing the double quotes from the start and end
        let cleanToken = localStorage.getItem("API_TOKEN").slice(1,-1)
        setcleanToken(cleanToken);
    }, [cleanToken])

    return (
        <div className='body-container'>
            <NavBar/>
            <div className='background-container'>
                <PetSearchForm className = "search-form" token = {props.cleanToken}/>
                <div className='center-header-container'>
                    <h2 className='center-header'>Find Your Future Best Friend</h2>
                    <p className='center-sub-header'>Easily search our database of shelters from all over the country </p>
                </div>
            </div>
            {/* CONTAINER FOR ANIMAL QUICK SEARCH */}
            <div className = 'card-container2'>
                <div className = "search-card" onClick = {setqQuickSearch} data-custom = "dog">
                    <img src = {dogIcon} alt = "" className='dog-search-card' data-custom = "dog"></img>
                    <p className = "search-card-text" data-custom = "dog"> Dogs </p>
                </div>
                <div className = "search-card" onClick = {setqQuickSearch} data-custom = "cat">
                    <img src = {catIcon} alt = "" className='dog-search-card' data-custom = "cat"></img>
                    <p className = "search-card-text" data-custom = "cat"> Cats </p>
                </div>
                <div className = "search-card" onClick = {setqQuickSearch} data-custom = "other">
                    <img src = {mouseIcon} alt = "" className='dog-search-card' data-custom = "other"></img>
                    <p className = "search-card-text" data-custom = "other"> Other Animals </p>
                </div>
                <div className = "search-card" onClick = {setqQuickSearch} data-custom = "other">
                    <img src = {house} alt = "" className='dog-search-card' data-custom = "other"></img>
                    <p className = "search-card-text" data-custom = "other"> Shelters & Rescues </p>
                </div>
            </div>
            {/* SMALL CONTAINER FOR ANIMAL QUICK SEARCH */}
            <div className = "card-container-small" onClick = {setqQuickSearch} data-custom = "other">
                <div className = "search-card-quick" data-custom = "other">
                    <img src = "" alt = "" className='dog-search-card' data-custom = "other"></img>
                    <p> Quick Search</p>
                </div>
            </div>
            <div className='center-header-purple-container'>
                <p className='center-header-purple'> Friends Ready For A New Home Nearby</p>
            </div>
            {/* CONTAINER FOR ALL THE NEARBY PET CARDS */}
            <div className = 'nearby-container'>
                <PetsNearby/>
            </div>
            {/* SMALL CONTAINER FOR ALL THE NEARBY PET CARDS */}
            <div className = "nearby-container-small" onClick = {setqQuickSearch} data-custom = "other">
                <div className = "search-card-quick" data-custom = "other">
                    <img src = "" alt = "" className='dog-search-card' data-custom = "other"></img>
                    <p> Quick Search</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Landing