import OnboardingForm from "@/app/(calofit)/onboarding/components/OnboardingForm";
import {getProfile} from "@/app/(calofit)/onboarding/actions";
import {redirect} from "next/navigation";
import {requireAuth} from "@/app/utils/auth";

export default async function Page () {
    const {session, token} = await requireAuth();

    if (session && token) {
        const res = await getProfile();
        if(res.status === "success") {
            redirect("/onboarding");
        }
    }
    return (
        <main className="bg-gray-50 flex flex-col items-center justify-center p-4">
            <OnboardingForm />
        </main>
    )
}