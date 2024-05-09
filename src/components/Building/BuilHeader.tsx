import { AppBar, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const useStyles = makeStyles(() => ({
  appBar: {
    marginTop: "17px",
    width: "calc(96% - 2rem)",
    margin: "0 1rem",
    marginLeft: "10px",
    borderRadius: "10px",
    height: "3rem",
    marginBottom: "14px",
    background:
      "linear-gradient(182.98deg, #01337C 28.19%, #013A8C 28.2%, #013A8C 96.59%, #00C17B 119.39%)",
  },
  heading: {
    fontWeight: "400",
    color: "white",
    textAlign: "left",
    position: "sticky",
    top: "0",
    zIndex: "999",
  },
}));

function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const { isSmallScreen } = useSelector((state: RootState) => state.screenSize);

  if (isSmallScreen) {
    return null;
  }

  return (
    <AppBar
      position="static"
      className={classes.appBar}
      style={{ width: "98%" }}
    >
      <Toolbar style={{ alignItems: "center",
          justifyContent: "center",
          minHeight: "100%", }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{justifyContent: "center"}}>
              <th style={{  width: "106px" }} className={classes.heading}>
                UNIT
              </th>
              <th style={{  width: "170px" }} className={classes.heading}>
                DEVICES
              </th>
              <th style={{  width: "201px" }} className={classes.heading}>
                INSTALLED DATE
              </th>
              <th style={{  width: "113px" }} className={classes.heading}>
                READINGS
              </th>
              <th style={{width: "281px", textAlign: "right" }} className={classes.heading}>
                TENANT NAME
              </th>
            </tr>
          </thead>
        </table>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
