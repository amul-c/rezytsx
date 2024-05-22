import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Unit from "./components/Unit/Unit";
import { useSelector, useDispatch } from "react-redux";
import {
  setSmallScreen,
  setLargeScreen,
} from "./components/Slices/ScreenSizeSlice";
import { RootState } from "./store";
import MobileUnit from "./components/Unit/MobileUnit";
import { useEffect } from "react";
import MobileFooter from "./components/MobileFooter";
import MobileHome from "./components/MobileHome";
import HomeMoreInfo from "./components/HomeMoreInfo";
import UnitMoreInfo from "./components/Unit/UnitMoreInfo";
import TenantList from "./components/TenantList/TenantList";
import TenantMobile from "./components/TenantList/TenantMobile";
import Building from "./components/Buildings/Buildings";
import BuildingMobile from "./components/Buildings/BuildingMobile";
import BuildingUnits from "./components/Building/BuildingUnits";
import FireAlarm from "./components/FireAlarm/FireAlarm";
// import { useParams } from 'react-router-dom';
import UnitsProperty from "./components/UnitsProperty/UnitsProperty";

function App() {
  const { isLargeScreen } = useSelector((state: RootState) => state.screenSize);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        dispatch(setSmallScreen());
      } else {
        dispatch(setLargeScreen());
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <>
      <Routes>
        {isLargeScreen ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<MobileHome />} />
        )}
        {isLargeScreen ? (
          <Route path="/unit/:buildingId/:unitId" element={<Unit />} />
        ) : (
          <Route path="/homemoreinfo/unit/:unitId" element={<MobileUnit />} />
        )}
        <Route path="/homemoreinfo" element={<HomeMoreInfo />} />
        <Route path="/unitmoreinfo" element={<UnitMoreInfo />} />
        {isLargeScreen ? (
          <Route path="/tenant/:propertyId" element={<TenantList />} />
        ) : (
          <Route
            path="/homemoreinfo/tenant/:propertyId"
            element={<TenantMobile />}
          />
        )}
        {isLargeScreen ? (
          <Route path="/buildings/:propertyId" element={<Building />} />
        ) : (
          <Route
            path="homemoreinfo/buildings/:propertyId"
            element={<BuildingMobile />}
          />
        )}
 

        {isLargeScreen ? (
          <Route path="/building/:buildingId" element={<BuildingUnits />} />
        ) : (
          <Route
            path="/homemoreinfo/building/:buildingName/:buildingId"
            element={<BuildingUnits />}
          />
        )}

        {isLargeScreen ? (
          <Route
            path="/propertyUnits/:propertyId"
            element={<UnitsProperty />}
          />
        ) : (
          <Route
            path="/homemoreinfo/propertyUnits/:propertyId"
            element={<UnitsProperty />}
          />
        )}
        <Route
          path="/device/:deviceName/info/property/:propertyId"
          element={<FireAlarm />}
        ></Route>
      </Routes>
      {isLargeScreen ? "" : <MobileFooter />}
    </>
  );
}

export default App;
