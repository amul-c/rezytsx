import { AppBar, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function UnitHeader() {
  const { isSmallScreen } = useSelector((state: RootState) => state.screenSize);

  if (isSmallScreen) {
    return null;
  }

  return (
    <AppBar
      position="static"
      style={{
        width: "98%",
        marginTop: "17px",
        margin: "0 1rem",
        marginLeft: "10px",
        borderRadius: "10px",
        height: "3rem",
        marginBottom: "14px",
        background:
          "linear-gradient(182.98deg, #01337C 28.19%, #013A8C 28.2%, #013A8C 96.59%, #00C17B 119.39%)",
      }}
    >
      <Toolbar
        style={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ justifyContent: "center" }}>
              <th
                style={{
                  width: "200px",
                  fontWeight: "400",
                  color: "white",
                  textAlign: "left",
                  position: "sticky",
                  top: "0",
                  zIndex: "999",
                }}
              >
                UNIT
              </th>
              <th
                style={{
                  width: "445px",
                  fontWeight: "400",
                  color: "white",
                  textAlign: "left",
                  position: "sticky",
                  top: "0",
                  zIndex: "999",
                }}
              >
                DEVICES
              </th>
              <th
                style={{
                  width: "201px",
                  fontWeight: "400",
                  color: "white",
                  textAlign: "left",
                  position: "sticky",
                  top: "0",
                  zIndex: "999",
                }}
              >
                INSTALLED DATE
              </th>
              <th
                style={{
                  width: "322px",
                  fontWeight: "400",
                  color: "white",
                  textAlign: "left",
                  position: "sticky",
                  top: "0",
                  zIndex: "999",
                }}
              >
                READINGS
              </th>
              <th
                style={{
                  width: "322px",
                  textAlign: "right",
                  fontWeight: "400",
                  color: "white",
                  position: "sticky",
                  top: "0",
                  zIndex: "999",
                }}
              >
                TENANT NAME
              </th>
            </tr>
          </thead>
        </table>
      </Toolbar>
    </AppBar>
  );
}

export default UnitHeader;
