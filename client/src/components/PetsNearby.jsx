import axios from 'axios';
import { useEffect, useState } from 'react';
import "../styles/PetsNearby.css"

const PetsNearby = (props) => {

    const [nearbyAnimals, setNearbyAnimals] = useState([])
    const [animalArrayLength, setAnimalArrayLength] = useState([])

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
        if(event.target.id == "first"){
            document.getElementById(0).scrollIntoView({ behavior: 'smooth' });
        }
        if(event.target.id == "middle"){
            document.getElementById(`${ Math.floor(animalArrayLength/2)}`).scrollIntoView({ behavior: 'smooth' });
        }
        if(event.target.id == "last"){
            console.log('last')
            document.getElementById(`${ animalArrayLength - 1}`).scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
    <div>
        <div className='nearbyAnimals-container snaps-inline'>
            {
                nearbyAnimals.map((animal, index) => {
                    return (
                        // Each individual animal card
                        // Prevent animals without valid information from showing
                        <div className='nearbyAnimals-card ' key = {index}>
                            <img src = {animal.primary_photo_cropped.medium} alt = "nearbyPet photo" className='nearbyAnimals-card-img'></img>
                            <p className='nearbyAnimals-card-text' >{animal.name}</p>
                        </div>
                    )
                })
            }
        </div>
        <div className="nearbyAnimals-scroller-container">
            {/* <p><i class="arrow"></i></p> */}
            {/* <button onClick = {scroller} className='nearbyAnimals-forward-scroll' id = "first"> First </button>
            <button onClick={scroller} className='nearbyAnimals-forward-scroll' id = "middle"> Middle </button>
            <button onClick={scroller} className='nearbyAnimals-forward-scroll' id = "last"> End </button> */}
        </div>
    </div>
    )
}
export default PetsNearby;

