// This component monitors the url and changes the organization accordingly
"use client"

import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs"
import { useEffect } from "react"

export const OrgControl = () => {

    //if we want to get the params in a client component we use a hook called useParams
    const params = useParams()
    const { setActive } = useOrganizationList()

    useEffect(()=>{
        if(!setActive)
        {
            return
        }

        setActive({
            organization: params.organizationId as string
        })
    }, [params.organizationId, setActive])

    return null;
}