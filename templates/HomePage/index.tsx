"use client";

import Layout from "@/components/Layout";
import AffiliateImpressions from "@/components/AffiliateImpressions";
import Slider from "./Slider";
import EarningItems from "./EarningItems";
import EarningChart from "./EarningChart";
import Earning from "./Earning";

const HomePage = () => {
    return (
        <Layout title="Welcome back👋" hideBannerSidebar>
            <div className="flex grow 2xl:block">
                <div className="container py-11 2xl:py-0">
                    <Slider />
                    <div className="flex -mx-4 md:block md:mx-0">
                        <EarningItems />
                        <EarningChart />
                    </div>
                </div>
                <div className="sidebar-border py-11 2xl:py-0 2xl:flex 2xl:items-start 2xl:-mx-4 2xl:mt-8 md:block md:mx-0">
                    <Earning />
                    <AffiliateImpressions className="2xl:w-[calc(50%-2rem)] 2xl:mx-4 2xl:pt-8 md:w-full md:mx-0" />
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
