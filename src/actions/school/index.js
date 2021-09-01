import { connector, api_url } from "../index";
const BASE_URL = api_url.BASE_URL;

export async function GET_SCHOOLS(zone_id, callback, onError) {
  try {
    let schools = await connector.get(`/api/schools?zone_id=${zone_id}`);
    let { data } = schools.data;
    let status = schools.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw schools;

    return schools;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function GET_SCHOOL_BY_ID(id, callback, onError) {
  try {
    let schools = await connector.get(`/api/schools?school_id=${id}`);
    let { data } = schools.data;
    let status = schools.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw schools;

    return schools;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function GET_SCHOOL_DASHBOARD(id, callback, onError) {
  try {
    let dashboard = await connector.get(`/api/dashboard/${id}`);
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


export async function GET_SCHOOL_STAFF_PROFILES(id, callback, onError) {
  try {
    let profiles = await connector.get(`/api/staff/profiles/school/${id}`);
    let { data } = profiles.data;
    let status = profiles.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw profiles;
    return profiles;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function GET_SCHOOL_STAFF_RECRUITMENTS(id, callback, onError) {
  try {
    let recruitments = await connector.get(`/api/recruitment/${id}`);
    let { data } = recruitments.data;
    let status = recruitments.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw recruitments;
    
    return recruitments;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

export async function GET_SCHOOL_STAFF_PAYROLLS(id, callback, onError) {
  try {
    let payrolls = await connector.get(`/api/payroll/school/${id}`);
    let { data } = payrolls.data;
    let status = payrolls.data.status;

    status === "success" && callback && callback(data);
    if (status === "error") throw payrolls;
  
    return payrolls;
  } catch (err) {
    onError && onError(err);
    return false;
  }
}

