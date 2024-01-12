'use client'

import CardDetail from "./flight-choose-detail/detail"
import { Dispatch, SetStateAction } from 'react';
import { setChuyenBayDiState, setChuyenBayVeState } from "@/app/GlobalRedux/Features/flights/flightsSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useDispatch } from "react-redux";

const Card = (
    {
        khuHoi,
        ngayDi,
        ngayVe,
        sanBayDi,
        sanBayDen,
        chonChuyenDi,
        chonChuyenVe,
        chonChuyen,
        setChonChuyenDi,
        setChonChuyenVe,
        setChonChuyen,
        router,
    }:{
        khuHoi: boolean | null,
        ngayDi: string | null,
        ngayVe: string | null,
        sanBayDi: string | null,
        sanBayDen: string | null,
        chonChuyenDi: any,
        chonChuyenVe: any,
        chonChuyen: string,
        setChonChuyenDi: Dispatch<SetStateAction<any>>,
        setChonChuyenVe: Dispatch<SetStateAction<any>>,
        setChonChuyen: Dispatch<SetStateAction<string>>,
        router: AppRouterInstance,
    }) => {

    const dispatch = useDispatch()
    const formatNgayDi = (ngay: string | null) => {
        if (ngay === null) {
            return "Ngày không hợp lệ";
        }
    
        const listNgayDi = ngay.split("-")
        const thangTiengViet = ["Tháng Một","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Mười Hai"];
        return listNgayDi[2] + " " + thangTiengViet[parseInt(listNgayDi[1]) - 1] + " " + listNgayDi[0];
    }

    const xacNhanChon = () => {
        if(khuHoi) {
            if(chonChuyenDi && chonChuyenVe) {
                dispatch(setChuyenBayDiState(chonChuyenDi))
                dispatch(setChuyenBayVeState(chonChuyenVe))
                router.push(`/flights/booking`)
            } else {
                alert("Hãy chọn chuyến đi và chguyến về")
            }
            console.log('CÓ khứ hồi')
        } else {
            if(chonChuyenDi) {
                dispatch(setChuyenBayDiState(chonChuyenDi))
                router.push(`/flights/booking`)
            } else {
                alert("Hãy chọn chuyến bay")
            }
        }
    }

    return (
        <div className="w-full bg-white shadow-md box-border border border-gray-100 p-2 items-center text-base fixed bottom-0 left-0 border-t-2 md:border-none md:block">
            <div className="flex w-full justify-between">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    Chuyến bay
                </div>
                <p className="">{khuHoi ? "Khứ hồi" : "Một chiều"}</p>
            </div>
            <div className={`w-full mt-2 ${chonChuyen !== "Chuyến đi" ? "grayscale py-2" : "rounded py-2"} cursor-pointer transition-all`}>
                <button onClick={()=>setChonChuyen("Chuyến đi")} className="flex justify-start border-l-4 border-blue-400">
                    <div className="ml-2">
                        <div className="py-2 px-4 bg-blue-500 rounded-md flex justify-center items-center text-white font-bold">
                            1
                        </div>
                    </div>
                    <div className="ml-4">
                        <p className="text-xs h-1/2 text-gray-500">{formatNgayDi(ngayDi)}</p>
                        <p className="text-xs h-1/2 font-semibold text-gray-800 text-start">{`${sanBayDi} → ${sanBayDen}`}</p>
                    </div>
                </button>
                {
                    chonChuyenDi ? <CardDetail chuyenBay={chonChuyenDi}/> : <div></div>
                }
            </div>
            {khuHoi ? 
            <div className={`w-full mt-2 ${chonChuyen !== "Chuyến về" ? "grayscale py-2" : "rounded py-2"} cursor-pointer transition-all`}>
                    <button onClick={()=>setChonChuyen("Chuyến về")} className="flex justify-start border-l-4 border-blue-400">
                        <div className="ml-2">
                            <div className="py-2 px-4 bg-blue-500 rounded-md flex justify-center items-center text-white font-bold">
                                2
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-xs h-1/2 text-gray-500">{formatNgayDi(ngayVe)}</p>
                            <p className="text-xs h-1/2 font-semibold text-gray-800 text-start">{`${sanBayDen} → ${sanBayDi}`}</p>
                        </div>
                    </button>
                    {
                        chonChuyenVe ? <CardDetail chuyenBay={chonChuyenVe}/> : <div></div>
                    }
                </div>
            : <div></div>}
            <div className="mt-4 flex justify-center">
                <button onClick={xacNhanChon} className="w-4/12 py-2 bg-blue-500 hover:bg-blue-400 rounded-md text-white font-semibold">
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default Card 