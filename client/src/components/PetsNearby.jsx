import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import "../styles/PetsNearby.css"
import DogIcon from '../images/dog-icon-1.png'


const PetsNearby = (props) => {

    const [nearbyAnimals, setNearbyAnimals] = useState([])
    const [animalArrayLength, setAnimalArrayLength] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigate = useNavigate()

    const scrollerRef = useRef(0)

    useEffect(() => {
        let cleanToken = localStorage.getItem("API_TOKEN").slice(1, -1)
        axios.get('https://api.petfinder.com/v2/animals', {
            params: {
                'type': 'dog',
                'location': 'Chicago, IL'
            },
            headers: {
                'Authorization': `Bearer ${cleanToken}`
            }
        })
            .then((response) => {
                // Setting nearbyAnimals to an Array of animals returned from get request
                console.log(response.data.animals)
                // Filter out all animals that don't have pictures
                let filteredNearbyAnimals = response.data.animals.filter(animal => animal.primary_photo_cropped != null)
                setNearbyAnimals(filteredNearbyAnimals)
                let length = filteredNearbyAnimals.length
                setAnimalArrayLength(length)
            })
            .catch((error) => {
                console.log(error)
                // console.log(error.response.data['invalid-params'])
            })
    }, [])

    let scroller = (event) => {
        console.log("Index before change: ", currentIndex)
        if (event.target.id == 'forward') {
            if (currentIndex == animalArrayLength - 1) {
                setCurrentIndex(0)
            }
            else {
                setCurrentIndex(currentIndex + 1)
            }
            // move into view
            // document.getElementById(currentIndex).scrollIntoView({ behavior: 'smooth', inline: 'end' });
            scrollerRef.current.scrollLeft += 266

        }
        if (event.target.id == 'backward') {
            if (currentIndex == 0) {
                setCurrentIndex(animalArrayLength - 1)
            }
            else {
                setCurrentIndex(currentIndex - 1)
            }
            // move into view
            // document.getElementById(currentIndex).scrollIntoView({ behavior: 'smooth' });
            scrollerRef.current.scrollLeft -= 266
        }
    }

    const [isModalActive, setIsModalActive] = useState(false)
    const [dataForModal, setDataForModal] = useState('')

    const style1 = { display : "block" }

    const openModal = (animal, index) => {
        console.log("Animal: ", animal)
        console.log("Index: ", index)
        setDataForModal(animal)
        setIsModalActive(true)
    }

    const closeModal = () => {
        setIsModalActive(false)
    }

    const goToChat = () => {
        navigate('/ChatPage')
    }

    return (
        <div>
            <div className='nearbyAnimals-container snaps-inline' ref={scrollerRef}>
                {
                    nearbyAnimals.map((animal, index) => {
                        return (
                            // Each individual animal card
                            // Prevent animals without valid information from showing
                            <div onClick={() => openModal(animal, index)} className='nearbyAnimals-card ' key={index} id={index}>
                                <img src={animal.primary_photo_cropped.medium} alt="nearbyPet photo" className='nearbyAnimals-card-img'></img>
                                <p className='nearbyAnimals-card-text' >{animal.name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="nearbyAnimals-scroller-container">
                <div className="scroller-container">
                    <svg onClick={scroller} id="backward" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 nearbyAnimals-backward-scroll">
                        <path strokeLinecap="round" className='nearbyAnimals-forward-scroll' strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </div>
                <div className="scroller-container">
                    <svg onClick={scroller} id="forward" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 nearbyAnimals-forward-scroll">
                        <path strokeLinecap="round" className='nearbyAnimals-backward-scroll' strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </div>
            </div>
            <div className='popup__container' style = { isModalActive === true ? { ...style1}   : { display : "none"} }
                >

                    {
                        isModalActive && 
                        <div className='popup__card'>
                        <button className='btn btn-secondary btn-sm exit-button' onClick={closeModal}> X </button>
                        <div className="image__details__container">
                            <div className='image__container'>
                                {
                                    dataForModal.photos.length > 0 ? 
                                    <img className="card-img-top rounded card-image" src={dataForModal.photos[0]["medium"]}  />
                                    : 
                                    <img className="card-img-top rounded card-image" src={DogIcon}  />
                                }
                            </div>
                            <div className="details__container">
                                    <h2 className='details__heading'>{dataForModal.name}</h2>
                                <ul className='detail__list'>
                                    {dataForModal.age && <li>Age: {dataForModal.age}</li> }
                                    {dataForModal.breeds.primary && <li>Breed: {dataForModal.breeds.primary} | {dataForModal.breeds.mixed && "Mixed breed"}</li> }
                                    {dataForModal.gender && <li> Gender: {dataForModal.gender}</li> }
                                    {dataForModal.colors.primary != null && <li>Colors: {dataForModal.colors.primary} | {dataForModal.colors.secondary && dataForModal.colors.secondary} </li> }
                                    {dataForModal.attributes.shots_current != null && <li>Up to date on shots? {dataForModal.attributes.shots_current ? "Yes!" : "No" } </li> }
                                    {dataForModal.description && <li> "About me: " + dataForModal.description </li>}
                                    {dataForModal.attributes.spayed_neutered && <li> {dataForModal.gender === "male" ? "Neutered" : "Spayed:"}  {dataForModal.attributes.declawed ? "Yes" : "No" } </li>}
                                    {dataForModal.contact.email && <li> {dataForModal.contact.email && "Email: " + dataForModal.contact.email} </li>}
                                    {dataForModal.contact.phone  &&  <li> {dataForModal.contact.phone && "phone: " + dataForModal.contact.phone} </li> }
                                    {dataForModal.organization && <li> dataForModal.organization </li>}
                                </ul>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center interested-in-adopting-btn'>
                            <button className="btn btn-primary btn-sm " onClick={goToChat}>  Interested in adopting {}? </button>
                        </div>
                    </div> 
                    }
                </div>
        </div>
    )
}
export default PetsNearby;

