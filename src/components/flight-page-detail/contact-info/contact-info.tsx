'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react"

const ContactInfo = ({
    setContactValue,
}: {
    setContactValue: Dispatch<SetStateAction<any>>,
}) => {
    const [ho, setHo] = useState<string>("");
    const [ten, setTen] = useState<string>("");
    const [diDong, setDiDong] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        const contactValue = {
            ho: ho,
            ten: ten,
            diDong: diDong,
            email: email,
        };
        setContactValue(contactValue);
    }, [ho, ten, diDong, email]);

    return (
        <>
            <h2 className="ml-2 pt-4 pb-2 font-bold text-gray-800">Thông tin liên hệ:</h2>
            <div className="bg-gray-100 p-2 rounded-md flex">
                <div className="bg-white p-2 w-full grid grid-cols-2 gap-8">
                    <div className="w-full">
                        <div className="">
                            <h2 className="text-sm font-semibold text-gray-700">Họ (VD: Nguyen)</h2>
                            <input
                                type="text"
                                onChange={(e) => setHo(e.target.value)}
                                value={ho}
                                className="px-2 border rounded-sm h-8 w-full"
                            />
                        </div>
                        <div className="mt-2">
                            <h2 className="text-sm font-semibold text-gray-700">Điện thoại di động</h2>
                            <input
                                type="text"
                                onChange={(e) => setDiDong(e.target.value)}
                                value={diDong}
                                className="px-2 border rounded-sm h-8 w-full"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="">
                            <h2 className="text-sm font-semibold text-gray-700">Tên & tên đệm (VD: Van An)</h2>
                            <input
                                type="text"
                                onChange={(e) => setTen(e.target.value)}
                                value={ten}
                                className="px-2 border rounded-sm h-8 w-full"
                            />
                        </div>
                        <div className="mt-2">
                            <h2 className="text-sm font-semibold text-gray-700">Email</h2>
                            <input
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="px-2 border rounded-sm h-8 w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactInfo;
