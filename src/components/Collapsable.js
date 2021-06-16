/*

  Uses the Collapse element to create a variable-size div for its contents

  props:
    children - react element

*/
import React from 'react';
import Collapse from 'react-collapse';
import { presets } from 'react-motion';
import '../styles/MarzEg.css';

export default function Collapsable({ children }) {

  return (
    <div>
      <Collapse
        style={{
            margin: "auto",
            width: "100%",
            textAlign: "center",
            backgroundColor: "rgba(255,255,255,0.4)",
            marginBottom: '1em'
        }}
        isOpened
        springConfig={{ ...presets['gentle'] }}
      >
        <div style={{ height: "100%", padding: '2em' }}>
          <div style={{ padding: '2em' }}>
            {children}
          </div>
        </div>
      </Collapse>
    </div>
);
}
