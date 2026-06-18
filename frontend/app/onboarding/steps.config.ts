// app/onboarding/steps.config.ts
// Toàn bộ cấu trúc form nằm ở đây — thêm/xoá/sửa step chỉ cần chỉnh file này.

import { StepConfig } from '@/types/onboarding';

export const STEPS: StepConfig[] = [
    {
        title: 'Cho chúng tôi biết về bạn',
        fields: [
            {
                name:    'gender',
                label:   'Giới tính sinh học',
                type:    'card-select',
                cols:    2,
                options: [
                    { id: 'MALE',   label: 'Nam' },
                    { id: 'FEMALE', label: 'Nữ' },
                ],
            },
            {
                name:        'age',
                label:       'Tuổi của bạn',
                type:        'number-input',
                placeholder: 'Ví dụ: 25',
            },
        ],
    },
    {
        title: 'Chỉ số cơ thể',
        fields: [
            {
                name:        'height',
                label:       'Chiều cao (cm)',
                type:        'number-input',
                placeholder: 'Ví dụ: 170',
            },
            {
                name:        'weight',
                label:       'Cân nặng (kg)',
                type:        'number-input',
                placeholder: 'Ví dụ: 65',
                step:        0.1,
            },
        ],
    },
    {
        title: 'Mức độ vận động của bạn?',
        fields: [
            {
                name:    'activityLevel',
                label:   '',
                type:    'card-select',
                cols:    1,
                options: [
                    { id: 'SEDENTARY',         label: 'Ít vận động',    desc: 'Làm việc văn phòng, không tập thể dục' },
                    { id: 'LIGHTLY_ACTIVE',    label: 'Vận động nhẹ',   desc: 'Tập luyện nhẹ 1-3 ngày/tuần' },
                    { id: 'MODERATELY_ACTIVE', label: 'Vận động vừa',   desc: 'Tập luyện 3-5 ngày/tuần' },
                    { id: 'VERY_ACTIVE',       label: 'Vận động nhiều', desc: 'Tập luyện nặng 6-7 ngày/tuần' },
                ],
            },
        ],
    },
    {
        title: 'Mục tiêu của bạn là gì?',
        fields: [
            {
                name:    'goal',
                label:   '',
                type:    'icon-select',
                cols:    1,
                options: [
                    { id: 'LOSE_WEIGHT',     label: 'Giảm Cân',          icon: '🔥' },
                    { id: 'MAINTAIN_WEIGHT', label: 'Giữ Dáng',           icon: '⚖️' },
                    { id: 'GAIN_MUSCLE',     label: 'Tăng Cơ / Tăng Cân', icon: '💪' },
                ],
            },
        ],
    },
];
