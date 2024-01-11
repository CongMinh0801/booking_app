'use client'

import "./passenger.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Calendar from "react-calendar"

type ValuePiece = Date | null ;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Passenger = (
    {
        passenger,
        number,
        setPassenger,
    }:{
        passenger: string,
        number: number,
        setPassenger: Dispatch<SetStateAction<any>>,
    }) => {

    const [ngaySinh, setNgaySinh] = useState<Value>();
    const [calendarNgaySinh, setCalendarNgaySinh] = useState<boolean>(false);
    const [gioiTinh, setGioiTinh] = useState<string>("MALE")
    const [ho, setHo] = useState<string>()
    const [ten, setTen] = useState<string>()

    useEffect(() => {
        setPassenger({
            ho: ho,
            ten: ten,
            ngaySinh: ngaySinh ? formatDateSubmit(ngaySinh) : "",
            gioiTinh: gioiTinh,
            title: gioiTinh == "MALE" ? "Mr" : "Mrs",
            number: number,
            type: passenger,
            adult: passenger == "Người lớn" ? true : false,
            child: passenger == "Trẻ em" ? true : false,
        })
    },[ho, ten, ngaySinh, gioiTinh])

    const formatDate = (date: Value) => {
        if (date) {
            const listItem = date.toString().split(" ");
            if (Array.isArray(listItem) && listItem.length > 0) {
              const thangTiengViet = ["Tháng Một","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Mười Hai"];
              const thangAbbreviations = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
              return listItem[2] + " " + thangTiengViet[thangAbbreviations.indexOf(listItem[1])] + " " + listItem[3] ;
            }
        }
        return "Invalid Date";
    };

    const formatDateSubmit = (date: Value) => {
        if (date) {
            const listItem = date.toString().split(" ");
            if (Array.isArray(listItem) && listItem.length > 0) {
              const thangAbbreviations = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
              const thang = thangAbbreviations.indexOf(listItem[1]).toString().length == 2 
              ? (thangAbbreviations.indexOf(listItem[1]) + 1).toString() 
              : "0" + (thangAbbreviations.indexOf(listItem[1]) + 1).toString()
              return listItem[2] + "-" + thang + "-" + listItem[3] + " " +  listItem[4] + "Z";
            }
        } 
        return "Invalid Date";
    }

    const showCalendar = () => {
        setCalendarNgaySinh(true)
    };
  
    const hideCalendar = () => {
      setCalendarNgaySinh(false);
    };

    useEffect(() => {
        const handleClickOutside = (event:any) => {
          const calendarContainer = document.querySelector(`.calendar-container${passenger == "Người lớn" ? "nguoi-lon" + number : 
                                                                                passenger == "Trẻ em" ? "tre-em" + number: "em-be" + number}`);
          console.log(calendarContainer)
          if (calendarContainer && !calendarContainer.contains(event.target)) {
                  
            hideCalendar();
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    return (
        <>
            <div className="bg-gray-100 p-2 rounded-md mt-2">
                <div>
                    <h3 className="mb-2 text-gray-800">{`${passenger} ${number}`}</h3>
                    
                </div>
                <div className="bg-white p-2 w-full grid grid-cols-2 gap-8">
                    <div className="w-full">
                        <div className="">
                            <h2 className="text-sm font-semibold text-gray-700">Họ (VD: Nguyen)</h2>
                            <input value={ho} onChange={(e)=>setHo(e.target.value)} type="text" className="px-2 border rounded-sm h-8 w-full"/>
                        </div>
                        <div className="mt-2 relative">
                            <h2 className="text-sm font-semibold text-gray-700">Ngày sinh</h2>
                            <input type="text" onClick={showCalendar} value={ngaySinh ? formatDate(ngaySinh) : ""} onChange={(e) => setNgaySinh(new Date(e.target.value))} className="px-2 border rounded-sm h-8 w-full"/>
                            <div className={`calendar-container${passenger == "Người lớn" ? "nguoi-lon" + number : 
                                                                passenger == "Trẻ em" ? "tre-em" + number: "em-be" + number} ${calendarNgaySinh ? 'block' : 'hidden'} z-10 absolute top-full`}>
                                <Calendar className="bg-white text-gray-600 mt-2" value={ngaySinh} onChange={setNgaySinh} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="">
                            <h2 className="text-sm font-semibold text-gray-700">Tên & tên đệm (VD: Van An)</h2>
                            <input type="text" value={ten} onChange={(e)=>setTen(e.target.value)} className="px-2 border rounded-sm h-8 w-full"/>
                        </div>
                        <div className="mt-2">
                            <h2 className="text-sm font-semibold text-gray-700">Danh xưng</h2>
                            <select onChange={(e) => setGioiTinh(e.target.value)} name="" id="" className="px-2 border rounded-sm h-8 w-full">
                                <option className="text-gray-800" value="MALE">Ông</option>
                                <option className="text-gray-800" value="FEMALE">Bà</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Passenger 