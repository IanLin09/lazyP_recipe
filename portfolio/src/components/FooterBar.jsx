import React from 'react';

const Footer = ({ onOpenModal }) => {

    const workIcons = [
        { path: "/images/terminal.svg", alt: "terminal", text: "Terminal" },
        { path: "/images/picture.svg", alt: "picture", text: "Picture" },
        { path: "/images/calendar.svg", alt: "calendar", text: "Calendar" },
        { path: "/images/stickies.png", alt: "note", text: "Stickies" },
        { path: "/images/book.png", alt: "contact", text: "Contact" },

    ]

    const icons = [
        { path: "/images/dockerIcon.svg", alt: "Docker", text: "Docker" },
        { path: "/images/sourcetree.svg", alt: "Sourcetree", text: "Sourcetree" },
        { path: "/images/postman.svg", alt: "Postman", text: "Postman" },
    ];

    return (
        <footer>
            <div className="fixed absolute left-1/2 -translate-x-1/2 bottom-0 bg-gray-400 bg-opacity-50 px-4 mb-4 py-2 flex justify-center items-center w-80 rounded-lg space-x-4">

                {workIcons.map((icon, index) => (
                    <div key={index} className="relative group">
                        <img onClick={() => onOpenModal(icon.alt)} src={icon.path} alt={icon.alt} className="w-10 cursor-pointer" />
                        <div className="bubble-text">{icon.text}</div>
                    </div>
                ))}

                {icons.map((icon, index) => (
                    <div key={index} className="relative group">
                        <img src={icon.path} alt={icon.alt} className="w-10 cursor-pointer" />
                        <div className="bubble-text">{icon.text}</div>
                    </div>
                ))}
            </div>
        </footer>
    );
};

export default Footer