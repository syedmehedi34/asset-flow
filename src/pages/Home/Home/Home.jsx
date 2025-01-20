import useAssetDistributionData from "../../../hooks/useAssetDistributionData";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import About from "../About";
import Banner from "../Banner";
import LimitedStock from "../LimitedStock";
import Packages from "../Packages";
import PendingRequests from "../PendingRequest";
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
  console.log(assetDistributionData);

  if (loading || isRoleLoading) {
    return <h1 className="mt-32">Loading</h1>;
  }
  return (
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
        </>
      ) : (
        <About />
      )}
    </div>
  );
};

export default Home;
