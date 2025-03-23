"use client";

import React from 'react';

const projects = [
    {
        id: 1,
        title: "E-Commerce Website",
        domain: "Web Development",
        location: "Pccoer Ravet",
        description: "A full-stack e-commerce website with authentication and payment integration. Users can browse products, add them to a cart, and securely complete purchases using various payment methods. The platform features an admin panel for managing inventory, orders, and user accounts, along with search and filtering capabilities for an enhanced shopping experienceA full-stack e-commerce website with authentication and payment integration. Users can browse products, add them to a cart, and securely complete purchases using various payment methods. The platform features A full-stack e-commerce website with authentication and payment integration. Users can browse products, add them to a cart, and securely complete purchases using various payment methods. The platform features an admin panel for managing inventory, orders, and user accounts, along with search and filtering capabilities for an enhanced shopping experienceA full-stack e-commerce website with authentication and payment integration. Users can browse products, add them to a cart, and securely complete purchases using various payment methods. The platform features A full-stack e-commerce website with authentication and payment integration. Users can browse products, add them to a cart, and securely complete purchases using various payment methods. The platform features an admin panel for managing inventory, orders, and user accounts, along with search and filtering capabilities for an enhanced shopping experienceA full-stack e-commerce website with authentication and payment integration. Users can browse products, add them to a cart, and securely complete purchases using various payment methods. The platform features "
    },
    {
        id: 2,
        title: "AI Chatbot",
        domain: "Machine Learning",
        location: "MIT Pune",
        description: "A chatbot powered by AI to assist with customer queries and automate responses. It uses NLP to understand user intent, providing instant and accurate replies. The chatbot integrates with multiple platforms like websites and messaging apps, helping businesses reduce response time and improve customer engagement through continuous learning and smart recommendations."
    },
    {
        id: 3,
        title: "IoT Smart Home",
        domain: "Internet of Things",
        location: "COEP Pune",
        description: "An IoT-based smart home system to control and monitor devices remotely. It enables users to automate lighting, security cameras, and appliances using a mobile app. With real-time data analytics and voice assistant integration, the system enhances convenience, energy efficiency, and security while allowing remote access and control from anywhere in the world."
    }
];


const ProjectList = () => {
    return (
        <div className='left-[22%] p-5 min-h-screen relative w-[78%] bg-[#eaeaea]'>
            {projects.map((project) => (
                <div key={project.id} className='w-full max-h-[35%] py-5 mb-5 rounded-lg shadow-md px-14 bg-white'>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-center items-center'>
                            <div className='w-32'>
                                <img src="https://tse3.mm.bing.net/th?id=OIP.WIKYUNT7KKlsD20wAulqgwHaEK&pid=Api&P=0&h=180" alt="Project" />
                            </div>
                            <div className='py-4 px-8'>
                                <div className='text-3xl'>{project.title}</div>
                                <div className='flex text-sm py-2 gap-5'>
                                    <div>
                                        Domains : <span className='text-[#c0c0c0]'>{project.domain}</span>
                                    </div>
                                    <div className='text-[#c0c0c0]'>
                                        {project.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <div>share</div>
                            <div>bookmark</div>
                        </div>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    <div >
                        <div>Discription:</div>
                        <p className='text-[#7b7a7a] overflow-clip px-4 max-h-[120px]'>
                            {project.description}
                        </p>
                        <button className='text-[#014aad] py-1 px-4 border rounded-md border-gray-200 mt-4'>
                            Learn More
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectList;