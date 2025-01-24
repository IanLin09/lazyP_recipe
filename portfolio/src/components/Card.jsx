import React from 'react';


const Card = ({ imagePath, children }) => {
    return (
        <div className="h-80 mx-auto bg-yellow-200 shadow-xl my-3">
            <div className="w-40 md:w-60 lg:w-64 xl:w-76 max-w-md mx-auto items-center">

                <div className="pt-2 flex items-center justify-center md:shrink-0">
                    <img
                        className="h-full w-24 object-cover md:w-36 lg:w-40 xl:w-36"
                        src={imagePath}
                        alt="Project thumbnail"
                    />
                </div>
                <div className="p-3 flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Card