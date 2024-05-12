'use client';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiCloudMoon, CiCloudSun } from "react-icons/ci";

export default function ThemeModeSwitch() {

    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme()
    const IconTheme = theme === 'dark' ? CiCloudSun : CiCloudMoon;

    useEffect(() => { setMounted(true) }, [])

    if (!mounted) return null;

    const handleThemeChange = () => {
        if (theme === 'light') return setTheme("dark");
        else return setTheme("light");
    }

    return (
        <div onClick={handleThemeChange} className="cursor-pointer">
            <IconTheme size={32} />
        </div>
    )

}