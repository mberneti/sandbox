import * as urls from "../urls";
import api from "../apiInstance";
import { filterResponse, catchError } from "../filterResponse";

export const getProvinces = () => api.get(urls.PROVINCES).then(filterResponse).catch(catchError);

export const getCities = (provinceId) => api.get(urls.PROVINCES + `/${provinceId}/cities`).then(filterResponse).catch(catchError);

export const getDistricts = (provinceId, cityId) => api.get(urls.PROVINCES + `/${provinceId}/cities/${cityId}/districts`).then(filterResponse).catch(catchError);