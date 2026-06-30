'use client'

import { State } from "@/app/types/progress";
import { useActionState, useEffect, useState } from "react";
import {submitProfileData, submitUpdateProfileData} from "@/app/(calofit)/onboarding/actions";
import {MissingFieldsModalProps} from "@/app/types/dashboard";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"


const INITIAL_STATE: State = { status: 'idle' };

export default function MissingFieldsModal ({isOpen, onClose, onSuccess, profile}: MissingFieldsModalProps) {

    const isMissingGender = !profile?.gender;
    const isMissingAge = !profile?.age;
    const isMissingHeight = !profile?.height;
    const isMissingWeight = !profile?.weight;
    const isMissingActivityLevel = !profile?.activityLevel;
    const isMissingGoal = !profile?.goal;
    const isMissingTargetWeight = profile?.targetWeight == null;
    const isMissingWeeklyGoalRate = profile?.weeklyGoalRate == null;
    const isMissingStartDate = !profile?.startDate;

    const [today, setToday] = useState('');
    useEffect(() => {
        setToday(new Date().toISOString().split('T')[0]);
    }, []);

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        const payload = {
            ...(formData.has('name') && {name: formData.get('name')}),
            ...(formData.has('gender') && {gender: formData.get('gender')}),
            ...(formData.has('age') && {age: Number(formData.get('age'))}),
            ...(formData.has('height') && {height: Number(formData.get('height'))}),
            ...(formData.has('weight') && {weight: Number(formData.get('weight'))}),
            ...(formData.has('activityLevel') && {activityLevel: formData.get('activityLevel')}),
            ...(formData.has('goal') && {goal: formData.get('goal')}),
            ...(formData.has('targetWeight') && {targetWeight: Number(formData.get('targetWeight'))}),
            ...(formData.has('weeklyGoalRate') && {weeklyGoalRate: Number(formData.get('weeklyGoalRate'))}),
            ...(formData.has('startDate') && { startDate: formData.get('startDate') as string }),
        };
        return await submitUpdateProfileData(prevState, payload);
    }

    const [state, formMissingAction, isSubmitting] = useActionState(
        handleFormSubmit,
        INITIAL_STATE,
    );

    useEffect(() => {
        if (state.status === 'success') {
            if (onSuccess) onSuccess();
            onClose();
        }
    }, [state.status, onSuccess, onClose]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Hoàn thiện hồ sơ</DialogTitle>
                    <DialogDescription>
                        Vui lòng bổ sung các thông tin còn thiếu dưới đây để hệ thống thiết lập lộ trình chính xác nhất cho bạn.
                    </DialogDescription>
                </DialogHeader>

                <form action={formMissingAction}>
                    {state.status === 'error' && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {state.message}
                        </div>
                    )}

                    <FieldGroup className="space-y-4 py-4">
                        {isMissingAge && (
                            <Field>
                                <Label htmlFor="age">Tuổi</Label>
                                <Input id="age" name="age" type="number" min="10" max="100" required placeholder="Ví dụ: 24" />
                            </Field>
                        )}

                        {isMissingGender && (
                            <Field>
                                <Label htmlFor="gender">Giới tính</Label>
                                {/* Dùng thẻ select mặc định, bạn có thể thay bằng component Select của UI Library */}
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="MALE">Nam</option>
                                    <option value="FEMALE">Nữ</option>
                                </select>
                            </Field>
                        )}

                        {isMissingHeight && (
                            <Field>
                                <Label htmlFor="height">Chiều cao (cm)</Label>
                                <Input id="height" name="height" type="number" step="0.1" required placeholder="Ví dụ: 165" />
                            </Field>
                        )}

                        {isMissingWeight && (
                            <Field>
                                <Label htmlFor="weight">Cân nặng hiện tại (kg)</Label>
                                <Input id="weight" name="weight" type="number" step="0.1" required placeholder="Ví dụ: 55.5" />
                            </Field>
                        )}

                        {isMissingActivityLevel && (
                            <Field>
                                <Label htmlFor="activityLevel">Mức độ vận động</Label>
                                <select
                                    id="activityLevel"
                                    name="activityLevel"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                >
                                    <option value="">Chọn mức độ</option>
                                    <option value="SEDENTARY">Ít vận động</option>
                                    <option value="LIGHTLY_ACTIVE">Vận động nhẹ</option>
                                    <option value="MODERATELY_ACTIVE">Vận động vừa</option>
                                    <option value="VERY_ACTIVE">Vận động nhiều</option>
                                    <option value="EXTRA_ACTIVE">Vận động cực nhiều</option>
                                </select>
                            </Field>
                        )}

                        {isMissingGoal && (
                            <Field>
                                <Label htmlFor="goal">Mục tiêu</Label>
                                <select
                                    id="goal"
                                    name="goal"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                >
                                    <option value="">Chọn mục tiêu</option>
                                    <option value="LOSE_WEIGHT">Giảm cân</option>
                                    <option value="MAINTAIN_WEIGHT">Giữ dáng</option>
                                    <option value="GAIN_MUSCLE">Tăng cơ</option>
                                </select>
                            </Field>
                        )}

                        {isMissingTargetWeight && (
                            <Field>
                                <Label htmlFor="targetWeight">Mục tiêu cân nặng (kg)</Label>
                                <Input id="targetWeight" name="targetWeight" type="number" step="0.1" required placeholder="Ví dụ: 50.0" />
                            </Field>
                        )}

                        {isMissingWeeklyGoalRate && (
                            <Field>
                                <Label htmlFor="weeklyGoalRate">Tốc độ thay đổi (kg/tuần)</Label>
                                <Input id="weeklyGoalRate" name="weeklyGoalRate" type="number" step="0.1" max="1" required placeholder="Ví dụ: 0.5" />
                            </Field>
                        )}

                        {isMissingStartDate && (
                            <Field>
                                <Label htmlFor="startDate">Ngày bắt đầu</Label>
                                <Input
                                    id="startDate"
                                    name="startDate"
                                    type="date"
                                    defaultValue={today} // Tự động điền ngày hôm nay
                                    required
                                />
                            </Field>
                        )}
                    </FieldGroup>

                    <DialogFooter>
                        {/* Ẩn nút Cancel nếu bạn muốn bắt buộc user phải nhập */}
                        {/* <DialogClose asChild>
                            <Button variant="outline" type="button" disabled={isSubmitting}>Bỏ qua</Button>
                        </DialogClose> */}
                        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}