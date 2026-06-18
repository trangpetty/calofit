'use server';

import { ProfileFormData } from "@/app/types/onboarding";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function submitProfileData(prevState: any, rawData: FormData | ProfileFormData) {
    try {
        const session = await getServerSession(authOptions);

        // Lấy token từ session
        const token = (session as any)?.accessToken || (session as any)?.user?.accessToken;

        if (!token) {
            console.error("Không tìm thấy token trong session. Chi tiết session hiện tại:", session);
            return { status: 'error', message: 'Lỗi xác thực: Không tìm thấy Token. Vui lòng kiểm tra lại cấu hình NextAuth!' };
        }

        let dataToSubmit: any;
        if (rawData instanceof FormData) {
            dataToSubmit = {
                gender: rawData.get('gender') as string,
                age: Number(rawData.get('age')),
                height: Number(rawData.get('height')),
                weight: Number(rawData.get('weight')),
                activityLevel: rawData.get('activityLevel') as string,
                goal: rawData.get('goal') as string,
            };
        } else {
            dataToSubmit = rawData;
        }

        const response = await fetch("http://localhost:8080/api/v1/profiles", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dataToSubmit)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to save profile: ${errorText}`);
        }

        const result = await response.json();

        return { status: 'success', data: result };

    } catch (error) {
        console.error("Lỗi khi lưu profile:", error);

        return { status: 'error', message: 'Đã có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại!' };
    }
}

export async function getProfile (prevState: any) {
    try {
        const session = await getServerSession(authOptions);
        const token = (session as any)?.accessToken || (session as any)?.user?.accessToken;

        if (!token) {
            console.error("Không tìm thấy token trong session. Chi tiết session hiện tại:", session);
            return { status: 'error', message: 'Lỗi xác thực: Không tìm thấy Token. Vui lòng kiểm tra lại cấu hình NextAuth!' };
        }

        const response = await fetch("http://localhost:8080/api/v1/profiles/me", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to save profile: ${errorText}`);
        }

        const result = await response.json();

        return { status: 'success', data: result };

    } catch (error) {
        console.error("Lỗi khi lưu profile:", error);

        return { status: 'error', message: 'Đã có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại!' };
    }
}