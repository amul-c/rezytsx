import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Header() {
  const { isSmallScreen } = useSelector((state: RootState) => state.screenSize);

  if (isSmallScreen) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: "17px",
     

        marginLeft: "10px",
        marginRight: "10px",
        borderRadius: "10px",
        height: "3rem",
        marginBottom: "14px",
        background:
          "linear-gradient(182.98deg, #01337C 28.19%, #013A8C 28.2%, #013A8C 96.59%, #00C17B 119.39%)",
        position: "sticky",
        top: "1rem",
      
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ justifyContent: "center" }}>
              <th style={{ width: "200px", fontWeight: "400", color: "white", textAlign: "left" }}>
                DEVICES
              </th>
              <th style={{ width: "373px", fontWeight: "400", color: "white", textAlign: "left" }}>
                PROPERTY
              </th>
              <th style={{ width: "201px", fontWeight: "400", color: "white", textAlign: "left" }}>
                INSTALLED DATE
              </th>
              <th style={{ width: "358px", fontWeight: "400", color: "white", textAlign: "left" }}>
                READINGS
              </th>
              <th style={{ width: "358px", textAlign: "right", fontWeight: "400", color: "white" }}>
                STATUS
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default Header;
