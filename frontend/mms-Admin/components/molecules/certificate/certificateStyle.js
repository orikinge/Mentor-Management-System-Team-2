import { StyleSheet } from "@react-pdf/renderer";
export const styles = StyleSheet.create({
  page: {
    margin: 0,
    backgroundColor: "#058b94",
  },
  main: {
    padding: "10px",
    width: "96%",
    height: "100%",
    backgroundColor: "white",
    boxShadow: "rgba(255, 255, 255, 1) 8px 8px 0px",

    margin: "20px auto",
    paddingBottom: "3px",
  },
  section: {
    boxShadow: "rgba(255, 255, 255, 1) 8px 8px 0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center", 
    alignItems: "center",
  },
  headerText: {
    fontSize: "26px",
    fontWeight: "900",
    width: "250px",
    color: "black",
    fontStyle: "bold",
    marginLeft:"8px"
  },
  h1: {
    color: "#023c40",
    fontSize: "48px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    textAlign: "center",
    marginTop: "16px",
  },
  container: {
    border: "16px solid white",
    margin: "20px",
  },
  hr: {
    width: "70%",
    borderBottom: "1px solid green",
    margin: "40px  auto",
    marginBottom: "25px",
  },
  center: {
    textAlign: "center",
    fontSize: "14px",
  },
  bold: {
    fontStyle: "bold",
    fontWeight: "900",
    color: "black",
  },
  mt: {
    marginTop: "3px",
    marginBottom: "15px",
  },
  mt10: {
    marginTop: "10px",
  },
  innerText: {
    fontWeight: "900",
    fontSize: "15px",
    marginRight: "10px",
  },
  flexR: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "30px",
    alignItems: "center",
  },
  hr50: {
    width: "100%",
    borderTop: "1px solid green",
    marginBottom: "2px",
  },
  w30: {
    width: "30%",
  },

  dateSubtitle: {
    marginTop: "8px",
    fontSize: "15px",
    textAlign: "center",
    marginBottom: "15px",
  },
  issueDate: {
    fontSize: "11px",
    fontStyle: "italic",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
});
