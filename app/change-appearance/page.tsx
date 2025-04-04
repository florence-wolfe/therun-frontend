import React from "react";
import { getSession } from "~src/actions/session.action";
import { getUserPatreonData } from "~src/actions/user-patreon-data.action";
import { LoginWithPatreon } from "~app/change-appearance/login-with-patreon";
import { getBaseUrl } from "~src/actions/base-url.action";
import PatreonSection from "~app/change-appearance/patreon-section";
import buildMetadata from "~src/utils/metadata";

export const revalidate = 0;

export default async function ChangeAppearance(props: {
    searchParams: Promise<{ [_: string]: string }>;
}) {
    const searchParams = await props.searchParams;
    const session = await getSession();
    const userPatreonData = await getUserPatreonData(searchParams);
    const baseUrl = await getBaseUrl();

    return (
        <div>
            {!userPatreonData ? (
                <LoginWithPatreon session={session} baseUrl={baseUrl} />
            ) : (
                <PatreonSection
                    session={session}
                    userPatreonData={userPatreonData}
                />
            )}
        </div>
    );
}

export const metadata = buildMetadata({
    title: "Change Appearance",
    description:
        "Change your appearance on The Run. Thanks for being a supporter!",
    index: false,
});
