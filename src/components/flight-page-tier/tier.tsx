import { Dispatch, SetStateAction } from "react"

const Tier = (
    {
        chuyenBayDi,
        chuyenBayVe,
        chuyenDiFareOptions,
        chuyenVeFareOptions,
        setChuyenDiFareOptions,
        setChuyenVeFareOptions
    }:{
        chuyenBayDi: any,
        chuyenBayVe: any,
        chuyenDiFareOptions: number,
        chuyenVeFareOptions: number,
        setChuyenDiFareOptions: Dispatch<SetStateAction<any>>,
        setChuyenVeFareOptions: Dispatch<SetStateAction<any>>,
    }) => {

    return (
            <div className="col-span-1 shadow-md rounded-md p-2 box-border border border-gray-100">
                <div className="p-2 rounded bg-gray-100">
                    <h2 className="mb-2">Chuyến bay đi:</h2>
                    {chuyenBayDi?.fareOptions?.map((item: any, index:number) => (
                        <div key={index} className="mb-4">
                            <div className="flex justify-between items-center text-sm text-gray-700 font-semibold">
                                {`${item.cabinClass.description} - ${item.fareClass.description}`}
                                <input
                                    type="radio"
                                    name="đi"
                                    value={index}
                                    onChange={() => setChuyenDiFareOptions(index)}
                                    />
                            </div>
                        </div>
                    ))}
                </div>
                {chuyenBayVe ? 
                    <div className="p-2 rounded bg-gray-100 mt-4">
                        <h2 className="mb-2">Chuyến bay về:</h2>
                        {chuyenBayVe?.fareOptions?.map((item: any, index:number) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between items-center text-sm text-gray-700 font-semibold">
                                    {`${item.cabinClass.description} - ${item.fareClass.description}`}
                                    <input
                                        type="radio"
                                        name="về"
                                        value={index}
                                        onChange={() => setChuyenVeFareOptions(index)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                : 
                    <></>
                }
                
            </div>
    )
}

export default Tier 