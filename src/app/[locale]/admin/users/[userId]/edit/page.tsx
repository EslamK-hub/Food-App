import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { getUser } from "@/server/db/users";
import { redirect } from "next/navigation";

async function EditUserPage({
    params,
}: {
    params: Promise<{ userId: string; locale: Locale }>;
}) {
    const { locale, userId } = await params;
    const translations = await getTrans(locale);
    const user = await getUser(userId);
    if (!user) {
        redirect(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    }
    return (
        <main>
            <section className="section-gap">
                <div className="container">
                    <EditUserForm translations={translations} user={user} />
                </div>
            </section>
        </main>
    );
}

export default EditUserPage;
