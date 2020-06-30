/**
 * API Doc: https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest
 */
import axios from "axios";
import NProgress from "nprogress";
import '@/assets/plugin/nprogress.css'

const COVID_19_Instance = axios.create({
  baseURL: `https://api.covid19api.com/`,
});

COVID_19_Instance.interceptors.request.use((config) => {
  // Called on request
  NProgress.start();
  return config;
});
COVID_19_Instance.interceptors.response.use((response) => {
  // Called on response
  NProgress.done();
  return response;
});

// 返回所有地區每日最新數據、總數據
export const GET_COVID_19_Summary = () =>
  COVID_19_Instance.get("/summary").then((response) => response.data);

// 返回所有地區名稱
export const GET_COVID_19_Countries = () =>
  COVID_19_Instance.get("/countries").then((response) => response.data);

// 返回一個地區至今的某類別自第一日到今日
export const GET_COVID_19_CountryStatusFromDayOne = (country, status) =>
  COVID_19_Instance.get(`/dayone/country/${country}/status/${status}`).then(
    (response) => response.data
  );

// 返回一個國家特定時間內的資料
export const GET_COVID_19_CountryAllStatusFromDayOne = (
  country,
  startTime,
  endTime
) =>
  COVID_19_Instance.get(`/country/${country}?from=${startTime}&to=${endTime}`).then((response) => response.data);
