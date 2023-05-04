import axios from 'axios'
import { useEffect, useState, Link, useRef, createRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import DogIcon from '../images/dogIcon.png'
import NavBar from '../components/NavBar'

const SearchResults = () => {

    const [results, setResults] = useState([]);
    const { animal, locale, token } = useParams();
    const navigate = useNavigate()

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

    const [isActive, setIsActive] = useState(false)
    const [modalIndex, setIndexModal] = useState('')

    const changeCSS  = (event, index) => {
        console.log(event.target)
        console.log(index)
        setIndexModal(index)
        setIsActive(!isActive)
    }

    const style1 = { display : "block" }
    const style2 = { background : "rgba(0, 0, 0, 0.7)" }
    const style3 = { transition: "all 5s" }


    const moreDetails = (animal, index) => {
        console.log(index)
        // animal.target.style.display = "block"
    }

    const exitPopup = () => {
        setIndexModal(null)
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
                                            <img className="card-img-top rounded card-image" src={DogIcon} alt="Card image cap" />
                                            :
                                            <img className="card-img-top rounded card-image shadow" src={animal.primary_photo_cropped.large} alt="Card image cap" />
                                        }
                                        <div className="card-body">
                                            <h5 className="card-title dog-name">{animal.name}</h5>
                                            <div className="card-text dog-details">{animal.age} | {animal.gender.toLowerCase()} | {animal.breeds.primary}</div>
                                            <div className="d-flex justify-content-center">
                                                {/* <button className='btn btn-sm btn-primary' id="popup__button" key={index} animal={animal} onClick={animal => moreDetails(animal, index)} >Learn more</button> */}
                                                <button className='btn btn-sm btn-primary' id="popup__button" key={index} animal={animal} onClick={animal => changeCSS(animal, index)} >Learn more</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    results.map((animal, index) => {
                        return (
                            <>
                            {/* {`${modalIndex == index ? "popup__container__show" : "popup__container"}`} */}
                            <div className="popup__container"  id="popup__container" key={index} animal={animal} index={index} 
                            style = { modalIndex == index ? { ...style1, ...style2, ...style3 }   : { display : "none", ...style3} }
                            >
                                <div className='popup__card'>
                                    <h3 className="text-center">{animal.name}</h3>
                                    <div className=''>
                                        {animal.primary_photo_cropped == null
                                            ?
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
                                                        <div key={index} className="w-100 d-flex justify-content-between">
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
                                    <button className='popup__exit' onClick={exitPopup}> Exit </button>
                                    <div className='d-flex justify-content-center'>
                                        <button className="btn btn-primary btn-sm button-text" onClick={goToChat}>  Interested in adopting {animal.name}? </button>
                                    </div>
                                    <button className="btn btn-primary btn-sm button-text" onClick={goToChat}> Interested in adopting {animal.name}? </button>
                                </div>
                            </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchResults;