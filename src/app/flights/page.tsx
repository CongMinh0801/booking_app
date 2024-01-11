// List Flights Page
'use client'

import Card from "@/components/list-flight-choose-card/card";
import Filter from "@/components/list-flight-filter/filter";
import ListFlightHeader from "@/components/list-flight-header/header";
import Flight from "@/components/list-flight-item/flight";
import FlightSkeleton from "@/components/list-flight-item/flight-skeleton";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [chonChuyenDi, setChonChuyenDi] = useState();
  const [chuyenDuocChon, setChuyenDuocChon] = useState();
  const [chonChuyenVe, setChonChuyenVe] = useState();
  const [chonChuyen, setChonChuyen] = useState("Chuyến đi");
  const [sortValue, setSortValue] = useState("Giá tăng dần");
  const [danhSachChuyenBayVe, setDanhSachChuyenBayVe] = useState([]);
  const [danhSachChuyenBayDi, setDanhSachChuyenBayDi] = useState([]);
  const skeletonArr = ["", "", "", "", "", "", "", "", "", ""]
  let soNguoiLon = useRef<number | null>(null)
  let soTreEm = useRef<number | null>(null)
  let soEmBe = useRef<number | null>(null)
  let sanBayDiRef = useRef<string | null>(null)
  let sanBayDenRef = useRef<string | null>(null)
  let ngayDiRef = useRef<string | null>(null)
  let ngayVeRef = useRef<string | null>(null)
  let khuHoiRef = useRef<boolean | null>(null)
  const router: AppRouterInstance = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);

        const khuHoi = queryParams.get("khu_hoi") === "true";
        khuHoiRef.current = khuHoi
        const sanBayDi = queryParams.get("san_bay_di") || "";
        sanBayDiRef.current = sanBayDi
        const sanBayDen = queryParams.get("san_bay_den") || "";
        sanBayDenRef.current = sanBayDen
        const ngayDi = queryParams.get("ngay_di") || "";
        ngayDiRef.current = ngayDi
        const ngayVe = queryParams.get("ngay_ve") || "";
        ngayVeRef.current = ngayVe
        const nguoiLon = parseInt(queryParams.get("nguoi_lon") || "0", 10);
        soNguoiLon.current = nguoiLon
        const treEm = parseInt(queryParams.get("tre_em") || "0", 10);
        soTreEm.current = treEm
        const emBe = parseInt(queryParams.get("em_be") || "0", 10);
        soEmBe.current = emBe

        const queryData: {
          cityPair: string;
          departure: string;
          currency: string;
          adultCount: string;
          childCount: string;
          infantCount: string;
        } = {
          cityPair: sanBayDi + "-" + sanBayDen,
          departure: ngayDi,
          currency: "VND",
          adultCount: nguoiLon.toString(),
          childCount: treEm.toString(),
          infantCount: emBe.toString(),
        }

        const newQueryParams = new URLSearchParams(queryData);
        const baseUrl = process.env.BASE_API_URL

        const response = await axios.get(baseUrl + `/TravelOptions?${newQueryParams.toString()}`)
        
        if (response.data) {
          setDanhSachChuyenBayDi(response.data)
          console.log(response.data)
        }

        if (khuHoi) {
          const iQueryData: {
            cityPair: string;
            departure: string;
            currency: string;
            adultCount: string;
            childCount: string;
            infantCount: string;
          } = {
            cityPair: sanBayDen + "-" + sanBayDi,
            departure: ngayVe,
            currency: "VND",
            adultCount: nguoiLon.toString(),
            childCount: treEm.toString(),
            infantCount: emBe.toString(),
          }
          const iQueryParams = new URLSearchParams(iQueryData);
          const iStartTime = performance.now()
          const iResponse = await axios.get(baseUrl + `/TravelOptions?${iQueryParams.toString()}`);
          const iEndTime = performance.now()
          const elapsedTime = iEndTime - iStartTime;
          if (elapsedTime < 1000) {
            const delayTime = 1000 - elapsedTime;
            await new Promise(resolve => setTimeout(resolve, delayTime));
          }

          if (iResponse.data) {
            setDanhSachChuyenBayVe(iResponse.data)
          }
        }

        if (!response.data) {
          throw new Error('Failed to fetch data');
        }
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chuyenDuocChon) {
      if (chonChuyen === "Chuyến đi") {
        setChonChuyenDi(chuyenDuocChon)
      } else {
        setChonChuyenVe(chuyenDuocChon)
      }
    }
  }, [chonChuyen, chuyenDuocChon])

  useEffect(() => {
    if (chonChuyen === "Chuyến đi") {
      setFlights(danhSachChuyenBayDi)
    } else {
      setFlights(danhSachChuyenBayVe)
    }
  }, [chonChuyen, danhSachChuyenBayDi, danhSachChuyenBayVe])

  return (
    <div className="mt-36 w-full xl:max-w-screen-xl grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <ListFlightHeader sanBayDi={sanBayDiRef.current} sanBayDen={sanBayDenRef.current} ngayDi={ngayDiRef.current} hanhKhach={(soNguoiLon.current ?? 0) + (soTreEm.current ?? 0) + (soEmBe.current ?? 0)} />
        {flights?.length > 0 ? (
          flights.map((item, index) => (
            <div key={index}>
              <Flight
                dataFlight={item}
                nguoiLon={soNguoiLon.current}
                treEm={soTreEm.current}
                emBe={soEmBe.current}
                chuyenDuocChon={chuyenDuocChon}
                setChuyenDuocChon={setChuyenDuocChon} />
            </div>
          ))
        ) : (
          skeletonArr.map((item, index) => (
            <div key={index}>
              <FlightSkeleton />
            </div>
          ))
        )}
      </div>
      <div className="col-span-1">
        <Card
          khuHoi={khuHoiRef.current}
          ngayDi={ngayDiRef.current}
          ngayVe={ngayVeRef.current}
          sanBayDi={sanBayDiRef.current}
          sanBayDen={sanBayDenRef.current}
          chonChuyenDi={chonChuyenDi}
          setChonChuyenDi={setChonChuyenDi}
          chonChuyenVe={chonChuyenVe}
          setChonChuyenVe={setChonChuyenVe}
          chonChuyen={chonChuyen}
          router={router}
          setChonChuyen={setChonChuyen} />
        <Filter sortValue={sortValue} setSortValue={setSortValue} />
      </div>
    </div>
  )
}
