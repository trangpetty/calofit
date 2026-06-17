'use server';

import {ProfileFormData} from "@/app/types/onboarding";
import {cookies} from "next/headers";

export async function submitProfileData(data: ProfileFormData) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('accessToken')?.value;
        const response = await fetch("https://localhost:8080/api/v1/profiles", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Failed to save profile');
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Lỗi khi lưu profile:", error);
        return { success: false, message: 'Đã có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại!' };
    }
}