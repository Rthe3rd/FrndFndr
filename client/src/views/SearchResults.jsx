import axios from 'axios'
import { useEffect, useState, Link } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import DogIcon from '../images/dogIcon.png'

const SearchResults = () => {

    const [results, setResults] = useState([]);
    const {animal, locale, token} = useParams();
    const navigate = useNavigate() 


    useEffect(() => {
        // NEED TO FIX API CALL TO ADJUST TO REQ PARAMS!
        axios.get('https://api.petfinder.com/v2/animals', {
            params: {
                'type': animal,
                'location' : 'Chicago, IL',
                'distance' : '40'
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data.animals)
            setResults(response.data.animals)
        })
        .catch((error) => {
            console.log(error)
            // console.log(error.response.data['invalid-params'])
        })
    }, [])

    const moreDetails = (animal) => {
        console.log(animal)
    }

    const goToChat = () => {
        navigate('/ChatPage')
    }

    return(
        <div>
            <div className = "w-100 d-flex justify-content-around flex-wrap">
                {
                    results.map((animal, index) => {
                        
                        return(
                        <div key = { index } >
                            <div className = "d-flex p-2 resultCard">
                                <div className="card shadow rounded" style = {{width: "19rem"}}>
                                    {animal.primary_photo_cropped == null 
                                    ? 
                                    <img className="card-img-top p-2 rounded" onClick = {() => moreDetails(animal)} src={DogIcon} alt="Card image cap"/>
 
                                    :
                                    <img className="card-img-top p-2 rounded" onClick = {() => moreDetails(animal)} src={animal.primary_photo_cropped.medium} alt="Card image cap"/>
                                    }
                                    <div className="card-body">
                                        <h5 className="card-title">{animal.name}</h5>
                                        <p className = "card-text">{animal.name} is a {animal.age.toLowerCase()} {animal.gender.toLowerCase()} {animal.breeds.primary}.</p>
                                        <div className = "d-flex justify-content-between">
                                            <Popup trigger={<button className="btn btn-success btn-sm button-text"> See more! </button>} 
                                                modal 
                                                nested
                                            >
                                                    <h3 className = "text-center">{animal.name}</h3>
                                                    <div className='d-flex justify-content-center'>                                                    
                                                        {animal.primary_photo_cropped == null 
                                                        ? 
                                                        <h6></h6> 
                                                        :
                                                        <img className="detailPhoto rounded shadow p-2" src={animal.primary_photo_cropped.medium} alt="detailPhoto"/>
                                                        }
                                                    </div>
                                                    <ul className='button-text mx-2 mt-2'>
                                                        <li>Age: {animal.age}</li>
                                                        <li>Gender: {animal.gender}</li>
                                                        <li>Breed(s): {animal.breeds.primary ? animal.breeds.primary: "n/a" }  {animal.breeds.secondary ? `/ ${animal.breeds.secondary}` : ""}</li>
                                                        {animal.tags.length != 0 && 
                                                            <li> 
                                                                {animal.name} {animal.tags.map((tag, index) => {
                                                                        return(
                                                                            <div className = "w-100 d-flex justify-content-between">
                                                                                <div key = {index} className = "d-inline-block"> { tag } </div>
                                                                            </div>
                                                                        )
                                                                })}
                                                            </li>
                                                        }
                                                        <li>Contact Information for {animal.name}:
                                                            <ul>
                                                                <li>Email: {animal.contact.email ? animal.contact.email : "n/a" } </li> 
                                                                <li>Phone: {animal.contact.phone ? `${animal.contact.phone}` : "n/a"}</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                    <div className='d-flex justify-content-between px-3'>
                                                        <button className="btn btn-primary btn-sm button-text" onClick = {goToChat}>  Interested in adopting {animal.name}? </button>
                                                    </div>
                                            </Popup>
                                            <button className="btn btn-primary btn-sm button-text" onClick = {goToChat}> Interested in adopting {animal.name}? </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchResults;