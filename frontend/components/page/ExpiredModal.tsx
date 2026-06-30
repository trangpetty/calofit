"use client"

import {useEffect, useState} from "react";
import {signOut} from "next-auth/react";
import {WarningIcon} from "@phosphor-icons/react";

interface Props {
    isExpired: boolean;
}

export default function ExpiredModal ({isExpired}: Props) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        if (isExpired) setIsOpenModal(true);
    }, [isExpired]);

    const handleSubmit = () => {{
        signOut({callbackUrl: "/login"});
    }}

    if (!isOpenModal) return null;

    return (
        <div className="fixed inset-0 blur-[5px] opacity-40s flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4 text-orange-600 flex gap-4 items-center">
                    <WarningIcon size={24} weight="bold" />
                    Phiên đăng nhập hết hạn
                </h2>
                <p className="mb-6 text-gray-600">
                    Thời gian đăng nhập của bạn đã kết thúc. Vui lòng đăng nhập lại để tiếp tục sử dụng.
                </p>
                <button
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Ok
                </button>
            </div>
        </div>
    );
}