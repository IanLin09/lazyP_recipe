import Modal from './Modal.jsx'


const Contact = ({
    isOpen,
    onCloseModal
}) => {
    const modalStyle = "bg-gray-900 bg-opacity-95 max-h-[calc(100%-8rem)] w-8/12 rounded-md ";

    return (
        <div>
            <Modal windowBar={false} isOpen={isOpen} onClose={() => onCloseModal("contact")} modalStyle={modalStyle}>                    
                <div className='flex h-screen'>
                    <div className='basis-1/5 h-90'>
                        <div className="pl-4 my-2 flex-shrink-0 flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={()=>onCloseModal("contact")}></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"></div>
                        </div>
                        <div className='hidden sm:block w-24 md:w-40 h-100% '>
                            <div className="m-1 text-sm text-white py-2 px-4 rounded bg-gray-600">All Contacts</div>
                        </div>
                    </div>
                    <div className='pt-6 pl-2 text-white basis-4/5 bg-while flex flex-col'>
                        <div className='w-full my-3'>
                            <div className='text-gray-500'>Email</div>
                            <hr className='border-gray-500'/>
                            <ui className="list-none">
                                <li className='cursor-pointer'>ianlin5190@gmail.com</li>
                                <li className='cursor-pointer'>j135246789@gmail.com</li>
                            </ui>
                        </div>
                        <div className='w-full my-3'>
                            <div className='text-gray-500'>G</div>
                            <hr className='border-gray-500'/>
                            <a className='underline' target='_blink' href="https://github.com/IanLin09">Github</a>
                            
                        </div>
                        <div className='w-full my-3'>
                            <div className='text-gray-500'>L</div>
                            <hr className='border-gray-500'/>
                            <a className='underline' target='_blink' href="https://www.linkedin.com/in/ian-lin-208b34246/">Linkin</a>
                        </div>
                        
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Contact