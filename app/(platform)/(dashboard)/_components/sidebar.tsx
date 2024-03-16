"use client"

import { useLocalStorage } from "usehooks-ts"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion } from "@/components/ui/accordion"  
import { Plus } from "lucide-react"
import Link from "next/link"
import { NavItem, OrganizationType } from "./nav-item"

interface SidebarProps {
    storageKey?: string
}

export const Sidebar = (
    {
        storageKey = "t-sidebar-state"
    }: SidebarProps
) => {

    //state that is going to keep track which accordian is expanded and which is not
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
            storageKey, 
            {}
        )

    //getting the current organization
    const { 
        organization: activeOrganization, 
        isLoaded: isLoadedOrg 
    } = useOrganization()

    //getting the organization lists
    const { 
        userMemberships,
        isLoaded: isLoadedOrgList
    } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })

    //getting the default accordian value
    const defaultAccordianValue: string[] = Object.keys(expanded)
    .reduce((acc: string[], key: string) => {
        if(expanded[key])
        {
            acc.push(key)
        }

        return acc
    }, [])

    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id]
        }))
    }

    if(!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading)
    {
        return (
            <>
                <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-10 w-[50%]"/>
                    <Skeleton className="h-10 w-10"/>
                </div>

                <div className="space-y-2">
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                    <NavItem.Skeleton />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">
                    Workspaces
                </span>

                <Button
                    asChild
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    className="ml-auto"
                >
                    <Link
                        href={"/select-org"}
                    >
                        <Plus className="h-4 w-4"/>
                    </Link>
                </Button>
            </div>

            <Accordion
                type="multiple"
                defaultValue={defaultAccordianValue}
                className="space-y-2"
            >
                {userMemberships.data.map(({ organization }) => (
                    <NavItem 
                        key={organization.id}
                        isActive={activeOrganization?.id === organization.id}
                        isExpanded = { expanded[organization.id] }
                        organization={organization as OrganizationType}
                        onExpand={onExpand}
                    />
                ))}
            </Accordion>
        </>
    )
}