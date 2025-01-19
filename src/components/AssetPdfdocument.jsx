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

export const AssetPdfDocument = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const assets = [
    {
      name: "Dell XPS 15 Laptop",
      quantity: 2,
      receivingDate: "2024-03-01",
      returnDate: "2025-03-01",
    },
    {
      name: "iPhone 14 Pro",
      quantity: 3,
      receivingDate: "2024-02-15",
      returnDate: "2025-02-15",
    },
    {
      name: 'Dell 27" Monitor',
      quantity: 4,
      receivingDate: "2024-01-20",
      returnDate: "2025-01-20",
    },
    {
      name: "Herman Miller Chair",
      quantity: 2,
      receivingDate: "2024-03-10",
      returnDate: "2025-03-10",
    },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Company Information */}
        <View style={styles.companyHeader}>
          <Text style={styles.companyName}>TechCorp Solutions</Text>
          <Text style={styles.companyInfo}>123 Technology Park, Suite 500</Text>
          <Text style={styles.companyInfo}>San Francisco, CA 94105</Text>
          <Text style={styles.companyInfo}>Phone: (555) 123-4567</Text>
          <Text style={styles.companyInfo}>Email: assets@techcorp.com</Text>
        </View>

        <Text style={styles.title}>Asset Management Report</Text>

        {/* Asset Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.columnHeader, styles.col1]}>Asset Name</Text>
            <Text style={[styles.columnHeader, styles.col2]}>Quantity</Text>
            <Text style={[styles.columnHeader, styles.col3]}>
              Receiving Date
            </Text>
            <Text style={[styles.columnHeader, styles.col4]}>Return Date</Text>
          </View>

          {assets.map((asset, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.cell, styles.col1]}>{asset.name}</Text>
              <Text style={[styles.cell, styles.col2]}>{asset.quantity}</Text>
              <Text style={[styles.cell, styles.col3]}>
                {asset.receivingDate}
              </Text>
              <Text style={[styles.cell, styles.col4]}>{asset.returnDate}</Text>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total Number of Assets: {assets.length}
          </Text>
          <Text style={styles.summaryText}>
            Total Quantity:{" "}
            {assets.reduce((sum, asset) => sum + asset.quantity, 0)}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Document generated on {currentDate} • TechCorp Solutions Asset
            Management System
          </Text>
        </View>
      </Page>
    </Document>
  );
};
