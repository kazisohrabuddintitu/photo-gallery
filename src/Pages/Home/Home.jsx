import React from 'react';
import Images from '../../Component/Images/Images';
// import HomeImages from '../../Component/HomeImages/HomeImages';

const Home = () => {
    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-blue-500 p-4">
                    <h1 className="text-white text-2xl font-semibold">Image Gallery</h1>
                </header>
                <main>
                    <Images></Images>
                    {/* <HomeImages></HomeImages> */}
                </main>
            </div>

        </>
    );

};

export default Home;