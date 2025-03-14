"use client";
import { useEffect, useState } from "react";
import patreonStyles from "./patreon-styles";
import { usePatreons } from "./use-patreons";
import { getColorMode } from "~src/utils/colormode";
import { safeDecodeURI } from "~src/utils/uri";
import { BunnyIcon } from "~src/icons/bunny-icon";

interface NameAsPatreonProps {
    name: string;
}

export const NameAsPatreon: React.FunctionComponent<NameAsPatreonProps> = ({
    name,
}) => {
    const { data: patreons, isLoading } = usePatreons();
    const patronExists = patreons?.[name];
    !isLoading;
    const isMissingPreferences =
        !patreons?.[name]?.preferences || !patreons?.[name]?.preferences?.hide;
    if (patronExists && !isLoading && isMissingPreferences) {
        let color = 0;
        let showIcon = true;

        if (patreons[name].preferences) {
            color = patreons[name].preferences.colorPreference;
            showIcon = patreons[name].preferences.showIcon;
        }

        return <PatreonName name={name} icon={showIcon} color={color} />;
    }

    return <>{safeDecodeURI(name)}</>;
};

interface PatreonNameProps {
    name: string;
    color: number;
    icon?: boolean;
    size?: number;
}

export const PatreonName: React.FunctionComponent<PatreonNameProps> = ({
    name,
    color = 0,
    icon = true,
    size = 20,
}) => {
    const [dark, setDark] = useState(true);
    useEffect(function () {
        setDark(getColorMode() !== "light");
    }, []);

    const colors = patreonStyles();

    const matchingStyle = colors.find((val) => val.id == color) ?? colors[0];
    const style = dark ? matchingStyle.style[0] : matchingStyle.style[1];

    return (
        <>
            <span style={style}>{name}</span>
            {icon && (
                <span>
                    {" "}
                    <BunnyIcon size={size} />
                </span>
            )}
        </>
    );
};

export default PatreonName;
