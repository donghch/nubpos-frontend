import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const axiosMockInstance = axios.create();

export const axiosMockAdapter = new AxiosMockAdapter(
    axiosMockInstance, { delayResponse: 0}
);

export default axiosMockInstance;