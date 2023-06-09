import { Document, Page, Image, View, Text } from "@react-pdf/renderer";
import { styles } from "./certificateStyle";
import moment from "moment";
const Template = ({ data }) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.main}>
            <View style={styles.section}>
              <Image
                alt="here"
                src={data?.logo_url ? data.logo_url : "/assets/images/logo.png"}
                style={{ height: "90px", width: "90px" }}
              />
              <Text style={styles.headerText}>Mentor Management System</Text>
            </View>
            <View>
              <Text style={styles.h1}>
                {data?.certification
                  ? data.certification
                  : "Certificate of Mentor Manager"}
              </Text>
              <Text style={styles.subtitle}>
                This certificate is awarded to
              </Text>
              <View style={styles.hr}>
                <Text style={styles.center}>
                  {data?.user?.first_name && data?.user?.last_name
                    ? data?.user?.first_name + " " + data?.user?.last_name
                    : ""}
                </Text>
              </View>
              <View>
                <Text style={styles.center}>
                  <Text style={styles.innerText}>
                    for your dedication and support as a mentor manager.
                  </Text>
                </Text>
                <Text style={[styles.center, styles.mt]}>
                  We would like to recognize your hardwork and contribution in
                  our program
                </Text>
              </View>
              <View style={styles.flexR}>
                <View style={styles.w30}>
                  <Image
                    src={
                      data?.signature ? data.signature : ""}
                    style={{ height: "40px", width: "200px" }}
                  />
                  <View style={styles.hr50} />
                  <Text style={styles.dateSubtitle}>signature</Text>
                </View>
                <View style={styles.w30}>
                  <Text style={styles.subtitle}>
                    {data?.date_of_issue
                      ? moment(data?.date_of_issue).format("MM-DD-YYYY")
                      : ""}
                  </Text>
                  <View style={styles.hr50} />
                  <Text style={styles.dateSubtitle}>date</Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.issueDate}>
                <Text>
                  {data?.date_of_issue
                    ? "Date of Issue: " +
                      moment(data?.date_of_issue).format("MM-DD-YYYY")
                    : "Date of Issue: "}
                </Text>
                <Text>
                  Certificate ID:{data?.certicate_id ? data.certicate_id : ""}{" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Text style={styles.issueDate}>Supported by: </Text>
                <Image
                  alt="signature"
                  src="/assets/images/andela_logo.png"
                  style={{ height: "50px", width: "100px" }}
                />
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Template;
