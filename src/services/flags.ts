import axios from 'axios';

const API_URL = 'http://localhost:3001/feature-flags';

export interface FeatureFlag {
    id: string;
    name: string;
    environment: 'development' | 'staging' | 'production';
    enabled: boolean;
    createdDate: string;
}

export const getFeatureFlags = async (): Promise<FeatureFlag[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const updateFeatureFlagStatus = async (
    id: string,
    enabled: boolean
): Promise<FeatureFlag> => {
    const response = await axios.patch(`${API_URL}/${id}`, { enabled });
    return response.data;
};




