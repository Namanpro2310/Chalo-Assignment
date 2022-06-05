import React, { useState } from "react";
import { Input, Button, notification, Select } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import LocationSearchInput from "./PlacesAutocomplete";
import { v4 as uuid } from "uuid";
import MapView from "./MapView";

import "./Routes.css";

const { Option } = Select;

const AddRoute = ({ handleAddRoute }) => {
  const [routeProp, setRouteProp] = useState({
    name: "",
    status: "Inactive",
    id: "",
    direction: "",
    stops: [],
  });

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [stopErrorMsg, setStopsErrorMsg] = useState("");

  const openNotification = () => {
    notification.info({
      message: `Success`,
      description: "Route added successfully!",
      placement: "bottomLeft",
    });
  };

  const onGenderChange = (value) => {
    setRouteProp({ ...routeProp, status: value });
  };

  const onNameChange = (e) => {
    setRouteProp({ ...routeProp, name: e.target.value });
  };

  const handleAddStopClick = () => {
    let updatedStops = [...routeProp.stops];
    updatedStops.push("undefined");
    setRouteProp({ ...routeProp, stops: updatedStops });
  };

  const remove = (stop, index) => {
    let updatedStops = [...routeProp.stops];
    updatedStops.splice(index, 1);
    setRouteProp({ ...routeProp, stops: updatedStops });
  };

  const handleSubmit = async () => {
    const route = { ...routeProp };
    route.id = uuid();
    if (!route.name.trim()) {
      setNameErrorMsg("Route name is required.");
      return;
    } else if (route.stops.length < 2) {
      setNameErrorMsg("");
      setStopsErrorMsg("Atleast 2 stops are required to create a route.");
      return;
    } else if (route.stops.includes("undefined")) {
      setNameErrorMsg("");
      setStopsErrorMsg("Please enter a valid stop.");
      return;
    }
    setNameErrorMsg("");
    setStopsErrorMsg("");
    await handleAddRoute(route);
    openNotification();
    setRouteProp({
      name: "",
      status: "Inactive",
      id: "",
      direction: "",
      stops: [],
    });
  };

  const onAddressSelect = (stop, index, address) => {
    // handleAddRoute(routeProp);
    const stopObj = { ...stop, address };
    let updatedStops = [...routeProp.stops];
    updatedStops[index] = stopObj;
    setRouteProp({ ...routeProp, stops: updatedStops });
  };

  return (
    <div className="add-routes-wrapper">
      <div className="add-routes-div">
        <div className="add-routes">
          <span className="add-routes-text">Add Routes</span>
          <div className="input-form">
            <span className="route-name">Route Name</span>
            <Input
              className="route-name-input"
              placeholder="Enter Name"
              onChange={onNameChange}
              value={routeProp.name}
            />
            <span className="helper-text">{nameErrorMsg}</span>
            <span className="route-name">Status</span>
            <Select
              placeholder="Select Status"
              className="route-status-input"
              onChange={onGenderChange}
              value={routeProp.status}
              allowClear
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
            {routeProp.stops.map((stop, index) => {
              return (
                <div key={index} className="stop-div">
                  <LocationSearchInput
                    onSelect={(stop, address) =>
                      onAddressSelect(stop, index, address)
                    }
                  />
                  <MinusCircleOutlined onClick={() => remove(stop, index)} />
                </div>
              );
            })}
            <Button
              type="secondary"
              className="add-stop-button"
              onClick={handleAddStopClick}
            >
              + Add Stop
            </Button>
            <span className="helper-text">{stopErrorMsg}</span>
            <Button
              type="primary"
              className="submit-button"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
      <div className="map-view-div">
        <MapView route={routeProp} />
      </div>
    </div>
  );
};
export default AddRoute;
