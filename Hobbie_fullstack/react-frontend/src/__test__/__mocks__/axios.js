// const axios = {
//     get: jest.fn(() => Promise.resolve({ data: {} })),
//     create: () => axios,
//     defaults: {
//       adapter: {},
//     },
//     interceptors: {
//         request: { use: jest.fn(), eject: jest.fn() },
//         response: { use: jest.fn(), eject: jest.fn() },
//     },
//   };

//   export default   axios  ;;

import mockAxios from "jest-mock-axios";

export default mockAxios;
