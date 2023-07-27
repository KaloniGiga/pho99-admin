import { axiosInstance } from "../http"

export const getAdPopUp = () => {
    return axiosInstance.get('/ad-pop-up');
}