
const Modal = ({ windowBar = true, isOpen, onClose, modalStyle, children }) => {

    const handleOverlayClick = (e) => {

        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div >
            <div
                className="fixed top-10 bottom-80 left-0 w-full h-full flex justify-center"
                onClick={handleOverlayClick}
            >
                <div
                    className={modalStyle}
                >
                    {windowBar && (
                    <div className="bg-gray-700 px-4 py-2 flex items-center rounded-md">
                        <div className="bg-gray-700 h-2 flex-shrink-0 flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={handleOverlayClick}></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></div>
                        </div>
                    </div>)}
                    {children}
                </div>

            </div>

        </div>
    );
};

export default Modal