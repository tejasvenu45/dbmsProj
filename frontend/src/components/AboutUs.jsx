
import React from 'react';
import bg from '../assets/bg.jpg';

const testimonials = [
    {
        name: "Tejas Venugopalan",
        feedback:
            "I love the quality of their products. The performance and durability are unmatched. Highly recommend for any sports enthusiast!",
    },
    {
        name: "Adarash nayak",
        feedback:
            "A fantastic store with a wide range of sports gear. They have everything I need, from shoes to accessories, all in one place!",
    },
    {
        name: "Suraj SilicoFlare",
        feedback:
            "Excellent customer service and top-notch products. I've never been disappointed with a purchase from this store.",
    },
];

const AboutUs = () => {
    return (
        <section
            className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center py-16"
            style={{ backgroundImage: `url(${bg})` }}
        >
        
            <div className="absolute inset-0 "></div>

            
            <div className="relative bg-black bg-opacity-50 py-20 z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 text-center text-white">
                <h1 className="text-4xl font-bold mb-8">We are the Best Sports Brand Across All Categories</h1>
                <p className="text-lg mb-12">
                    Our commitment to quality and excellence has made us a top choice for athletes and fitness enthusiasts worldwide. From
                    high-performance gear to everyday essentials, we deliver the best products to help you succeed in every sport.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-1/2 lg:w-1/3 bg-white bg-opacity-10 p-6 rounded-lg shadow-lg text-left text-white"
                        >
                            <p className="italic mb-4">"{testimonial.feedback}"</p>
                            <p className="font-bold text-lg">- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
