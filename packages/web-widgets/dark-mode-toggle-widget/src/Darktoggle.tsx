import { useEffect, Fragment, createElement } from "react";
import { DarktogglePreviewProps } from "../typings/DarktoggleProps";

const Darktoggle = ({ classNameToToggle }: DarktogglePreviewProps) => {
    useEffect(() => {
        document.documentElement.classList.add(classNameToToggle);
        return () => {
            document.documentElement.classList.remove(classNameToToggle);
        };
    }, []);
    return <Fragment></Fragment>;
};

export default Darktoggle;
