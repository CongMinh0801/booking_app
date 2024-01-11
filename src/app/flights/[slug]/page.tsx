'use client'

import FligtPageDetail from "@/components/flight-page-detail/detail"
import Tier from "@/components/flight-page-tier/tier"
import { RootState } from "@/app/GlobalRedux/store"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios"

const FligtPage = () => {
    const chuyenBayDi = useSelector((state: RootState) => state.flights.chuyenBayDi)
    const chuyenBayVe = useSelector((state: RootState) => state.flights.chuyenBayVe)
    const [chuyenDiFareOptions, setChuyenDiFareOptions] = useState<number>(0)
    const [chuyenVeFareOptions, setChuyenVeFareOptions] = useState<number>(0)

    return (
        <div className="mt-36 w-full xl:max-w-screen-xl grid grid-cols-3 gap-10">
            <FligtPageDetail 
            chuyenBayDi={chuyenBayDi} 
            chuyenBayVe={chuyenBayVe} 
            chuyenDiFareOptions={chuyenDiFareOptions} 
            chuyenVeFareOptions={chuyenVeFareOptions}
            />

            <Tier 
            chuyenBayDi={chuyenBayDi} 
            chuyenBayVe={chuyenBayVe} 
            chuyenDiFareOptions={chuyenDiFareOptions} 
            chuyenVeFareOptions={chuyenVeFareOptions}
            setChuyenDiFareOptions={setChuyenDiFareOptions}
            setChuyenVeFareOptions={setChuyenVeFareOptions}
            />
        </div>
    )
}

export default FligtPage 