import { MetadataRoute } from "next";
import { getPaginatedUsers } from "~src/lib/users";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const users = await getPaginatedUsers(1, 50000);

    return users.items
        .map((user) => {
            try {
                return {
                    url: "https://therun.gg/" + user.username,
                    lastModified: new Date(),
                    changeFrequency: "weekly",
                    priority: 0.8,
                };
            } catch (_) {
                return null;
            }
        })
        .filter((res) => !!res) as MetadataRoute.Sitemap;
}
