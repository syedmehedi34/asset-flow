// import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown } from "lucide-react";
import { AssetPdfDocument } from "./AssetPdfdocument";

function PdfPage({ asset }) {
  // console.log(asset);
  // const [showPdf, setShowPdf] = useState(false);

  return (
    <>
      <PDFDownloadLink
        document={<AssetPdfDocument asset={asset} />}
        fileName="document.pdf"
        className="inline-flex items-center px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <>
          <FileDown className="w-5 h-5 mr-2" />
          Download PDF
        </>
      </PDFDownloadLink>
      {/* )} */}
    </>
  );
}

export default PdfPage;
