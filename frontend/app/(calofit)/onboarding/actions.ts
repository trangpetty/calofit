'use server';

import {OnboardingState, ProfileFormData, ProfileResult} from "@/app/types/onboarding";
import {requireAuth} from "@/app/utils/auth";
import {doGet, doPost} from "@/app/utils/api";

export async function submitProfileData(prevState: OnboardingState, rawData: FormData | ProfileFormData):Promise<OnboardingState> {
    try {
        const {token} = await requireAuth();
        const result = await doPost<ProfileResult>("/profiles", rawData, token);

        return { status: 'success', data: result as ProfileResult};

    } catch (error) {
        console.error("Lỗi khi lưu profile:", error);

        return { status: 'error', message: 'Đã có lỗi xảy ra khi lưu hồ sơ. Vui lòng thử lại!' };
    }
}

export async function getProfile () {
    try {
        const {token} = await requireAuth();

        const response = await doGet<ProfileResult>("/profiles/me", token, { cache: 'no-store' });
        console.log("=== KẾT QUẢ API GET PROFILE ===", response);

        return { status: 'success', data: response };

    } catch (error: any) {
        console.error("=== LỖI KHI GỌI API GET PROFILE ===", error.message);
        console.error("=== CHI TIẾT LỖI ===", error);
        return { status: 'error', message: 'Đã có lỗi xảy ra!' };
    }
}