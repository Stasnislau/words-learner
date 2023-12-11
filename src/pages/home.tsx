import React, { useEffect, useState } from 'react';
import styles from '../styles';


const HomePage = () => {
    return (
        <div className='w-full h-full py-20'>
            <div className=" flex justify-center items-center">
                <h1 className="text-7xl">Home</h1>
            </div>
            <div className=" flex justify-center items-center">
                <h1 className={`${styles.secondaryFunnyText} text-4xl`}>Ready to learn some french today?:)</h1>
            </div>
            <button className={`${styles.purpleButton}`} onClick={
                () => {
                    window.location.href = "/game";
                }
            }>
                Start
            </button>
        </div>
    );
};

export default HomePage;
