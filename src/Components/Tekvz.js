import React, { useState, useEffect } from "react";
import { PickList } from "primereact/picklist";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeflex/primeflex.css";
import { Dialog } from "primereact/dialog";
import cert from "../Json/Main_Certificate_List.json";
import awscert from "../Json/Aws_Certificate_List.json";
import googlcert from "../Json/Google_Certificate.json";
import ciscocert from "../Json/Cisco_Certificate_List.json";
import zoomcert from "../Json/Zoom_Certificate_List.json";
import kandycert from "../Json/Kandy_Certificate.json";
import rngcert from "../Json/Ring_Central_Certificate_List.json";
import mrsftcert from "../Json/Microsoft_Certificate_List.json";

function Tekvz() {
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [mainCertList, setMainCertList] = useState("");
  const [message, setMessage] = useState();
  const [headerMessage, setHeaderMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const onChange = (event) => {
    setSource(event.source);
    setTarget(event.target);
  };

  const getSelectedCert = (e) => {
    setTarget([]);
    if (e.value.code.includes("Aws")) {
      setSource(awscert);
    } else if (e.value.code.includes("Google")) {
      setSource(googlcert);
    } else if (e.value.code.includes("Cisco")) {
      setSource(ciscocert);
    } else if (e.value.code.includes("Microsoft")) {
      setSource(mrsftcert);
    } else if (e.value.code.includes("Zoom")) {
      setSource(zoomcert);
    } else if (e.value.code.includes("Ring")) {
      setSource(rngcert);
    }

    if (e.value.name.includes("Certifications")) {
      setMainCertList(e.value);
    }
  };

  const getResultSet = (e) => {
    if (mainCertList.length == 0) {
      setVisible(true);
      setHeaderMessage("Error Message:-");
      setMessage("Please select atleast one certification from the list!!!");
      return;
    }
    let response = 0;
    if (target.length != 0) {
      for (let i = 0; i < target.length; i++) {
        const data = target[i].data;
        response = response + data;
      }
      setVisible(true);
      setHeaderMessage("ResultSet:-");
      setMessage(`Tek Tokens for the selected certification list:- ${response}`);
      return;
    }
  };

  const resetData = (e) => {
    setTarget([]);
    setSource([]);
    setMainCertList([]);
  };

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="card flex justify-content-center" id="maindiv">
        {/* <p style={{fontSize: "15px"}}>
          <span style={{ color: "red", marginLeft: "59rem" }}>*</span>All fields
          are mandatory.
        </p> */}
        <Card className="flex-container">
          <div id="dropdown">
            <div id="drop1">
              <label htmlFor="maincertList">
                <strong>
                  Choose a certification:- <span style={{ color: "red" }}>*</span>
                </strong>
              </label>
              <br />
              <Dropdown
                id="maincertList"
                value={mainCertList}
                onChange={(e) => getSelectedCert(e)}
                options={cert}
                optionLabel="name"
                placeholder="Select a Certification"
                className="w-full md:w-15rem drop"
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="card">
        <PickList
          source={source}
          target={target}
          onChange={onChange}
          itemTemplate={itemTemplate}
          sourceHeader="Available Certification List"
          targetHeader="Selected Certification List"
          sourceStyle={{ height: "14rem" }}
          targetStyle={{ height: "14rem" }}
        />
      </div>
      <Button id="reset" label="Reset" onClick={() => resetData()} />
      <Button id="button1" label="Submit" onClick={() => getResultSet()} />
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

export default Tekvz;
