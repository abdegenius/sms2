import { connector, api_url } from "../index";
const BASE_URL = api_url.BASE_URL;
export async function ALL_STAT(zone_id, callback, onError) {
try {
    let url = (zone_id == 0 ? '/api/dashboard' : '/api/dashboard?zone_id='+zone_id)
    let dashboard = await connector.get(`${url}`);
    let { data } = dashboard.data;
    let status = dashboard.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw dashboard;
    return dashboard;
} 
catch (err) {
    onError && onError(err);
    return false;
}

}


