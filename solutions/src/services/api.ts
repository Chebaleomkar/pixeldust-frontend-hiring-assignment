/**
 * API Service Layer
 * 
 * Centralized API communication layer using Axios.
 * Handles all HTTP requests to the Shift Booking API.
 */

import axios, { AxiosInstance, AxiosError } from 'axios';
import { Shift, ApiError } from '@/types/shift';
import { API_BASE_URL, API_ENDPOINTS } from '@/utils/constants';

// ============================================
// Axios Instance Configuration
// ============================================

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============================================
// Response Interceptor for Error Handling
// ============================================

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

        // Network error
        if (!error.response) {
            apiError.message = 'Network error. Please check your connection and ensure the API server is running.';
            apiError.code = 'NETWORK_ERROR';
        }

        return Promise.reject(apiError);
    }
);

// ============================================
// API Methods
// ============================================

/**
 * Fetch all shifts from the API
 */
export async function fetchAllShifts(): Promise<Shift[]> {
    const response = await apiClient.get<Shift[]>(API_ENDPOINTS.SHIFTS);
    return response.data;
}

/**
 * Fetch a single shift by ID
 */
export async function fetchShiftById(id: string): Promise<Shift> {
    const response = await apiClient.get<Shift>(API_ENDPOINTS.GET_SHIFT(id));
    return response.data;
}

/**
 * Book a shift by ID
 * 
 * @throws ApiError if:
 * - Shift is already booked
 * - Shift has already started
 * - Shift overlaps with another booked shift
 */
export async function bookShift(id: string): Promise<Shift> {
    const response = await apiClient.post<Shift>(API_ENDPOINTS.BOOK_SHIFT(id));
    return response.data;
}

/**
 * Cancel a shift by ID
 * 
 * @throws ApiError if shift is not booked
 */
export async function cancelShift(id: string): Promise<Shift> {
    const response = await apiClient.post<Shift>(API_ENDPOINTS.CANCEL_SHIFT(id));
    return response.data;
}

// ============================================
// Export API Object
// ============================================

export const shiftApi = {
    fetchAll: fetchAllShifts,
    fetchById: fetchShiftById,
    book: bookShift,
    cancel: cancelShift,
};

export default shiftApi;
