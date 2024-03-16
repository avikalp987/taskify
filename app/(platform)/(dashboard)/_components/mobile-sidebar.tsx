"use client"

import { Button } from "@/components/ui/button"
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

export const MobileSidebar = () => {

    const pathname = usePathname()
    const [isMounted, setIsmounted] = useState(false)

    const onOpen = useMobileSidebar((state) => state.onOpen)
    const onClose = useMobileSidebar((state) => state.onClose)
    const isOpen = useMobileSidebar((state) => state.isOpen)

    useEffect(()=>{
        setIsmounted(true)
    }, [])

    useEffect(() => {
        onClose()
    }, [pathname, onClose])

    if(!isMounted)
    {
        return null
    }

    return (
        <>
            <Button
                onClick={onOpen}
                className="block md:hidden mr-2"
                variant={"ghost"}
                size={"sm"}
            >
                <Menu className="h-4 w-4"/>
            </Button>

            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side={"left"}
                    className="p-2 pt-10"
                >
                    <Sidebar 
                        storageKey="t-sidebar-mobile-state"
                    />
                </SheetContent>
            </Sheet>
        </>
    )
}