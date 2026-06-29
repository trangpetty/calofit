'use server'

import {requireAuth} from "@/app/utils/auth";
import {doGet, doPost} from "@/app/utils/api";
import {GoalProgressResult, WeightLogData, WeightLogState} from "@/app/types/progress";

export async function logWeight(prevState: WeightLogState, rawData: FormData | WeightLogData):Promise<WeightLogState> {
    try {
        const {token} = await requireAuth();
        const result = await doPost<GoalProgressResult>("/weight-log", rawData, token);

        return { status: 'success', data: result as GoalProgressResult};

    } catch (error) {
        console.error("Lỗi khi lưu weight log:", error);

        return { status: 'error', message: 'Đã có lỗi xảy ra khi lưu weight log. Vui lòng thử lại!' };
    }
}

export async function getProgress () {
    try {
        const {token} = await requireAuth();

        const response = await doGet<GoalProgressResult>("/goals/progress", token, { cache: 'no-store' });
        console.log("=== KẾT QUẢ API GET PROGRESS ===", response);

        return { status: 'success', data: response };

    } catch (error: any) {
        console.error("=== LỖI KHI GỌI API GET PROGRESS ===", error.message);
        console.error("=== CHI TIẾT LỖI ===", error);
        return { status: 'error', message: 'Đã có lỗi xảy ra!' };
    }
}