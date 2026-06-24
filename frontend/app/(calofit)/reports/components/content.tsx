'use client';

import React from 'react';
import {
    CalendarIcon,
    BarbellIcon,
    TrendDownIcon, DropSimpleIcon
} from "@phosphor-icons/react";
import MetricCard from "@/app/(calofit)/dashboard/components/(cards)/metric_card";

interface ContentReportsProps {
    profile?: any
}

export default function ContentReports ({profile}: ContentReportsProps) {

    return (
        <div className="w-full max-w-7xl mx-auto p-4 min-h-screen text-gray-900 font-sans flex flex-col gap-6">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="This week" icon={<CalendarIcon size={14} weight="bold" />} mainValue="1.680" subValue="average kcal/day" footerText="-120 vs target" themeColor="green" />
                <MetricCard title="Reduced" icon={<TrendDownIcon size={14} weight="bold" />} mainValue="0.8kg" subValue="in 2 weeks" footerText="Right on schedule" themeColor="green" />
                <MetricCard title="Number of Training Sessions" icon={<BarbellIcon size={14} weight="bold" />} mainValue="2" subValue="this week" footerText="Target: 4" themeColor="green" />
                <MetricCard title="Average Amount of Water" icon={<DropSimpleIcon size={14} weight="bold" />} mainValue="1.8L" subValue="every day" footerText="Missing 0.7L" footerColor="text-orange-500" themeColor="cyan" />
            </div>

            {/* 2. Main Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                <div className="flex flex-col gap-4">
                    {/* Automatic reporting */}
                    {/*<BaseCard title="Automatic reporting">*/}

                    {/*</BaseCard>*/}

                </div>
                <div className="flex flex-col gap-4">
                    {/* Export Data */}
                    {/*<BaseCard title="Export Data" badge="Premium" isLocked={true}>*/}

                    {/*</BaseCard>*/}

                    {/* Automatic Email */}
                    {/*<BaseCard title="Automatic Email">*/}

                    {/*</BaseCard>*/}
                </div>

            </div>
        </div>
    );
}
