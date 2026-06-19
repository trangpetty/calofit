import OnboardingForm from "@/app/onboarding/components/OnboardingForm";
import {getProfile} from "@/app/onboarding/actions";
import {redirect} from "next/navigation";
import { auth } from "@/auth";

export default async function Page () {
    const session = await auth();
    const isLoggedIn = !!session;

    if (isLoggedIn) {
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