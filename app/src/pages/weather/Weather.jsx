import "./weather.scss";

export default function Weather() {
  return (
    <div className="weather">
      <div className="weatherTitleContainer">
        <h1 className="weatherTitle">Weather</h1>
      </div>
      <div className="weatherTop">
          <div className="weatherTopLeft">
              Weather temperature
          </div>
      <div className="weatherBottom">
        <div className="weatherBottomLeft">
              Weather UV
          </div>
        </div>
      </div>
      </div>
  );
}