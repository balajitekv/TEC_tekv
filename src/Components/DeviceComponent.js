import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import deviceListOptions from "../Json/Device_List.json";
import platformListOptions from "../Json/Platform_List.json";

function DeviceComponent() {
  const [callOptionList, setCallOptionList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [headerMessage, setHeaderMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const resetData = (e) => {
    setCallOptionList([]);
    setDeviceList([]);
    setFromDate(null);
    setToDate(null);
  };

  const getResultSet = (e) => {
    if (callOptionList.length === 0) {
      setVisible(true);
      setHeaderMessage("Error Message:-");
      setMessage("Please select atleast one calling option from the list.");
      return;
    }

    if (deviceList.length === 0) {
      setVisible(true);
      setHeaderMessage("Error Message:-");
      setMessage("Please select atleast one device from the list.");
      return;
    }

    if (fromDate === null) {
      setVisible(true);
      setHeaderMessage("Error Message:-");
      setMessage("Please choose from date.");
      return;
    }

    if (toDate === null) {
      setVisible(true);
      setHeaderMessage("Error Message:-");
      setMessage("Please choose to date.");
      return;
    }

    let response = 0;
    const deviceData = deviceList.data;
    const callOptions = callOptionList.name;
    
let currentDay = new Date(fromDate);
let weekHasWeekday = false;

while (currentDay <= toDate) {
  if (currentDay.getDay() >= 1 && currentDay.getDay() <= 5) { // Monday to Friday
    weekHasWeekday = true;
  }

  if (currentDay.getDay() === 0 || currentDay.getDay() === 6) { // Sunday or Saturday
    if (weekHasWeekday) {
      response++; // Calculate one token for the week if it had at least one weekday
    }
    weekHasWeekday = false; // Reset for the next week
  }

  currentDay.setDate(currentDay.getDate() + 1); // Move to the next day
}

// Add a token if the last week ends on a weekday
if (weekHasWeekday) {
  response++;
}

response = response * deviceData; // Calculate the total token count


    


    if (
      (callOptions === "PBX" && deviceList.name === "Soft Client/UC Client") ||
      (callOptions === "PBX" && deviceList.name === "BYOC") ||
      (callOptions === "PBX" && deviceList.name === "Video Collab Device(ROW)") ||
      (callOptions === "PBX+SBC" && deviceList.name === "SBC") ||
      (callOptions === "PBX+SBC" && deviceList.name === "BYOC") ||
      (callOptions === "PBX+SBC" && deviceList.name === "Headset") ||
      (callOptions === "PBX+SBC" &&
        deviceList.name === "Video Collab Device(ROW)") ||
      (callOptions === "PBX+SBC" &&
        deviceList.name === "Soft Client/UC Client") ||
      (callOptions === "UCaaS" && deviceList.name === "Soft Client/UC Client") ||
      (callOptions === "Contact Center" &&
        deviceList.name === "Soft Client/UC Client") ||
      (callOptions === "Contact Center" && deviceList.name === "SBC") ||
      (callOptions === "Contact Center" && deviceList.name === "BYOC") ||
      (callOptions === "Contact Center" && deviceList.name === "Headset") ||
      (callOptions === "Contact Center" &&
        deviceList.name === "Video Collab Device(ROW)") ||
      (callOptions === "CCaaS" &&
        deviceList.name === "Video Collab Device(ROW)") ||
      (callOptions === "CPaaS" && deviceList.name === "Video Collab Device(ROW)")
    ) {
      setVisible(true);
      setHeaderMessage("Message:-");
      setMessage("Not Available");
      return;
    }

    setVisible(true);
    setHeaderMessage("ResultSet:-");
    setMessage(`Tek Tokens for the selected date range:- ${response}`);
    return;
  };

  return (
    <React.Fragment>
      <div className="card flex justify-content-center card-style" id="maindiv">
        <p style={{ fontSize: "15px" }}>
          <span className="astr">*</span>All fields are mandatory.
        </p>
        <Card className="flex-container device-card">
          <div id="dropdown">
            <div id="drop1">
              <label htmlFor="callOptionList">
                <strong>
                  Choose Calling Options:-{" "}
                  <span style={{ color: "red" }}>*</span>
                </strong>
              </label>
              <br />
              <Dropdown
                id="callOptionList"
                value={callOptionList}
                onChange={(e) => setCallOptionList(e.value)}
                options={platformListOptions}
                optionLabel="name"
                placeholder="Select Calling Options"
                className="w-full md:w-15rem drop"
              />
            </div>

            <div id="drop2">
              <label htmlFor="deviceList">
                <strong>
                  Choose a device:-<span style={{ color: "red" }}>*</span>
                </strong>
              </label>
              <br />
              <Dropdown
                id="deviceList"
                value={deviceList}
                onChange={(e) => setDeviceList(e.value)}
                options={deviceListOptions}
                optionLabel="name"
                placeholder="Select a device"
                className="w-full md:w-15rem drop"
              />
            </div>
          </div>
          <div id="calendar">
            <div id="calendar1" className="justify-content-center">
              <label className="label" htmlFor="calendar-style1">
                <strong>
                  Choose From date:- <span style={{ color: "red" }}>*</span>
                </strong>
              </label>
              <br />
              <Calendar
                id="calendar-style1"
                value={fromDate}
                onChange={(e) => setFromDate(e.value)}
              />
            </div>

            <div id="calendar2" className="justify-content-center">
              <label className="label" htmlFor="calendar-style2">
                <strong>
                  Choose To date:- <span style={{ color: "red" }}>*</span>
                </strong>
              </label>
              <br />
              <Calendar
                id="calendar-style2"
                value={toDate}
                onChange={(e) => setToDate(e.value)}
              />
            </div>
          </div>
        </Card>
        <Button id="reset" label="Reset" onClick={() => resetData()} />
        <Button id="button2" label="Submit" onClick={() => getResultSet()} />
      </div>
      <Dialog
        header={headerMessage}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">{message}</p>
      </Dialog>
    </React.Fragment>
  );
}

export default DeviceComponent;
