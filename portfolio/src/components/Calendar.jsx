import React from 'react';
import Modal from './Modal.jsx'
import TimeLine from './Timeline.jsx'


const Calendar = ({
    isOpen,
    onCloseModal
}) => {

    const modalStyle = "bg-dgray rounded-md w-8/12 max-h-[calc(100%-8rem)]";

    return (
        <div>

            <Modal isOpen={isOpen} onClose={() => onCloseModal("calendar")} modalStyle={modalStyle}>
                <div className="">
                    <div className="flex min-w-60 overflow-x-auto">
                        <TimeLine></TimeLine>
                    </div>

                </div>
            </Modal>

        </div>
    );
}

export default Calendar;