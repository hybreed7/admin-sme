import React from 'react';
import { Form } from 'react-bootstrap';

function ToggleSlider({ checked, onChange }) {
  return (
    <div className="toggle-slider" >
      <Form.Check
        type="switch"
        id="custom-switch"
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default ToggleSlider;
