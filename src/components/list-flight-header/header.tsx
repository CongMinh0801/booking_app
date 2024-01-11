import { useRouter } from 'next/navigation'

const ListFlightHeader = (
    {
        sanBayDi,
        sanBayDen,
        ngayDi,
        hanhKhach,
    }:{
        sanBayDi: string | null,
        sanBayDen: string | null,
        ngayDi: string | null,
        hanhKhach: number | null,
    }) => {
    const router = useRouter()

    const formatNgayDi = (ngay: string | null) => {
        if (ngay === null) {
            return "Ngày không hợp lệ"; // hoặc giá trị mặc định khác nếu cần
        }
    
        const listNgayDi = ngay.split("-")
        const thangTiengViet = ["Tháng Một","Tháng Hai","Tháng Ba","Tháng Tư","Tháng Năm","Tháng Sáu","Tháng Bảy","Tháng Tám","Tháng Chín","Tháng Mười","Tháng Mười Một","Tháng Mười Hai"];
        return listNgayDi[2] + " " + thangTiengViet[parseInt(listNgayDi[1]) - 1] + " " + listNgayDi[0];
    }
    

    return (
            <div className="w-full p-2 mb-2 bg-blue-500 border-b-4 border-blue-700 rounded shadow-md">
                <div className="rounded-lg w-full p-2 bg-white flex justify-between items-center transition-all">
                    <div>
                       <h2 className="flex items-center w-full text-lg text-gray-800 font-bold">
                            <span>
                                {sanBayDi}
                            </span>
                            <div className="mx-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                </svg>
                            </div>
                            <span>
                                {sanBayDen}
                            </span>
                        </h2>
                        <p className="w-full text-gray-600 font-medium">
                            {`${formatNgayDi(ngayDi)} | ${hanhKhach} hành khách`}
                        </p>
                    </div>

                    <div>
                        <button onClick={() => router.push('/')} className="p-4 hover:bg-gray-200 bg-gray-100 rounded-md ml-4 flex items-center">
                            Thay đổi tìm kiếm
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-8 mt-2 font-semibold">
                    <button className="bg-gray-200 bg-opacity-50 rounded-md box-border hover:bg-gray-200 hover:bg-opacity-50 hover:shadow-inner bg-transparent py-2 text-white  transition-all duration-500">
                        Thứ tư<br/> 3 tháng 1
                    </button>
                    <button className="bg-opacity-50 rounded-md box-border hover:bg-gray-200 hover:bg-opacity-50 hover:shadow-inner bg-transparent py-2 text-white  transition-all duration-500">
                        Thứ tư<br/> 3 tháng 1
                    </button>
                    <button className="bg-opacity-50 rounded-md box-border hover:bg-gray-200 hover:bg-opacity-50 hover:shadow-inner bg-transparent py-2 text-white  transition-all duration-500">
                        Thứ tư<br/> 3 tháng 1
                    </button>
                    <button className="bg-opacity-50 rounded-md box-border hover:bg-gray-200 hover:bg-opacity-50 hover:shadow-inner bg-transparent py-2 text-white  transition-all duration-500">
                        Thứ tư<br/> 3 tháng 1
                    </button>
                    <button className="bg-opacity-50 rounded-md box-border hover:bg-gray-200 hover:bg-opacity-50 hover:shadow-inner bg-transparent py-2 text-white  transition-all duration-500">
                        Thứ tư<br/> 3 tháng 1
                    </button>
                </div>
            </div>
    )
}

export default ListFlightHeader