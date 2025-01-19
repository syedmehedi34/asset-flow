import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
  },
  companyHeader: {
    marginBottom: 30,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginBottom: 8,
  },
  companyInfo: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 4,
    lineHeight: 1.4,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: "#1e3a8a",
    marginVertical: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  columnHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#4b5563",
  },
  cell: {
    fontSize: 10,
    color: "#1f2937",
  },
  col1: { width: "25%" },
  col2: { width: "25%" },
  col3: { width: "25%" },
  col4: { width: "25%" },
  summary: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f8fafc",
  },
  summaryText: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center",
  },
});

export const AssetPdfDocument = ({ asset }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Company Information */}
        <View style={styles.companyHeader}>
          <Text style={styles.companyName}>{asset?.companyName}</Text>
          <Text style={styles.companyInfo}>123 Technology Park, Suite 500</Text>
          <Text style={styles.companyInfo}>San Francisco, CA 94105</Text>
          <Text style={styles.companyInfo}>Phone: (555) 123-4567</Text>
          <Text style={styles.companyInfo}>Email: {asset?.hr_email}</Text>
        </View>

        <Text style={styles.title}>Asset Management Report</Text>

        {/* Asset Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, styles.col1]}>Asset Name</Text>
            <Text style={[styles.columnHeader, styles.col2]}>Quantity</Text>
            <Text style={[styles.columnHeader, styles.col3]}>
              Requesting Date
            </Text>
            <Text style={[styles.columnHeader, styles.col4]}>
              Receiving Date
            </Text>
          </View>

          {/* {assets.map((asset, index) => ( */}
          <View style={styles.tableRow}>
            <Text style={[styles.cell, styles.col1]}>{asset?.assetName}</Text>
            <Text style={[styles.cell, styles.col2]}>1</Text>
            <Text style={[styles.cell, styles.col3]}>
              {asset?.assetRequestingDate}
            </Text>
            <Text style={[styles.cell, styles.col4]}>
              {asset?.approvalDate}
            </Text>
          </View>
          {/* ))} */}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Document generated on {currentDate} • {asset?.companyName}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
