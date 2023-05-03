import axios from 'axios'
import { useEffect, useState, Link, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import DogIcon from '../images/dogIcon.png'
import NavBar from '../components/NavBar'

const SearchResults = () => {

    const [results, setResults] = useState([]);
    const { animal, locale, token } = useParams();
    const navigate = useNavigate()
    const refs = useRef([])


    useEffect(() => {
        // NEED TO FIX API CALL TO ADJUST TO REQ PARAMS!
        axios.get('https://api.petfinder.com/v2/animals', {
            params: {
                'type': animal,
                'location': 'Chicago, IL',
                'distance': '40'
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

        // // When the user clicks the button, open the modal 
        // btn.onclick = function() {
        //     modal.style.display = "block";
        //   }
        
        //   // When the user clicks on <span> (x), close the modal
        //   span.onclick = function() {
        //     modal.style.display = "none";
        //   }
        
        //   // When the user clicks anywhere outside of the modal, close it
        //   window.onclick = function(event) {
        //     if (event.target == modal) {
        //       modal.style.display = "none";
        //     }
        //   }

    let popup__container = document.getElementById("popup__container")
    let popup__button = document.getElementById("popup__button")
    let popup__exit = document.getElementsByClassName("popup__exit")[0] 

    const moreDetails = (animal) => {

        // console.log(ref.current.style)
        // ref.current.style.display = "block"
    }

    const exitPopup = () => {
        // ref.current.style.display = "none";
    }


    const goToChat = () => {
        navigate('/ChatPage')
    }

    return (
        <div className="">
            <NavBar />
            <div className="w-100 d-flex justify-content-around flex-wrap py-4 px-5">
                {
                    results.map((animal, index) => {
                        return (
                            <div key={index} >
                                <div className="d-flex p-2 resultCard">
                                    <div className="card shadow rounded" style={{ width: "19rem" }}>
                                        {animal.primary_photo_cropped == null
                                            ?
                                            // <img className="card-img-top rounded card-image" onClick={() => moreDetails(animal)} src={DogIcon} alt="Card image cap" />
                                            <img className="card-img-top rounded card-image" src={DogIcon} alt="Card image cap" />
                                            :
                                            // <img className="card-img-top rounded card-image shadow" onClick={() => moreDetails(animal)} src={animal.primary_photo_cropped.large} alt="Card image cap" />
                                            <img className="card-img-top rounded card-image shadow" src={animal.primary_photo_cropped.large} alt="Card image cap" />
                                        }
                                        <div className="card-body">
                                            <h5 className="card-title dog-name">{animal.name}</h5>
                                            <div className="card-text dog-details">{animal.age} | {animal.gender.toLowerCase()} | {animal.breeds.primary}</div>
                                            <div className="d-flex justify-content-center">
                                                <button className='btn btn-sm btn-primary' id="popup__button" onClick={moreDetails}>Learn more</button>

                                                <div className='popup__container' id = "popup__container" >
                                                    <div className='popup__card'>
                                                        <h3 className="text-center">{animal.name}</h3>
                                                        <div className=''>
                                                            {animal.primary_photo_cropped == null
                                                                ?
                                                                // <img className="card-img-top rounded card-image" onClick={() => moreDetails(animal)} src={DogIcon} alt="Card image cap" />
                                                                <img className="card-img-top rounded card-image" src={DogIcon} alt="Card image cap" />
                                                                :
                                                                <img className="detailPhoto rounded shadow p-2" src={animal.primary_photo_cropped.medium} alt="detailPhoto" />
                                                            }
                                                        </div>
                                                        <ul className='button-text mx-2 mt-2'>
                                                            <li>Age: {animal.age}</li>
                                                            <li>Gender: {animal.gender}</li>
                                                            <li>Breed(s): {animal.breeds.primary ? animal.breeds.primary : "n/a"}  {animal.breeds.secondary ? `/ ${animal.breeds.secondary}` : ""}</li>
                                                            {animal.tags.length != 0 &&
                                                                <li>
                                                                    {animal.name} {animal.tags.map((tag, index) => {
                                                                        return (
                                                                            <div className="w-100 d-flex justify-content-between">
                                                                                <div key={index} className="d-inline-block"> {tag} </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </li>
                                                            }
                                                            <li>Contact Information for {animal.name}:
                                                                <ul>
                                                                    <li>Email: {animal.contact.email ? animal.contact.email : "n/a"} </li>
                                                                    <li>Phone: {animal.contact.phone ? `${animal.contact.phone}` : "n/a"}</li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                        <button className='popup__exit' onClick = {exitPopup}> Exit </button>
                                                        <div className='d-flex justify-content-center'>
                                                            <button className="btn btn-primary btn-sm button-text" onClick={goToChat}>  Interested in adopting {animal.name}? </button>
                                                        </div>
                                                        <button className="btn btn-primary btn-sm button-text" onClick = {goToChat}> Interested in adopting {animal.name}? </button>
                                                    </div>
                                                </div>
                                                
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