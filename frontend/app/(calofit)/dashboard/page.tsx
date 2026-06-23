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

export const metadata = {
    title: 'Dashboard | Calofit',
};

export default async function DashPage () {
    const { session, token } = await requireAuth();

    const res = await getProfile();
    if (res.status === 'error' || !res.data) {
        redirect("/onboarding");

    }
    const profile = res.data;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Header />
            <ContentDashBoard profile={profile as any} />
        </div>
    )
}