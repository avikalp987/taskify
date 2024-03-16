import { OrganizationList } from "@clerk/nextjs"

export default function CreateOrganizationPage(){
    return(
        <OrganizationList 
            hidePersonal //for removing the personal account
            afterSelectOrganizationUrl={"/organization/:id"}
            afterCreateOrganizationUrl={"/organization/:id"}
        />
    )
}