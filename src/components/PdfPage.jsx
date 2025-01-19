import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown } from "lucide-react";
import { AssetPdfDocument } from "./AssetPdfdocument";

function PdfPage() {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <>
      {!showPdf ? (
        <button
          onClick={() => setShowPdf(true)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <FileDown className="w-5 h-5 mr-2" />
          Generate PDF
        </button>
      ) : (
        <PDFDownloadLink
          document={<AssetPdfDocument />}
          fileName="document.pdf"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          {({ loading }) =>
            loading ? (
              "Loading document..."
            ) : (
              <>
                <FileDown className="w-5 h-5 mr-2" />
                Download PDF
              </>
            )
          }
        </PDFDownloadLink>
      )}
    </>
  );
}

export default PdfPage;
