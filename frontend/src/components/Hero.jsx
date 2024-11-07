import React from 'react';
import bg from '../assets/bg.jpg';
import hero from '../assets/hero.jpg'
import AboutUs from './AboutUs';
import { useContext } from 'react';
import { MyContext } from "../MyContext";

const Hero = () => {

    const { isLoggedIn, isAdmin } = useContext(MyContext);
    return (
        <>
            <div className="flex justify-center items-center h-24 bg-gray-100">
                <div className="text-center p-6 bg-white shadow-xl rounded-lg">
                    {isLoggedIn && isAdmin ? (
                        <h1 className="text-4xl font-bold text-blue-600">Welcome Admin!</h1>
                    ) : isLoggedIn ? (
                        <h1 className="text-4xl font-bold text-green-600">Welcome User!</h1>
                    ) : (
                        <h1 className="text-4xl font-bold text-gray-500">Please Log In</h1>
                    )}
                </div>
            </div>
            <section
                className="relative flex items-center justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${bg})` }}
            >


                <div className="absolute inset-0 "></div>


                <div className="relative z-10 flex flex-wrap items-center bg-opacity-70 bg-black justify-center w-full max-w-6xl mx-auto px-6 lg:px-12 py-12">

                    <div className="w-full lg:w-1/2 text-white">
                        <h1 className="text-4xl font-bold mb-4">Welcome to the Best Sports Store</h1>
                        <p className="text-lg">
                            Discover top-quality sports gear and apparel crafted for performance and style. From running shoes to gym
                            equipment, we have everything you need to fuel your passion for fitness and sports. Explore our selection and
                            elevate your game today.
                        </p>
                    </div>


                    <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center lg:justify-end">
                        <img
                            src={hero}
                            alt="Sports Gear"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>
            <AboutUs />
        </>
    );
};

export default Hero;
