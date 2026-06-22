import { StepConfig } from '@/types/onboarding';

export const STEPS: StepConfig[] = [
    {
        title: 'What’s your first name?',
        subTitle: 'We’re happy you’re here. Let’s get to know a little about you.',
        fields: [
            {
                name:    'name',
                innerLabel:   'First Name',
                type:    'text-input',
                placeholder: 'First Name'
            }
        ],
    },
    {
        title: 'Thanks {{name}}! Now for your goals.',
        subTitle: 'Select all that apply.',
        fields: [
            {
                name:    'goal',
                label:   '',
                type:    'icon-select',
                cols:    1,
                options: [
                    { id: 'LOSE_WEIGHT',     label: 'Tone up – you want visible muscles with as little mass as possible',          icon: '🔥' },
                    { id: 'MAINTAIN_WEIGHT', label: 'Bulk up – you want large, well-defined muscles, with a low percentage of body fat',           icon: '⚖️' },
                    { id: 'GAIN_MUSCLE',     label: 'Get strong – you want to lift the maximum amount of weight and are not concerned with body fat or muscle definition', icon: '💪' },
                ],
            },
        ],
    },
    {
        title: 'What is your baseline activity level?',
        subTitle: 'Not including workouts–we count that separately',
        fields: [
            {
                name:    'activityLevel',
                label:   '',
                type:    'card-select',
                cols:    1,
                options: [
                    { id: 'SEDENTARY',         label: 'Not Very Active',    desc: 'Spend most of the day sitting (e.g., bankteller, desk job)' },
                    { id: 'LIGHTLY_ACTIVE',    label: 'Lightly Active',   desc: 'Spend a good part of the day on your feet (e.g., teacher, salesperson)' },
                    { id: 'MODERATELY_ACTIVE', label: 'Active',   desc: 'Spend a good part of the day doing some physical activity (e.g., food server, postal carrier)' },
                    { id: 'VERY_ACTIVE',       label: 'Very Active', desc: 'Spend a good part of the day doing heavy physical activity (e.g., bike messenger, carpenter)' },
                ],
            },
        ],
    },
    {
        title: 'Your detail information',
        fields: [
            {
                name:    'gender',
                label:   'Please select which sex we should use to calculate your calorie needs.',
                type:    'radio-select',
                options: [
                    { id: 'MALE',   label: 'Male' },
                    { id: 'FEMALE', label: 'Females' },
                ],
            },
            {
                name:        'age',
                label:       'How old are you?',
                innerLabel:  'Your age',
                type:        'number-input',
                placeholder: 'Example: 25',
            },
        ],
        bottomTitle: 'We use this information to calculate an accurate calorie goal for you.'
    },
    {
        title: 'Chỉ số cơ thể',
        fields: [
            {
                name:        'height',
                label:       'How tall are you?',
                type:        'number-input',
                innerLabel:  'Height',
                unit:        'cm',
                placeholder: 'Example: 170',
            },
            {
                name:        'weight',
                label:       'How much do you weigh?',
                subLabel:    'It\'s OK to estimate. You can update this later.',
                type:        'number-input',
                innerLabel:  'Current weight',
                unit:        'kg',
                placeholder: 'Example: 65',
                step:        0.1,
            },
            {
                name:        'weightGoal',
                label:       'What\'s your goal weight?',
                subLabel:    'Don\'t worry. This doesn\'t affect your daily calorie goal and you can always change it later.',
                type:        'number-input',
                innerLabel:  'Goal weight',
                unit:        'kg',
                placeholder: 'Example: 65',
                step:        0.1,
            },
        ],
    },
    {
        title: 'What is your weekly goal?',
        subTitle: 'Let\'s break down your overall health goal into a weekly one you can maintain. Slow-and-steady is best!',
        fields: [
            {
                name:    'weightWeek',
                label:   '',
                type:    'card-select',
                cols:    1,
                options: [
                    { id: '0.25',         label: 'Gain 0.25 kilograms per week (Recommended)'},
                    { id: '0.5',    label: 'Gain 0.5 kilograms per week'},
                ],
            },
        ],
    },
];
