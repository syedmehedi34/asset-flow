/* eslint-disable no-unused-vars */
import useAllAssets from "../../hooks/useAllAssets";

const AssetList = () => {
  const [assets, loadingAssets, refetchAssets] = useAllAssets();
  console.log(assets);
  // console.log(loadingAssets);

  return (
    <div className="my-24">
      <h1>Assets here</h1>
    </div>
  );
};

export default AssetList;
