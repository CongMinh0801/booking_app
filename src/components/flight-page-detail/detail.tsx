'use client'

import { useEffect, useMemo, useState } from "react"
import ContactInfo from "./contact-info/contact-info"
import FlightInfo from "./flight-info/flight-info"
import Passenger from "./passenger/passenger"
import { RootState } from "@/app/GlobalRedux/store"
import { useSelector } from "react-redux"
import axios from "axios"

interface HanhKhach {
    ho: string,
    ten: string,
    ngaySinh: string,
    gioiTinh: string,
    title: string,
    number: number,
    adult: boolean,
    child: boolean
}

const FligtPageDetail = (
    {
        chuyenBayDi,
        chuyenBayVe,
        chuyenDiFareOptions,
        chuyenVeFareOptions,
    }:{
        chuyenBayDi: any,
        chuyenBayVe: any,
        chuyenDiFareOptions: number,
        chuyenVeFareOptions: number,
    }) => {

    const [contactValue, setContactValue] = useState<any>()
    const [passenger, setPassenger] = useState<any>()
    const [infants, setInfants] = useState<any>()

    const nguoiLon = useSelector((state: RootState) => state.passenger.nguoiLon)
    const treEm = useSelector((state: RootState) => state.passenger.treEm)
    const emBe = useSelector((state: RootState) => state.passenger.emBe)

    const nguoiLonPassengersArray = Array.from({ length: nguoiLon }, (_, index) => index)
    const treEmPassengersArray = Array.from({ length: treEm }, (_, index) => index)
    const emBePassengersArray = Array.from({ length: emBe }, (_, index) => index)

    let giaChuyenBayDi = chuyenBayDi?.fareOptions[chuyenDiFareOptions].priceAdult * nguoiLon + chuyenBayDi?.fareOptions[0].priceChild * treEm + chuyenBayDi?.fareOptions[0].priceInfant * emBe
    let giaChuyenBayVe = chuyenBayVe?.fareOptions[chuyenVeFareOptions].priceAdult * nguoiLon + chuyenBayVe?.fareOptions[0].priceChild * treEm + chuyenBayVe?.fareOptions[0].priceInfant * emBe

    if(!giaChuyenBayVe) {
        giaChuyenBayVe = 0
    }

    const danhSachHanhKhach = useMemo(() => {
        const newDanhSachHanhKhach = [];
        for (let i = 0; i < nguoiLon + treEm; i++) {
          newDanhSachHanhKhach.push({
            ho: "",
            ten: "",
            ngaySinh: "",
            gioiTinh: "",
            title: "",
            number: 0,
            adult: false,
            child: false,
            infants: {
                ho: "",
                ten: "",
                ngaySinh: "",
                gioiTinh: "",
                title: "",
                number: 0,
                nguoiLon: 0,
            }
          });
        }
        return newDanhSachHanhKhach;
    }, [nguoiLon, treEm]);

    const danhSachEmBe = useMemo(() => {
        const newDanhSachEmBe = [];
        for (let i = 0; i < emBe; i++) {
          newDanhSachEmBe.push({
            ho: "",
            ten: "",
            ngaySinh: "",
            gioiTinh: "",
            title: "",
            number: 0,
            nguoiLon: 0,
          });
        }
        return newDanhSachEmBe;
    }, [emBe]);
    
    useEffect(()=>{
        if(passenger?.type == "Người lớn") {
            danhSachHanhKhach[0 +passenger.number -1] = passenger
        } else if (passenger?.type == "Trẻ em") {
            danhSachHanhKhach[nguoiLon +passenger.number-1] = passenger
        }
    },[passenger])

    useEffect(()=>{
        danhSachEmBe[infants?.number - 1] = infants
    },[infants])

    const xacNhanDatVe = () => {      
        datVe()
    }

    
    const datVe = async () => {
        for (let i = 0; i < danhSachEmBe.length; i++) {
            const index = danhSachEmBe[i].nguoiLon - 1;
            if (danhSachHanhKhach[index]) {
                danhSachHanhKhach[index].infants = danhSachEmBe[i];
            }
        }

        const jsonChuyenDi = {
            "index":1,
            "passengerJourneyDetails":[
               {
                  "passenger":{
                     "index":1
                  },
                  "segment":"",
                  "bookingKey": chuyenBayDi?.fareOptions[chuyenDiFareOptions].bookingCode.key,
                  "reservationStatus":{
                     "confirmed":true,
                     "waitlist":false,
                     "standby":false,
                     "cancelled":false,
                     "open":false,
                     "finalized":false,
                     "external":false
                  }
               }
            ]
        }
        const jsonChuyenVe = chuyenBayVe ? {
            "index":2,
            "passengerJourneyDetails":[
               {
                  "passenger":{
                     "index":1
                  },
                  "segment":"",
                  "bookingKey": chuyenBayVe?.fareOptions[chuyenVeFareOptions].bookingCode.key,
                  "reservationStatus":{
                     "confirmed":true,
                     "waitlist":false,
                     "standby":false,
                     "cancelled":false,
                     "open":false,
                     "finalized":false,
                     "external":false
                  }
               }
            ]
        }
        : null

        const journeys = jsonChuyenVe ? [jsonChuyenDi, jsonChuyenVe] : [jsonChuyenDi]

        let listPassenger = []
        for (let i = 0; i < danhSachHanhKhach.length; i++ ) {
            listPassenger.push(
                {
                    "index":i+1,
                    "fareApplicability":{
                       "child":danhSachHanhKhach[i].child,
                       "adult":danhSachHanhKhach[i].adult
                    },
                    "reservationProfile":{
                       "lastName": danhSachHanhKhach[i].ho,
                       "firstName":danhSachHanhKhach[i].ten,
                       "title":danhSachHanhKhach[i].title,
                       "gender":danhSachHanhKhach[i].gioiTinh,
                       "address":{
                          
                       },
                       "birthDate":danhSachHanhKhach[i].ngaySinh,
                       "personalContactInformation":{
                          "phoneNumber":"",
                          "mobileNumber":"+84" + contactValue?.diDong?.slice(1,10),
                          "email": contactValue?.email
                       },
                       "status":{
                          "active":true,
                          "inactive":false,
                          "denied":true
                       },
                       "loyaltyProgram":{
                          "number":""
                       }
                    },
                    "infants": danhSachHanhKhach[i].infants?.nguoiLon > 0
                    ? [
                        {
                            "index":danhSachHanhKhach[i].infants?.number + nguoiLon + treEm,
                            "reservationProfile":{
                                "lastName": danhSachHanhKhach[i].infants?.ho,
                                "firstName":danhSachHanhKhach[i].infants?.ten,
                                "title":"Infant",
                                "gender":danhSachHanhKhach[i].infants?.gioiTinh,
                                "address":{
                                    
                                },
                                "birthDate":danhSachHanhKhach[i].infants?.ngaySinh.split(" ")[0],
                                "personalContactInformation":{
                                    "phoneNumber":"",
                                    "mobileNumber":"+84" + contactValue?.diDong?.slice(1,10),
                                    "email": contactValue?.email
                                }
                            }
                        }
                    ]
                    : []
                 }
            )
        }

        try {
              const baseUrl = process.env.BASE_API_URL
              const body = {
                "bookingInformation":{
                   "contactInformation":{
                      "name": contactValue?.ho.toUpperCase() + " " + contactValue?.ten.toUpperCase(),
                      "phoneNumber":"+84" + contactValue?.diDong?.slice(1,10),
                      "extension":"",
                      "email": contactValue?.email,
                      "language":{
                         "href":"/languages/vi",
                         "code":"vi",
                         "name":"Vietnamese"
                      }
                   }
                },
                "insurancePolicies":[
                   
                ],
                "journeys": journeys,
                "passengers":listPassenger,
                "paymentTransactions":[
                   {
                      "paymentMethod":{
                         "href":"https://vietjet-api.intelisystraining.ca/RESTv1/paymentMethods/tfCeB5%C2%A5mircWvs2CC2%A59VaH1zFawFw==",
                         "key":"tfCeB5¥mircWvs2C4HkDdOXNJfƒNFOopDW2yQCBh2p1rOTwFA5LN6VUgknLR¥uSRURzqRAo79Q¥yB9ni61HUMA==",
                         "identifier":"PL",
                         "description":"Pay Later"
                      },
                      "paymentMethodCriteria":{
                         "thirdParty":{
                            "clientIP":"103.104.121.12",
                            "language":{
                               "href":"https://intelisys-api.intelisys.ca/RESTv1/languages/VI",
                               "code":"vi",
                               "name":"Vietnamese"
                            },
                            "applicationIdentifier":"",
                            "redirectURL":"",
                            "postURL":"",
                            "postData":"",
                            "reference":""
                         }
                      },
                      "currencyAmounts":[
                         {
                            "baseAmount":0,
                            "discountAmount":0,
                            "taxAmount":0,
                            "totalAmount": giaChuyenBayDi + giaChuyenBayVe,
                            "currency":{
                               "href":"https://vietjet-api.intelisystraining.ca/RESTv1/currencies/VND",
                               "code":"VND",
                               "description":"Vietnam Dong",
                               "baseCurrency":true
                            },
                            "exchangeRate":1
                         }
                      ],
                      "processingCurrencyAmounts":[
                         {
                            "totalAmount":0,
                            "currency":{
                               "href":"https://vietjet-api.intelisystraining.ca/RESTv1/currencies/VND",
                               "code":"VND",
                               "description":"Vietnam Dong",
                               "baseCurrency":true
                            },
                            "exchangeRate":1
                         }
                      ],
                      "payerDescription":"",
                      "receiptNumber":"",
                      "payments":"",
                      "refundTransactions":"",
                      "notes":""
                   }
                ],
                "ancillaryPurchases":[
                   
                ],
                "seatSelections":[
                   
                ]
            }
                const response = await axios.post(baseUrl + `/reservations`,body)
            if(response.data.message) {
                alert(response.data.message)
            } else {
                alert("Đặt thành công")
            }
    
            if (!response.data) {
                throw new Error('Failed to fetch data');
            }
        } catch (error: any) {
            console.error('Error fetching data:', error.message);
        }
    };


    return (
        <div className="col-span-2 shadow-md rounded-md p-2 box-border border border-gray-100">
            <h2 className="ml-2 textt-gray-800 font-bold mb-2">Chuyến bay đi:</h2>
            <FlightInfo flightData = {chuyenBayDi} fareOption={chuyenDiFareOptions}/>
            {chuyenBayVe?
                <>
                    <h2 className="ml-2 textt-gray-800 font-bold mb-2 mt-4">Chuyến bay về:</h2>
                    <FlightInfo flightData = {chuyenBayVe} fareOption={chuyenVeFareOptions}/>
                </>
            :
                <></>
            }

            <ContactInfo setContactValue={setContactValue}/>

            <h2 className="ml-2 pt-4 font-bold text-gray-800">Thông tin hành khách:</h2>

            {nguoiLonPassengersArray?.map((item: any, index:number) => (
                <div key={index}>
                    <Passenger 
                    setInfants = {setInfants}
                    setPassenger={setPassenger} 
                    passenger={"Người lớn"} 
                    number={index+1}/>
                </div>
            ))}

            {treEmPassengersArray?.map((item: any, index:number) => (
                <div key={index + nguoiLon}>
                    <Passenger 
                    setInfants = {setInfants}
                    setPassenger={setPassenger} 
                    passenger={"Trẻ em"} 
                    number={index+1}/>
                </div>
            ))}
            
            {emBePassengersArray?.map((item: any, index:number) => (
                <div key={index + nguoiLon + treEm}>
                    <Passenger 
                    setInfants = {setInfants}
                    setPassenger={setPassenger} 
                    passenger={"Em bé"} 
                    number={index+1}/>
                </div>
            ))}

            {chuyenBayDi ? 
                <>
                    <div className="p-2 rounded bg-gray-100 mt-4">
                        <div className="flex justify-between">
                            <h2>Tổng giá:</h2>
                            <span className="text-lg text-orange-500 font-bold">{(giaChuyenBayDi + giaChuyenBayVe).toLocaleString('en-US') + "VND"}</span>
                        </div>
                    </div>
                    <div className="w-full flex justify-end mt-2">
                        <button onClick={()=>xacNhanDatVe()} className="bg-blue-500 px-6 py-2 text-white rounded-md font-bold hover:bg-blue-600">
                            Đặt chỗ
                        </button>
                    </div>
                </>
            :
                <>
                    <div className="p-2 rounded bg-gray-300 animate-pulse mt-4">
                        <div className="flex justify-between">
                            <h2 className="w-1/2 h-6 bg-gray-400 rounded"></h2>
                            <span className="w-1/4 h-6 bg-gray-400 rounded"></span>
                        </div>
                    </div>

                    <div className="w-full flex justify-end mt-2">
                        <button onClick={()=>xacNhanDatVe()} className="bg-gray-400 px-6 py-2 text-gray-500 rounded-md font-bold cursor-not-allowed">
                            Đặt vé
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export default FligtPageDetail 