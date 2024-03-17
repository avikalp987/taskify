import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

// we did this so that we dont want to check on the entire site, we only want to check in some pages of the site
const PlatformLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ClerkProvider>
            <Toaster />
            {children}
        </ClerkProvider>
    )
}

export default PlatformLayout