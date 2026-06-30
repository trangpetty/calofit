'use server';

import {OnboardingState, ProfileFormData, ProfileResult} from "@/app/types/onboarding";
import {requireAuth} from "@/app/utils/auth";
import {doGet, doPost, doPut} from "@/app/utils/api";

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

export async function submitUpdateProfileData(prevState: OnboardingState, rawData: FormData | ProfileFormData):Promise<OnboardingState> {
    try {
        const {token} = await requireAuth();
        const result = await doPut<ProfileResult>("/profiles", rawData, token);

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
        if (error.status === 401) {
            return {
                status: 'expired',
                message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
            };
        }

        if (error.status === 403) {
            return { status: 'forbidden', message: 'Bạn không có quyền truy cập tài nguyên này.' };
        }

        console.error("=== LỖI KHI GỌI API GET PROFILE ===", error.message);
        return {
            status: 'error',
            message: error.message || 'Đã có lỗi xảy ra từ máy chủ!'
        };
    }
}