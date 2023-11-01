import React, { useState } from 'react';
import image1 from '../../../public/images/image-1.webp';
import image2 from '../../../public/images/image-2.webp';
import image3 from '../../../public/images/image-3.webp';
import image4 from '../../../public/images/image-4.webp';
import image5 from '../../../public/images/image-5.webp';
import image6 from '../../../public/images/image-6.webp';
import image7 from '../../../public/images/image-7.webp';
import image8 from '../../../public/images/image-8.webp';
import image9 from '../../../public/images/image-9.webp';
import image10 from '../../../public/images/image-10.jpeg';
import image11 from '../../../public/images/image-11.jpeg';


const Images = () => {
    const allImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

    const [clickImages, setClickImages] = useState([]);
    const [images, setImages] = useState([]);

    const handleImageClick = (index) => {
        const selectImages = clickImages.indexOf(index);

        if (selectImages === -1) { //cause counted index start from 0

            // images are not added,sothis selected items
            setClickImages([...clickImages, index]);
        }
        else {
            // image already selected, remove it from the selected items
            const updatedImages = [...clickImages];
            updatedImages.splice(selectImages, 1);
            setClickImages(updatedImages);
        }
    };

    const handleDeleteImages = () => {
        const updatedImages = allImages.filter((allImage, index) => !clickImages.includes(index));
        // Update state with the filter images
        setImages(updatedImages);

        // Clear the selected items
        setClickImages([]);
    };

    return (
        <>
            <div className='flex justify-between'>
                <div className='mt-10'>
                    <p className='ml-12 text-2xl font-bold'>Total selected items: {clickImages.length}</p>
                </div>
                <div className="mt-4 mr-10">
                    <button onClick={handleDeleteImages} className="btn text-xl">Delete Items</button>
                </div>
            </div>
            <div className="container mx-auto p-4 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    {allImages.map((allImage, index) => (
                        <div key={index} className={index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}>
                            <div className="relative">
                                <img src={allImage} alt={`Image ${index + 1}`} className="w-full h-auto cursor-pointer hover:scale-110 rounded-2xl" onClick={() => handleImageClick(index)} />
                                <div className="absolute top-5 right-5">
                                    <input type="checkbox" className="checkbox" checked={clickImages.includes(index)} onChange={() => handleImageClick(index)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Images;
