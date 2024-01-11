interface Props {
    sanBay: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const AirportList: React.FC<Props> = ({ sanBay, setValue }) => {
    return (
        <>
        <h3 className="mb-2 px-2">Thành phố hoặc sân bay phổ biến</h3>
            <ul className="max-h-96 overflow-y-auto">
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("D"))}>
                        Thành phố D<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
                <li className="p-2 hover:cursor-pointer text-gray-600 hover:bg-gray-200">
                    <button className="w-full text-start" onClick={()=>(setValue("A"))}>
                        Thành phố A<br/>
                        <span className="text-xs">
                            Sân bay B
                        </span>
                    </button>
                </li>
            </ul>
        </>
    )
}

export default AirportList