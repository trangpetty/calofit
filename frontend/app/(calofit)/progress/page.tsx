import {requireAuth} from "@/app/utils/auth";
import Header from "@/app/(calofit)/dashboard/components/header";
import ContentProgress from "@/app/(calofit)/progress/components/content";
import {getProgress} from "@/app/(calofit)/progress/actions";
import ExpiredModal from "@/components/page/ExpiredModal";

export const metadata = {
    title: 'Progress | Calofit',
};

export default async function FoodLogPage () {
    const { session, isExpired } = await requireAuth();

    const res = await getProgress();

    const progress = res.data;

    return (
        <main>
            {!isExpired && (
                <div className="min-h-screen bg-gray-50 pb-12">
                    <Header />
                    <ContentProgress profile={progress as any} />
                </div>

            )}
            <ExpiredModal isExpired={isExpired} />
        </main>
    )
}