import React, { useEffect, useState } from "react";
import { Input, Button, notification, Select, Modal } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import LocationSearchInput from "./PlacesAutocomplete";

import "./Routes.css";

const { Option } = Select;

const EditRoute = ({ handleSaveRoute, route, open, handleClose }) => {
  const [routeProp, setRouteProp] = useState(route);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [stopErrorMsg, setStopsErrorMsg] = useState("");

  useEffect(() => {
    setRouteProp(route);
  }, [route]);

  const openNotification = () => {
    notification.info({
      message: `Success`,
      description: "Route saved successfully!",
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
    if (!routeProp.name.trim()) {
      setNameErrorMsg("Route name is required.");
      return;
    } else if (
      routeProp.stops.length < 2 ||
      routeProp.stops.includes("undefined")
    ) {
      setNameErrorMsg("");
      setStopsErrorMsg("Atleast 2 stops are required to create a route.");
      return;
    }
    setNameErrorMsg("");
    setStopsErrorMsg("");
    await handleSaveRoute(routeProp);
    openNotification();
    handleClose();
  };

  const onAddressSelect = (stop, index, address) => {
    // handleAddRoute(routeProp);
    const stopObj = { ...stop, address };
    let updatedStops = [...routeProp.stops];
    updatedStops[index] = stopObj;
    setRouteProp({ ...routeProp, stops: updatedStops });
  };

  return (
    <Modal
      title="Edit Route"
      centered
      visible={open}
      onCancel={handleClose}
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      {/* <div className="add-routes-div"> */}
      <div className="add-routes">
        <div className="edit-input-form">
          <span className="route-name">Route Name</span>
          <Input
            className="edit-route-input"
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
                  defaultAddress={stop.address}
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
        </div>
      </div>
    </Modal>
  );
};
export default EditRoute;
