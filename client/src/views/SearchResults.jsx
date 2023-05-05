import axios from 'axios'
import { useEffect, useState, Link, useRef, createRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import DogIcon from '../images/dog-icon-1.png'
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
        <div className="">
            <NavBar />
            <div className="w-100 d-flex justify-content-around flex-wrap py-4 px-5 main__card">
                {
                    results.map((animal, index) => {
                        return (
                            // animal.primary_photo_cropped &&
                            <div key={index} >
                                <div className="d-flex p-2 resultCard">
                                    <div className="card shadow rounded" style={{ width: "19rem" }}>
                                        <div className='img-container'>
                                            {animal.primary_photo_cropped == null
                                                ?
                                                <img className="card-img-top rounded card-image" src={DogIcon} style ={{padding: "16px"}}  />
                                                :
                                                <img className="card-img-top rounded card-image shadow" src={animal.primary_photo_cropped.large}  />
                                            }

                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title dog-name">{animal.name}</h5>
                                            <div className="card-text dog-details">{animal.age} | {animal.gender.toLowerCase()} | {animal.breeds.primary}</div>
                                            <div className="d-flex justify-content-center">
                                                <button className='btn btn-sm btn-primary' id="popup__button" key={index} animal={animal} onClick={event => openModal(animal, index)} >Learn more</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
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
                                    <li>Up to date on shots? {dataForModal.attributes.shots_current ? "Yes!" : "No" } </li>
                                    <li>{dataForModal.description && "About me: " + dataForModal.description}</li>
                                    {dataForModal.attributes.spayed_neutered && <li> {dataForModal.gender === "male" ? "Neutered" : "Spayed:"}  {dataForModal.attributes.declawed ? "Yes" : "No" } </li>}
                                    {dataForModal.contact.email && <li> {dataForModal.contact.email && "Email: " + dataForModal.contact.email} </li>}
                                    {dataForModal.contact.phone  &&  <li> {dataForModal.contact.phone && "phone: " + dataForModal.contact.phone} </li> }
                                    {dataForModal.organization && <li> dataForModal.organization </li>}
                                </ul>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center interested-in-adopting-btn'>
                            <button className="btn btn-primary btn-sm " onClick={goToChat}>  Interested in adopting {animal.name}? </button>
                        </div>
                    </div> 
                    }
                </div>

            </div>
        </div>
    )
}

export default SearchResults;


// {
//     results.map((animal, index) => {
//         return (
//             <>
//             <div className="popup__container"  id="popup__container" key={index} animal={animal} index={index} 
//             style = { modalIndex == index ? { ...style1, ...style2, ...style3 }   : { display : "none", ...style3} }
//             >
                // <div className='popup__card'>
                //     <h3 className="text-center">{animal.name}</h3>
                //     <div className=''>
                //         {animal.primary_photo_cropped == null
                //             ?
                //             <img className="card-img-top rounded card-image" src={DogIcon}  />
                //             :
                //             <img className="detailPhoto rounded shadow p-2" src={animal.primary_photo_cropped.medium}                 //         }
                //     </div>
                //     <ul className='button-text mx-2 mt-2'>
                //         <li>Age: {animal.age}</li>
                //         <li>Gender: {animal.gender}</li>
                //         <li>Breed(s): {animal.breeds.primary ? animal.breeds.primary : "n/a"}  {animal.breeds.secondary ? `/ ${animal.breeds.secondary}` : ""}</li>
                //         {animal.tags.length != 0 &&
                //             <li>
                //                 {animal.name} {animal.tags.map((tag, index) => {
                //                     return (
                //                         <div key={index} className="w-100 d-flex justify-content-between">
                //                             <div key={index} className="d-inline-block"> {tag} </div>
                //                         </div>
                //                     )
                //                 })}
                //             </li>
                //         }
                //         <li>Contact Information for {animal.name}:
                //             <ul>
                //                 <li>Email: {animal.contact.email ? animal.contact.email : "n/a"} </li>
                //                 <li>Phone: {animal.contact.phone ? `${animal.contact.phone}` : "n/a"}</li>
                //             </ul>
                //         </li>
                //     </ul>
                    // <button className='popup__exit' onClick={exitPopup}> Exit </button>
                    // <div className='d-flex justify-content-center'>
                    //     <button className="btn btn-primary btn-sm button-text" onClick={goToChat}>  Interested in adopting {animal.name}? </button>
                    // </div>
//                     <button className="btn btn-primary btn-sm button-text" onClick={goToChat}> Interested in adopting {animal.name}? </button>
//                 </div>
//             </div>
//             </>
//         )
//     })
// }