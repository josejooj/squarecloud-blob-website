import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

interface Props {
    trigger: React.ReactNode,
    children: React.ReactNode
}

export default function ResponsivePopover({ trigger, children }: Props) {

    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) return (
        <Popover>
            <PopoverTrigger asChild>{trigger}</PopoverTrigger>
            <PopoverContent className='p-1 max-h-[256px] overflow-y-auto custom-scrollbar'>{children}</PopoverContent>
        </Popover >
    )

    return (
        <Drawer>
            <DrawerTrigger asChild>{trigger}</DrawerTrigger>
            <DrawerContent className="p-2 max-h-[50vh]">{children}</DrawerContent>
        </Drawer>
    )


}