import { HOST } from './host';

export const GET_DIRECTIONS_URL = `${HOST}/practices/GetPractices`;
export const UPDATE_DIRECTION_URL = `${HOST}/practices/UpdatePractices`;
export const CREATE_DIRECTION_URL = `${HOST}/practices/CreatePractices`;

const DIRECTIONS_API = {
  GET_DIRECTIONS_URL,
  UPDATE_DIRECTION_URL,
  CREATE_DIRECTION_URL,
};

export default DIRECTIONS_API;
