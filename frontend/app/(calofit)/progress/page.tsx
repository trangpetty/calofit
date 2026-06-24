import {requireAuth} from "@/app/utils/auth";
import {getProfile} from "@/app/(calofit)/onboarding/actions";
import {redirect} from "next/navigation";
import Header from "@/app/(calofit)/dashboard/components/header";
import ContentProgress from "@/app/(calofit)/progress/components/content";

export const metadata = {
    title: 'Progress | Calofit',
};

export default async function FoodLogPage () {
    const { session, token } = await requireAuth();

    const res = await getProfile();
    if (res.status === 'error' || !res.data) {
        redirect("/onboarding");

    }
    const profile = res.data;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Header />
            <ContentProgress profile={profile as any} />
        </div>
    )
}