import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

// custom layout for the marketing page
const MarketingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="h-full bg-slate-100">
            {/* Navbar */}
            <Navbar />

            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
     );
}
 
export default MarketingLayout;