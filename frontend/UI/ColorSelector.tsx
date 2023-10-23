import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";

interface ColorPickerProps {
  color: string;
  label?: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: ColorResult) => {
    console.log(color);
    onChange(color.hex);
  };

  return (
    <div>
      <div className="rounded-lg w-fit flex items-center gap-3 border border-gray-100 overflow-hidden">
        <div
          onClick={handleClick}
          className={`w-14 h-14 border-r border-gray-100`}
          style={{ backgroundColor: color }}
        />
        <div className="pr-3">
          {label && (
            <p className="text-xs font-normal text-gray-400">{label}</p>
          )}
          <p className="font-semibold text-gray-600">{color}</p>
        </div>
      </div>
      {displayColorPicker ? (
        <div style={{ position: "absolute", zIndex: "2" }}>
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
