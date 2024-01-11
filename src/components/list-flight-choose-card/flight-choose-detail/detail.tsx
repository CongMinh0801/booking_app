
const CardDetail = ({
    chuyenBay,
}:{
    chuyenBay:any,
}) => {
    return (
        <div className="w-full mt-2 pt-2 border-t bg-white flex justify-between">
            <div>
                <div className="flex text-gray-500">
                    <p className="w-16 text-end">{chuyenBay?.flights[0]?.departure.localScheduledTime.split(" ")[1].slice(0,5)}</p>
                    <p className="w-8 flex justify-center">→</p>
                    <p className="w-16 text-start">{chuyenBay?.flights[0]?.arrival.localScheduledTime.split(" ")[1].slice(0,5)}</p>
                </div>
                <div className="flex text-gray-700">
                    <p className="w-16 text-end">{chuyenBay?.flights[0]?.departure.airportCode}</p>
                    <p className="w-8 flex justify-center"></p>
                    <p className="w-16 text-start">{chuyenBay?.flights[0]?.departure.airportCode}</p>
                </div>
            </div>
            <div className="h-full flex">
                <p className="text-orange-500">{`${chuyenBay?.fareOptions[0].priceAdult.toLocaleString('en-US')} VND`}</p>
            </div>
        </div>
    )
}

export default CardDetail 