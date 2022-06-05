import React, { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import AddRoute from "./screens/AddRoute";
import ViewRoutes from "./screens/ViewRoutes";
import Header from "./screens/Header";

function App() {
  const [routeList, setRouteList] = useState([]);

  const handleAddRoute = (route) => {
    console.log(route, "addedRoute");
    let routeListCopy = [...routeList];
    routeListCopy.push(route);
    setRouteList(routeListCopy);
  };

  const handleDeleteRoute = (routeId) => {
    let routeListCopy = [...routeList];

    routeListCopy = routeListCopy.filter((route) => {
      return route.id !== routeId;
    });
    setRouteList(routeListCopy);
  };

  const handleEditRoute = (routeParam) => {
    let routeListCopy = [...routeList];

    for (let route of routeListCopy) {
      if (route.id === routeParam.id) {
        route = Object.assign(route, routeParam);
      }
    }
    setRouteList(routeListCopy);
  };

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/AddRoutes"
            element={<AddRoute handleAddRoute={handleAddRoute} />}
          />
          <Route
            path="/ViewRoutes"
            element={
              <ViewRoutes
                routeList={routeList}
                handleDeleteRoute={handleDeleteRoute}
                handleEditRoute={handleEditRoute}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
