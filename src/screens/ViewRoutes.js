import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import MapView from "./MapView";
import EditRoute from "./EditRouteDialog";
import { Steps } from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

import "./Routes.css";

const { Step } = Steps;

const ViewRoutes = ({ routeList, handleDeleteRoute, handleEditRoute }) => {
  const [routes, setRoutes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [routeOnMap, setRouteOnMap] = useState({});
  const [routeToEdit, setRouteToEdit] = useState({
    name: "",
    status: "Inactive",
    id: "",
    direction: "",
    stops: [],
  });

  useEffect(() => {
    const routeListCopy = [...routeList];
    for (let route of routeListCopy) {
      route["expanded"] = false;
    }
    setRoutes(routeListCopy);
    if (routeList.length) {
      setRouteOnMap(routeListCopy[0]);
    } else {
      setRouteOnMap({});
    }
  }, [routeList]);

  const expandRoute = (routeId) => {
    let routeListCopy = [...routes];
    for (let route of routeListCopy) {
      if (route.id === routeId) {
        route["expanded"] = !route["expanded"];
      }
    }
    setRoutes(routeListCopy);
  };

  const onClickEditRoute = (route) => {
    setRouteToEdit(route);
    setOpenModal(true);
  };

  const handleRadioSelection = (e, route) => {
    if (e.target.checked) {
      setRouteOnMap(route);
    } else {
      setRouteOnMap({});
    }
  };

  return (
    <div className="add-routes-wrapper">
      <div className="add-routes-div">
        <div className="add-routes">
          <span className="add-routes-text">View Routes</span>
          <div className="input-form">
            {routes.map((route, index) => {
              return (
                <div
                  key={index}
                  className="routes-card"
                  style={{
                    backgroundColor:
                      route.status === "Inactive" ? "cadetblue" : "white",
                  }}
                >
                  <div className="card-name-div">
                    {route.name}
                    <div className="icons-div">
                      <EditOutlined onClick={() => onClickEditRoute(route)} />
                      <DeleteOutlined
                        onClick={() => handleDeleteRoute(route.id)}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      route.expanded ? "stops-card-expanded" : "stops-card"
                    }
                  >
                    {route.expanded ? (
                      <div>
                        <Steps
                          progressDot
                          current={route.stops.length - 1}
                          direction="vertical"
                          className="ant-steps"
                        >
                          {route.stops.map((stop, index) => {
                            return <Step key={stop.id} title={stop.address} />;
                          })}
                        </Steps>
                      </div>
                    ) : null}
                    <div className="stops-div">
                      {route.expanded ? (
                        <div>
                          {"Hide stops"}
                          <UpOutlined
                            className="arrow-icons"
                            onClick={() => expandRoute(route.id)}
                          />
                        </div>
                      ) : (
                        <div>
                          {"Show stops"}
                          <DownOutlined
                            className="arrow-icons"
                            onClick={() => expandRoute(route.id)}
                          />
                        </div>
                      )}
                      <div>
                        Show on map{" "}
                        <Radio
                          className="arrow-icons"
                          checked={route.id === routeOnMap.id}
                          onClick={(e) => handleRadioSelection(e, route)}
                        />
                      </div>
                    </div>
                  </div>
                  <EditRoute
                    open={openModal}
                    handleClose={() => setOpenModal(false)}
                    handleSaveRoute={handleEditRoute}
                    route={routeToEdit}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="map-view-div">
        <MapView route={routeOnMap} />
      </div>
    </div>
  );
};
export default ViewRoutes;
