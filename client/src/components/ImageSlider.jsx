import { ImageSliderData } from "./ImageSliderData";
import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'


const ImageSlider = () => {

    const [current, setCurrent] = useState(0)
    const length = ImageSliderData.length

    if (!Array.isArray(ImageSliderData) || length < 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    return (
        <div>
            <section className="slider">
                <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
                <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
                {ImageSliderData.map((slide, index) => {
                    return (
                        <div className = {index === current ? 'slide active' : 'slide'} key={index}>
                            {index === current && (
                                <div className = "card shadow p-1" style = {{width: "20rem"}}>
                                    <img src={slide.image} alt='pet image' className='card-img-top image mx-auto' />
                                    <div className = "card-body">
                                        <h5 className="card-title">Buddy</h5>
                                        <p className="card-text"> Here is test text</p>
                                        <a href="#" className="btn btn-sm btn-primary">Meet Buddy</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </section>
        </div>
    )
}

export default ImageSlider;