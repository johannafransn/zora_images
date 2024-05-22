import React from "react";
const Header = () => {
  return (
    <header className="flex-col sm:flex-row flex justify-between items-start p-3">
      <div>
        <h2 className="font-normal text-3xl sm:text-4xl text-black">
          Explore Images
        </h2>
      </div>
    </header>
  );
};

export default Header;
