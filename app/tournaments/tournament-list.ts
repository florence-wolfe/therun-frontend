/* eslint-disable sonarjs/no-duplicate-string */
// Will just make this DB values in the future (I really will), no time now

type CombinedTournament = {
    guidingTournament: string;
    tournaments: string[];
};

type Tournament = {
    tournament: string;
};

type TournamentEntryValue = Tournament | CombinedTournament;

const tournamentEntries: Array<[string, TournamentEntryValue]> = [
    ["aethermancer", { tournament: "Aethermancer Contest" }],
    [
        "DefeatGanonCC",
        { tournament: "Defeat Ganon No SRM Community Clash Main Event" },
    ],
    ["dirtythirty", { tournament: "Dirty Thirty Sapphire Tourney 2" }],
    ["gsa", { tournament: "PACE Fall 2024 Qualifiers 3" }],
    ["hgss", { tournament: "HGSS Blitz" }],
    ["lego", { tournament: "LEGO Star Wars BTR" }],
    [
        "moist",
        {
            tournament: "MoistCr1tikal Tournament 5",
        },
    ],
    [
        "ludwig",
        {
            tournament: "MoistCr1tikal Tournament 5",
        },
    ],
    [
        "fast50",
        {
            tournament: "MoistCr1tikal Tournament 5",
        },
    ],
    ["saesr", { tournament: "NCW Seeding" }],
    ["WaifuRuns", { tournament: "WaifuRuns RE4 Tournament" }],
    [
        "SMOAnyPercentCC",
        { tournament: "Super Mario Odyssey Community Clash Qualifier" },
    ],
    ["ccg", { tournament: "CCG Community Clash: New Super Luigi U" }],
    [
        "hazebladeinvitational",
        { tournament: "Hazeblade Invitational Qualifiers ft. Resident Evil 4" },
    ],
    ["basementcup", { tournament: "Ultimate Basement Cup 2023" }],
    ["tcs", { tournament: "LEGO Star Wars BTR" }],
    ["nitro_cup", { tournament: "Nitro Cup SMO" }],
    ["nitro_tournament", { tournament: "Nitro Tournament - TMA" }],
    ["knuckles", { tournament: "Knuckles Story Eclipse the Record" }],
    [
        "3dmm",
        {
            guidingTournament: "3D Mario Madness Season 3",
            tournaments: [
                "3DMM SM64 70 Star",
                "3DMM SMS Any%",
                "3DMM SMG Any%",
                "3DMM SMG2 Any%",
                "3DMM SM3DW Any%",
                "3DMM SMO Any%",
            ],
        },
    ],
    ["rayman", { tournament: "Rayman 1 BTR" }],
    ["kakarikoclassic2024", { tournament: "Kakariko Classic 2024" }],
    ["the_octogone", { tournament: "Nitro Speedrun - The Octogone" }],
];

const tournamentMap: Map<string, Tournament | CombinedTournament> = new Map(
    tournamentEntries,
);

export const getAllTournamentSlugs = (): string[] => {
    return Array.from(tournamentMap.keys());
};

export const getTournamentNameFromSlug = (
    slug: string,
): Tournament | CombinedTournament | undefined => {
    return tournamentMap.get(slug);
};
