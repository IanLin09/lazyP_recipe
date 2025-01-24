import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import Card from './Card.jsx';

const TechBadge = ({ text, color }) => {
    const colorClasses = {
        blue: 'text-xs md:text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-sky-600 bg-sky-200 uppercase last:mr-0 mr-1',
        emerald: 'text-xs md:text-xs  font-semibold inline-block py-1 px-2 uppercase rounded text-emerald-600 bg-emerald-200 uppercase last:mr-0 mr-1',
        indigo: 'text-xs md:text-xs  font-semibold inline-block py-1 px-2 uppercase rounded text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1',
        orange: 'text-xs md:text-xs  font-semibold inline-block py-1 px-2 uppercase rounded text-orange-600 bg-orange-200 uppercase last:mr-0 mr-1',
    };

    return (
        <span className={`
        ${colorClasses[color]}
      `}>
            {text}
        </span>
    );
};

const Stickies = ({
    isOpen,
    onCloseModal
}) => {
    const modalStyle = "bg-dgray max-h-[calc(100%-8rem)] w-10/12 rounded-md ";

    return (
        <div>
            <Modal isOpen={isOpen} onClose={() => onCloseModal("note")} modalStyle={modalStyle}>                    
                <div className='h-[calc(100%-1.5rem)] flex-1 flex flex-nowrap flex-row'>
                    <div className='hidden sm:block w-24 md:w-40 h-100% bg-gray-800 basic-1/5'>
                        <div className='pl-2 text-xs text-gray-400'>Yesterday</div>
                        <div className="m-1 bg-[#d6b11c] text-white font-bold py-2 px-4 rounded min-h-16">Project</div>
                    </div>
                    <div className='z-index-20 pt-1 flex-grow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 flex-1 overflow-y-auto'>
                        <Card imagePath="/images/car.jpg">
                            <div class="basis-1/5">
                                <p className="uppercase tracking-wide text-xs md:text-sm text-indigo-500 font-semibold">
                                    data analysis
                                </p>
                            </div>
                            <div class="basis-1/5">
                                <p className="mt-4 text-xs lg:text-sm text-slate-500">
                                    "A Designed match system based on performence of the driver"
                                </p>
                            </div>

                            <div className="basis-2/4 mt-5 flex flex-wrap gap-2">
                                <TechBadge text="Go" color="blue" />
                                <TechBadge text="mongodb" color="emerald" />
                                <TechBadge text="Mysql" color="orange" />
                            </div>
                            <div className="basis-1/4 mt-5">
                                <a href="">Repo</a>
                            </div>

                        </Card>

                        <Card imagePath="/images/car.jpg">
                            <div class="basis-1/4">
                                <p className="uppercase tracking-wide text-xs md:text-sm text-indigo-500 font-semibold">
                                    Receipe
                                </p>
                            </div>
                            <div class="basis-1/4">
                                <p className="mt-4 text-xs lg:text-sm text-slate-500">
                                    "A match system based on performence of the driver"
                                </p>
                            </div>

                            {/* star */}
                            <div className="basis-2/4 mt-4 flex items-center flex-wrap gap-2">
                                <TechBadge text="Express" color="blue" />
                                <TechBadge text="Laravel" color="indigo" />
                                <TechBadge text="Mysql" color="orange" />
                            </div>

                        </Card>
                        
                        <Card imagePath="/images/car.jpg">
                            <div class="basis-1/4">
                                <p className="uppercase tracking-wide text-xs md:text-sm text-indigo-500 font-semibold">
                                    Portfolio website
                                </p>
                            </div>
                            <div class="basis-1/4">
                                <p className="mt-4 text-xs lg:text-sm text-slate-500">
                                    "A MACOS-like website, which You're watching right now"
                                </p>
                            </div>

                            {/* star */}
                            <div className="basis-1/4 mt-4 flex items-center flex-wrap gap-2">
                                <TechBadge text="React" color="blue" />
                                <TechBadge text="Tailwind" color="indigo" />
                            </div>
                            <div className="basis-1/4 mt-5">
                                <a href="">Repo</a>
                            </div>
                        </Card>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Stickies;