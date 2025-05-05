const PageTitle = ({ heading, subHeading }) => {
  return (
    <div className="bg-teal-800 text-white py-5 px-6 rounded-t-md shadow-md">
      <h2 className="text-2xl font-bold">{heading}</h2>
      <p className="text-sm text-gray-300 mt-1">{subHeading}</p>
    </div>
  );
};

export default PageTitle;
