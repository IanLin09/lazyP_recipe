import React from 'react';
import Modal from './Modal.jsx'


const Picture = ({
    isOpen,
    onCloseModal
}) => {

    const modalStyle = "container bg-black rounded-md max-h-128 md:w-6/12";

    return (
        <div>
            <Modal windowBar={false} isOpen={isOpen} onClose={() => onCloseModal("picture")} modalStyle={modalStyle}>
                <div className="bg-gray-700 px-4 py-2 flex items-center rounded-md relative">
                        <div className="flex space-x-2 absolute left-4">
                            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => onCloseModal("picture")}></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></div>
                        </div>
                        <div className="flex-1 text-gray-300 text-sm text-center">
                            Me
                        </div> 
                </div>
                <div className="flex items-center justify-center">
                    <img
                        src="https://res.cloudinary.com/dsftikc0a/image/upload/v1737512626/profolio/fzhc9dfsta89gkjmcf7p.jpg"
                        alt="Me"
                        className="w-80 object-contain z-10"
                    />
                </div>
            </Modal>

        </div>
    );
}

export default Picture;