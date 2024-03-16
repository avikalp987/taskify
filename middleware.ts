import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server"
 
export default authMiddleware({
    publicRoutes: ["/"],
    afterAuth(auth, req) {
      if(auth.userId && auth.isPublicRoute)//it means we are authenticated and we are on a public route ie landing page
      {
        let path = "/select-org"

        if(auth.orgId)//if the logged in user has an organization id
        {
          path = `/organization/${auth.orgId}`
        }

        const orgSelection = new URL(path, req.url)//making the url by combining the path with the initial url that we get from the req.url
        return NextResponse.redirect(orgSelection)
      }

      if(!auth.userId && !auth.isPublicRoute)//if we are not logged in and we are not on a public route then make them login and redirect them to the url they wanted to access
      {
        return redirectToSignIn({
          returnBackUrl: req.url
        })
      }

      if(auth.userId && !auth.orgId && req.nextUrl.pathname!=="/select-org")//if we are logged in and we dont have any organization and we are not on select-org page them we will have to select or create an org
      {
        const orgSelection = new URL("/select-org", req.url)
        return NextResponse.redirect(orgSelection)
      }
    }
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};