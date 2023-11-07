import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import image1 from '../../images/image-1.webp';
import image2 from '../../images/image-2.webp';
import image3 from '../../images/image-3.webp';
import image4 from '../../images/image-4.webp';
import image5 from '../../images/image-5.webp';
import image6 from '../../images/image-6.webp';
import image7 from '../../images/image-7.webp';
import image8 from '../../images/image-8.webp';
import image9 from '../../images/image-9.webp';
import image10 from '../../images/image-10.jpeg';
import image11 from '../../images/image-11.jpeg';
import imageicon from '../../images/image-icon.png'

//Image checkbox and drag drop functionalities
const DraggableImage = ({ index, image, onDrop, onClickCheckbox }) => {
    const [, ref] = useDrag({
        type: 'IMAGE',
        item: { index, type: 'IMAGE' }
    });

    const [, drop] = useDrop({
        accept: 'IMAGE',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                onDrop(draggedItem.index, index);
                draggedItem.index = index;
            }
        }
    });
    
    //toggling checkbox and hover status
    const [isChecked, setIsChecked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onClickCheckbox(index); 
    };

    return (
        // draggable and checkbox
        <div
            ref={(node) => ref(drop(node))}
            className="draggable-image relative group border border-gray-300 rounded-lg overflow-hidden mb-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-white transition-colors duration-300 group-hover:bg-transparent rounded-lg">
                <img src={image} alt={`Image ${index+1}`} className="w-full" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="absolute top-2 left-2">
                <label className="cursor-pointer relative">
                    <input
                        type="checkbox"
                        className={`form-checkbox h-5 w-5 text-blue-600 ${isHovered ? '' : 'hidden'}`}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                </label>
            </div>
        </div>
    );
};



const Images = () => {
    const allImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11];

    const [clickImages, setClickImages] = useState([]);
    const [images, setImages] = useState(allImages);

    const handleCheckboxClick = (index) => {
        const updatedClickImages = [...clickImages];
        if (updatedClickImages.includes(index)) {
            updatedClickImages.splice(updatedClickImages.indexOf(index), 1);
        } else {
            updatedClickImages.push(index);
        }
        setClickImages(updatedClickImages);
    };

    const handleDeleteImages = () => {
    const updatedImages = allImages.filter((_, index) => !clickImages.includes(index));
    setImages(updatedImages);
    setClickImages([]);
    };

    const handleDrop = (fromIndex, toIndex) => {
        const updatedImages = [...images];
        const [draggedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, draggedImage);
        setImages(updatedImages);
      };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='flex flex-col sm:flex-row justify-between'>
                <div className='mt-4 sm:mt-10 ml-4 sm:ml-12 text-2xl font-bold'>Total selected items: {clickImages.length}</div>
                <div className="mt-4 sm:mt-10 mr-4 sm:mr-10">
                    <button onClick={handleDeleteImages} className="btn text-xl">Delete Items</button>
                </div>
            </div>
            {/* Image containers */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-10">
                    {images.map((image, index) => (
                        <div key={index} className="col-span-1">
                            <DraggableImage index={index} image={image} onDrop={handleDrop} onClickCheckbox={handleCheckboxClick} />
                        </div>
                    ))}
                    {/* Add Images */}
                    <div className="col-span-1 row-span-1 flex flex-col justify-center items-center" style={{ border: '1px dotted gray', borderRadius: '15px', overflow: 'hidden' }}>
                        <label htmlFor="file-upload" className="block text-xl font-bold text-gray-800 mb-2">
                            <img src={imageicon} alt="" className="mx-auto w-6 h-6" />
                            Add Images
                        </label>
                        <input id="file-upload" type="file" accept="image/*" multiple className="hidden" />
                    </div>
                </div>
            </div>
        </DndProvider>


    );
};

export default Images;
