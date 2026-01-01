import axios, { AxiosInstance, AxiosError } from 'axios';
import { Shift, ApiError } from '@/types/shift';
import { API_BASE_URL, API_ENDPOINTS } from '@/utils/constants';

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const apiError: ApiError = {
            message: 'An unexpected error occurred',
            statusCode: error.response?.status,
        };

        if (error.response?.data) {
            const errorData = error.response.data as { message?: string };
            apiError.message = errorData.message || error.message;
        } else if (error.message) {
            apiError.message = error.message;
        }

        if (!error.response) {
            apiError.message = 'Network error. Please check your connection and ensure the API server is running.';
            apiError.code = 'NETWORK_ERROR';
        }

        return Promise.reject(apiError);
    }
);

export async function fetchAllShifts(): Promise<Shift[]> {
    const response = await apiClient.get<Shift[]>(API_ENDPOINTS.SHIFTS);
    return response.data;
}

export async function fetchShiftById(id: string): Promise<Shift> {
    const response = await apiClient.get<Shift>(API_ENDPOINTS.GET_SHIFT(id));
    return response.data;
}

export async function bookShift(id: string): Promise<Shift> {
    const response = await apiClient.post<Shift>(API_ENDPOINTS.BOOK_SHIFT(id));
    return response.data;
}

export async function cancelShift(id: string): Promise<Shift> {
    const response = await apiClient.post<Shift>(API_ENDPOINTS.CANCEL_SHIFT(id));
    return response.data;
}

export const shiftApi = {
    fetchAll: fetchAllShifts,
    fetchById: fetchShiftById,
    book: bookShift,
    cancel: cancelShift,
};

export default shiftApi;
