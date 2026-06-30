import {requireAuth} from "@/app/utils/auth";
import {getProfile} from "@/app/(calofit)/onboarding/actions";
import {
    Fire,
    Target,
    CalendarCheck,
    Gear,
    Drop,
    BowlFood,
    Barbell
} from "@phosphor-icons/react/dist/ssr";
import {ProfileResult} from "@/app/types/onboarding";
import {redirect} from "next/navigation";
import Header from "@/app/(calofit)/dashboard/components/header";
import ContentDashBoard from "@/app/(calofit)/dashboard/components/content";
import ExpiredModal from "@/components/page/ExpiredModal";

export const metadata = {
    title: 'Dashboard | Calofit',
};

export default async function DashPage () {
    const { session, isExpired } = await requireAuth();

    const res = await getProfile();
    const profile = res.data;
    if (isExpired) {
        return (
            <div className="min-h-screen bg-gray-50 pb-12">
                <ExpiredModal isExpired={isExpired} />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Header />
            <ContentDashBoard profile={profile as any} />
        </div>
    )
}