import { Helmet } from "react-helmet-async";
import useAssetDistributionData from "../../../hooks/useAssetDistributionData";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import About from "../About";
import Banner from "../Banner";
import ContactDeveloper from "../ContactDeveloper";
import LimitedStock from "../LimitedStock";
import MyPending from "../MyPending";
import Packages from "../Packages";
import PendingRequests from "../PendingRequest";
import PieChartSection from "../PieChartSection";
import RecentAssigned from "../RecentAssigned";
import TopRequested from "./TopRequested";

const Home = () => {
  // const [isRole] = useRole();
  const { user, loading } = useAuth();
  const [isRole, isRoleLoading] = useRole();
  const [
    assetDistributionData,
    loadingAssetDistributionData,
    refetchAssetDistributionData,
    searchText,
    setSearchText,
    category,
    setCategory,
  ] = useAssetDistributionData();
  // pending requests
  // const pendingRequests = assetDistributionData
  // console.log(assetDistributionData);

  if (loading || isRoleLoading) {
    return <h1 className="mt-32">Loading</h1>;
  }
  return (
    <>
      <Helmet>
        <title>AssetFlow | Home</title>
      </Helmet>
      ;
      <div>
        {!user ? (
          <>
            <Banner />
            <About />
            <Packages />
          </>
        ) : isRole?.role === "hr_manager" ? (
          <>
            <PendingRequests
              assetDistributionData={assetDistributionData}
            ></PendingRequests>

            <TopRequested></TopRequested>
            <LimitedStock></LimitedStock>
            <PieChartSection></PieChartSection>
            <RecentAssigned></RecentAssigned>

            <ContactDeveloper></ContactDeveloper>
          </>
        ) : (
          <MyPending></MyPending>
        )}
      </div>
    </>
  );
};

export default Home;
