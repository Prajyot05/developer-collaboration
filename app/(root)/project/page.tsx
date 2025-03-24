"use client";

import React from 'react'
import ProjectList from './ProjectList';
import Sidebar1 from './Sidebar1';

const page = () => {
    return (
        <div className='flex w-full h-full'>
            <Sidebar1 />
            <ProjectList />
        </div>
    )
}

export default page
