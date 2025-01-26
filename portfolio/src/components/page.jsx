import React from 'react';
import Footer from "./FooterBar.jsx";
import Terminal from "./Terminal.jsx";
import Picture from './Picture.jsx';
import Calendar from "./Calendar.jsx";
import Note from "./Note.jsx";
import Contact from './Contact.jsx';

const Page = () => {

    const [modals, setModals] = React.useState({
        calendar: { isOpen: false },
        contact: { isOpen: false },
        terminal: { isOpen: true },
        picture: { isOpen: false },
        note: { isOpen: false },
    });

    const handleOpenModal = (id) => {
        setModals((prevModals) => ({
            ...prevModals,
            [id]: { isOpen: true },
        }));
    };

    const handleCloseModal = (id) => {
        setModals((prevModals) => ({
            ...prevModals,
            [id]: { isOpen: false },
        }));
    };

    const termicalIsOpen = modals.terminal.isOpen;
    const pictureIsOpen = modals.picture.isOpen;
    const calendarIsOpen = modals.calendar.isOpen;
    const noteIsOpen = modals.note.isOpen;

    return (
        <div className='flex flex-col h-screen'>
            <div className="flex-grow bg-cover bg-[url('https://res.cloudinary.com/dsftikc0a/image/upload/v1737539324/profolio/nqv52c7mdoeulfe4gsrs.jpg')]">
                <Terminal isOpen={termicalIsOpen} onCloseModal={handleCloseModal} />
                <Picture isOpen={pictureIsOpen} onCloseModal={handleCloseModal} />
                <Calendar isOpen={calendarIsOpen} onCloseModal={handleCloseModal} />
                <Note isOpen={noteIsOpen} onCloseModal={handleCloseModal} />
                <Contact isOpen={modals.contact.isOpen} onCloseModal={handleCloseModal}/>
            </div>

            <Footer onOpenModal={handleOpenModal} />
        </div>
    );
};

export default Page