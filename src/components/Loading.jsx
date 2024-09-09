import React from "react";

function Loader() {
  return (
    <div className="loader-container">
      <style>{`
       
        .loader-container {
          font-family: 'Poppins', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .custom-loader {
          width: 180px;
          height: 180px;
          position: relative;
          border-radius: 50%;
          animation: load 4s linear infinite;
        }
        .custom-loader::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          box-shadow: 0 0 4px #fff5;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .custom-span {
          color: whitesmoke;
          text-transform: uppercase;
          font-size: 20px;
          position: absolute;
          font-weight: bold;
          letter-spacing: 4px;
          animation: color 4s linear infinite;
        }
        @keyframes load {
          0% {
            transform: rotate(0deg);
            box-shadow: 0 3px 4px rgb(2,220,220);
          }
          50% {
            transform: rotate(180deg);
            box-shadow: 0 3px 4px rgb(0,255,155);
          }
          100% {
            transform: rotate(360deg);
            box-shadow: 0 3px 4px rgb(238,2,206);
          }
        }
        @keyframes color {
          0% {
            color: rgb(2,220,220);
          }
          50% {
            color: rgb(0,255,155);
          }
          100% {
            color: rgb(238,2,206);
          }
        }
      `}</style>
      <div className="custom-loader"></div>
      <span className="custom-span">Loading...</span>
    </div>
  );
}

export default Loader;
