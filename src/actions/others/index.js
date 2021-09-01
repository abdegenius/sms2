import { connector, api_url } from "../index";
const BASE_URL = api_url.BASE_URL;
export async function ZONES(callback, onError) {
  try {
    let zones = await connector.get(`/api/zones`);
    let { data } = zones.data;
    let status = zones.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw zones;
    return zones;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function DASHBOARD(callback, onError) {
  try {
    let dashboard = await connector.get(`/api/zones`);
    let { data } = dashboard.data;
    let status = dashboard.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw dashboard;

    return dashboard;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

// export async function GET_SCHOOLS_DASHBOARD(zone_id, callback, onError) {
//   try {
//     let schools = await connector.get(`/dashboard/list`);
//     let { data } = schools.data;
//     let status = schools.data.status;

//     status === "success" && callback && callback(data);
//     if (status === "error") throw schools;

//     return schools;
//   } catch (err) {
//     onError && onError(err);
//     return false;
//   }
// }
