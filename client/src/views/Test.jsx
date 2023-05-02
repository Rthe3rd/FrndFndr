import '../styles/Main.css';
import PetSearchForm from '../components/PetSearchForm'
import NavBar from '../components/NavBar'
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import dog from '../images/dog.png'
import cat from '../images/cat.png'
import bird from '../images/bird.png'
import other from '../images/other.png'


const Test = (props) => {

    const handleToken = (liftedToken) => {
        // setToken(liftedToken)
    }
    return (
        <div className="main-wrapper">
            <div className = "row-1">
                <NavBar/>
            </div>
            <div className = "row-2">
                    <PetSearchForm handleToken = {handleToken} className = "" />
            </div>
            <div className = "row-3"></div>
            <div className = "block-1">
                <div className = "overlap-card">
                    <div className = "icon-container">
                        <img className = "dog-icon"  src = {dog} alt="overlap card image"/>
                        <div className = "overlap-card-text"> Dogs </div>
                    </div>
                </div> 
                <div className = "overlap-card">
                    <div className = "icon-container">
                        <img className = "cat-icon"  src = {cat} alt="overlap card image"/>
                        <div className = "overlap-card-text"> Cats </div>
                    </div>
                </div> 
                <div className = "overlap-card">
                    <div className = "icon-container">
                        <img className = "bird-icon"  src = {bird} alt="overlap card image"/>
                        <div className = "overlap-card-text"> Birds </div>
                    </div>
                </div> 
                <div className = "overlap-card">
                    <div className = "icon-container">
                        <img className = "other"  src = {other} alt="overlap card image"/>
                        <div className = "overlap-card-text"> Other </div>
                    </div>
                </div>
            </div>
            <div className = "row-4"></div>


            {/* <div class="wrapper">
                <div class="box box1">One</div>
                <div class="box box2">Two</div>
                <div class="box box3">Three</div>
                <div class="box box4">Four</div>
                <div class="box box5">Five</div>
            </div> */}


        </div>
    )
}

export default Test