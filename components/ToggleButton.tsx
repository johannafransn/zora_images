import React from "react";

type ToggleButtonProps = {
  value: string;
  onChange: (value: string) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, onChange }) => {
  const handleChange = () => {
    if (value === "latest") {
      onChange("relevant");
    } else {
      onChange("latest");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between toggle">
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              onChange={handleChange}
              type="checkbox"
              name="dark-mode"
              id="dark-toggle"
              className="checkbox hidden"
            />
            <div className="block border-[1px] dark:border-black border-gray-900 w-14 h-8 rounded-full"></div>
            <div className="dot absolute left-1 top-1 dark:bg-black bg-gray-800 w-6 h-6 rounded-full transition"></div>
          </div>
          <div className="ml-3 dark:text-black text-gray-900 font-medium">
            {value}
          </div>
        </label>
      </div>
    </>
  );
};

export default ToggleButton;
