'use server';

import { ProfileFormData } from "@/app/types/onboarding";
import { cookies } from "next/headers";

export async function submitProfileData(prevState: any, rawData: FormData | ProfileFormData) {
    try {
        const cookieStore = await cookies();
        const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSLFBSRU1JVU0iLCJpYXQiOjE3ODE3NTM5ODIsImV4cCI6MTc4MTc1NDg4Mn0.kSfythucMo2Xl-agO5NRtfJkrf2Kr7WoV_--WCoCbn8';
        // const token = cookieStore.get('accessToken')?.value;

        // Chuyển đổi dữ liệu thông minh
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

        // QUAN TRỌNG: Trả về 'status' để khớp với biến isSuccess bên OnboardingForm
        return { status: 'success', data: result };

    } catch (error) {
        console.error("Lỗi khi lưu profile:", error);

        // QUAN TRỌNG: Trả về 'status: error'
        return { status: 'error', message: 'Đã có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại!' };
    }
}