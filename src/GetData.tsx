import { DateTime } from "luxon";

type forecastType = { area: string; forecast: string };
type solunarType = {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonphase: string;
};

const areas = [
  "Bedok",
  "Boon Lay",
  "Central Water Catchment",
  "Sembawang",
  "Sentosa",
];
const areasToRegions: { [area: string]: string } = {
  Bedok: "East",
  "Boon Lay": "West",
  "Central Water Catchment": "Central",
  Sembawang: "North",
  Sentosa: "South",
};

const stations: string[] = [
  "Upper Changi Road North",
  "Old Choa Chu Kang Road",
  "Clementi Road",
  "Woodlands Avenue 9",
  "Sentosa",
];
const stationsToRegions: { [area: string]: string } = {
  "Upper Changi Road North": "East",
  "Old Choa Chu Kang Road": "West",
  "Clementi Road": "Central",
  "Woodlands Avenue 9": "North",
  Sentosa: "South",
};

function GetCurentTimeStamp() {
  const timeString: string =
    DateTime.now().toFormat("yyyy-MM-dd") +
    "T" +
    DateTime.now().toFormat("hh:mm:ss");
  return timeString;
}
const GetweatherData = async () => {
  GetCurentTimeStamp();
  const api_call: string =
    "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=" +
    GetCurentTimeStamp();
  const response = await fetch(api_call);
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  let result = myJson.items[0].forecasts.filter(
    (item: forecastType) => areas.indexOf(item.area) >= 0
  );
  for (let i = 0; i < result.length; i++) {
    result[i].area = areasToRegions[result[i].area];
  }
  return result;
};

const GetWindSpeedData = async () => {
  const api_call: string =
    "https://api.data.gov.sg/v1/environment/wind-speed?date_time=" +
    GetCurentTimeStamp();
  const response = await fetch(api_call);
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  const metadata = myJson.metadata;
  const units: string = metadata.reading_unit;
  const stationList = metadata.stations;
  const readings = myJson.items[0].readings;
  // console.log(metadata);
  let stationReadings: forecastType[] = [];
  for (let i = 0; i < readings.length; ++i) {
    const reading = readings[i];
    const station_name = stationList.find(
      (s: any) => s.device_id === reading.station_id
    ).name;
    stationReadings[i] = {
      area: station_name,
      forecast: (reading.value as string) + " " + units,
    };
  }
  // console.log(stationReadings);
  let result = stationReadings.filter(
    (item: forecastType) => stations.indexOf(item.area) >= 0
  );
  // console.log(result);
  for (let i = 0; i < result.length; i++) {
    result[i].area = stationsToRegions[result[i].area];
  }
  // console.log(result);
  return result;
};

const GetUVIndexData = async () => {
  const api_call: string =
    "https://api.data.gov.sg/v1/environment/uv-index?date_time=" +
    GetCurentTimeStamp();
  const response = await fetch(api_call);
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  const reading = myJson.items[0].index[0];
  // console.log(myJson);

  return [{ area: "Singapore", forecast: reading.value }];
};

const GetSolunarData = async () => {
  const coords = { longitude: "1.44387", latitude: "103.78538" };
  const date = DateTime.now().toFormat("yyyyMMdd");
  const tz = DateTime.now().offset / 60;

  let solunarActivity: solunarType = {
    sunrise: "",
    sunset: "",
    moonrise: "",
    moonset: "",
    moonphase: "",
  };

  const api_call =
    "https://api.solunar.org/solunar/" +
    "," +
    coords.longitude +
    "," +
    coords.latitude +
    "," +
    date +
    "," +
    "-" +
    tz.toString();
  console.log(api_call);
  const response = await fetch(api_call);
  const myJson = await response.json(); //extract JSON from the http response
  const datelength = DateTime.now().toFormat("yyyyMd").length;
  console.log(myJson);
  // do something with myJson
  solunarActivity.sunrise = myJson.sunRise.slice(datelength - 1);
  solunarActivity.sunset = myJson.sunSet.slice(datelength - 1);
  solunarActivity.moonrise = myJson.moonRise.slice(datelength - 1);
  solunarActivity.moonset = myJson.moonSet.slice(datelength - 1);
  solunarActivity.moonphase = myJson.moonPhase;

  return solunarActivity;
};

const RefreshData = async () => {
  const response = await fetch(
    "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?"
  );
  //   const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
};

export {
  GetweatherData,
  GetWindSpeedData,
  GetUVIndexData,
  GetSolunarData,
  areasToRegions,
};
export type { forecastType, solunarType };
export default RefreshData;
