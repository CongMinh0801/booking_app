

import { RootState } from "@/app/GlobalRedux/store";
import { useSelector } from "react-redux";

const FlightInfo = (
    {
        flightData,
        fareOption
    }:{
        flightData:any,
        fareOption: number
    }) => {

    const thoiGianBay = (start:string, end:string) => {
        const startTime:Date = new Date(start);
        const endTime:Date = new Date(end);

        const timeDifference = endTime.getTime() - startTime.getTime();

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return `${hours}h${minutes}m`
    }

    const nguoiLon = useSelector((state: RootState) => state.passenger.nguoiLon)
    const treEm = useSelector((state: RootState) => state.passenger.treEm)
    const emBe = useSelector((state: RootState) => state.passenger.emBe)

    return (
        <>
            {flightData ? 
                <>
                    <div className="bg-gray-100 p-2 rounded-md flex">
                        <div>
                            <h2 className="flex items-center text-sm font-bold w-full text-blue-500">
                                <span>
                                    {`${flightData?.flights[0]?.departure.airportName} (${flightData?.flights[0]?.departure.airportCode})`}
                                </span>
                                <div className="mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                                <span>
                                    {`${flightData?.flights[0]?.arrival.airportName} (${flightData?.flights[0]?.arrival.airportCode})`}
                                </span>
                            </h2>
                            <h2 className="flex mt-2 items-center text-sm font-medium w-full text-gray-600">
                                <span>Vietjet Air</span>
                                <span className="ml-3">{`${flightData?.flights[0]?.airlineCode}${flightData?.flights[0]?.flightNumber}`}</span>
                            </h2>
                            <h2 className="flex mt-2 items-center text-sm font-medium w-full text-gray-600">
                                <span>Máy bay</span>
                                <span className="ml-3">Airbus {flightData?.flights[0]?.aircraftModel.name}</span>
                            </h2>
                        </div>
                        <div className="ml-10 text-sm">
                            <ul className="flex justify-between items-center">
                                <li className="font-semibold">{flightData?.flights[0]?.departure.localScheduledTime.split(" ")[1].slice(0,5)}</li>
                                <li className="mx-6 text-xs text-gray-600 border-b border-gray-500">{thoiGianBay(flightData?.flights[0]?.departure.localScheduledTime, flightData?.flights[0]?.arrival.localScheduledTime)}</li>
                                <li className="font-semibold">{flightData?.flights[0]?.arrival.localScheduledTime.split(" ")[1].slice(0,5)}</li>
                            </ul>
                            <ul className="flex justify-between items-center">
                                <li className="text-gray-600">{flightData?.flights[0]?.departure.airportCode}</li>
                                <li className="mx-6 text-xs text-gray-600 ">Bay thẳng</li>
                                <li className="text-gray-600">{flightData?.flights[0]?.arrival.airportCode}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-2 rounded-md flex mt-2">
                        <div className="w-full">
                            <p className="text-gray-800 text-sm font-bold">Chi tiết giá</p>
                            <div className="bg-white mt-2 p-2 shadow-sm border border-gray-100 rounded-md font-semibold">
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <div className="text-sm text-gray-500">
                                        <p className="text-start mb-2">{`Vé người lớn (x${nguoiLon})`}</p>
                                        {true ? <p className="text-start mb-2">{`Vé trẻ em (x${treEm})`}</p> : <p></p>}
                                        {true ? <p className="text-start mb-2">{`Vé em bé (x${emBe})`}</p> : <p></p>}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <p className="text-end mb-2">{(flightData?.fareOptions[fareOption].priceAdult * nguoiLon)?.toLocaleString('en-US') + " VND"}</p>
                                        {true ? <p className="text-end mb-2">{(flightData?.fareOptions[fareOption].priceChild * treEm)?.toLocaleString('en-US') + " VND"}</p> : <p></p>}
                                        {true ? <p className="text-end mb-2">{(flightData?.fareOptions[fareOption].priceInfant * emBe)?.toLocaleString('en-US') + " VND"}</p> : <p></p>}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm mt-2">
                                    <p className="text-start text-gray-500">Tổng</p>
                                    <p className="text-end text-base text-gray-800">
                                        {(flightData?.fareOptions[fareOption].priceAdult * nguoiLon + flightData?.fareOptions[fareOption].priceChild * treEm + flightData?.fareOptions[fareOption].priceInfant * emBe)?.toLocaleString('en-US') + " VND"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            : 
                <>
                    <div className="bg-gray-100 p-2 rounded-md flex animate-pulse">
                        <div>
                            <h2 className="flex items-center text-sm font-bold w-full text-gray-400">
                                <span className="w-2/3 h-4 bg-gray-300 rounded"></span>
                                <div className="mx-2">
                                    <div className="w-96 h-6 bg-gray-300 rounded"></div>
                                </div>
                                <span className="w-2/3 h-4 bg-gray-300 rounded"></span>
                            </h2>
                            <h2 className="flex mt-2 items-center text-sm font-medium w-full text-gray-400">
                                <span className="w-1/2 h-4 bg-gray-300 rounded"></span>
                                <span className="ml-3 w-1/2 h-4 bg-gray-300 rounded"></span>
                            </h2>
                            <h2 className="flex mt-2 items-center text-sm font-medium w-full text-gray-400">
                                <span className="w-1/2 h-4 bg-gray-300 rounded"></span>
                                <span className="ml-3 w-1/2 h-4 bg-gray-300 rounded"></span>
                            </h2>
                        </div>
                        <div className="ml-10 text-sm">
                            <ul className="flex justify-between items-center">
                                <li className="font-semibold w-1/3 h-4 bg-gray-300 rounded"></li>
                                <li className="mx-6 text-xs text-gray-400 border-b border-gray-300 w-1/3 h-4 bg-gray-300 rounded"></li>
                                <li className="font-semibold w-1/3 h-4 bg-gray-300 rounded"></li>
                            </ul>
                            <ul className="flex justify-between items-center">
                                <li className="text-gray-400 w-1/3 h-4 bg-gray-300 rounded"></li>
                                <li className="mx-6 text-xs text-gray-400 w-1/3 h-4 bg-gray-300 rounded"></li>
                                <li className="text-gray-400 w-1/3 h-4 bg-gray-300 rounded"></li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-2 rounded-md flex mt-2 animate-pulse">
                        <div className="w-full">
                            <p className="text-gray-400 text-sm font-bold">Chi tiết giá</p>
                            <div className="bg-gray-200 mt-2 p-2 shadow-sm border border-gray-100 rounded-md font-semibold">
                                <div className="flex justify-between border-b border-gray-200 pb-2">
                                    <div className="text-sm text-gray-300">
                                        <p className="text-start mb-2 w-1/2 h-4 bg-gray-300 rounded"></p>
                                    </div>
                                    <div className="text-sm text-gray-300">
                                        <p className="text-end mb-2 w-1/2 h-4 bg-gray-300 rounded"></p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm mt-2">
                                    <p className="text-start text-gray-300 w-1/2 h-4 bg-gray-300 rounded"></p>
                                    <p className="text-end text-base text-gray-400 w-1/2 h-4 bg-gray-300 rounded"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }

        
        </>
    )
}

export default FlightInfo