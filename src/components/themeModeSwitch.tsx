'use client';
import { useTheme } from "next-themes";
import { CiCloudMoon, CiCloudSun } from "react-icons/ci";

export default function ThemeModeSwitch() {

    const { theme, setTheme } = useTheme()
    const handleThemeChange = () => {
        if (theme === 'light') return setTheme("dark");
        else return setTheme("light");
    }

    return (
        <div onClick={handleThemeChange} className="cursor-pointer">
            <CiCloudSun size={32} className="dark:hidden" />
            <CiCloudMoon size={32} className="hidden dark:block"/>
        </div>
    )

}