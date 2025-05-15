import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle MongoDB ID objects
api.interceptors.request.use(config => {
  // Log all API requests in development
  console.log(`API ${config.method.toUpperCase()} Request:`, config.url, config.data || {});
  
  // If there's a URL parameter that might be a MongoDB ID object
  if (config.url && config.url.includes('/') && config.params) {
    // Extract the MongoDB ID if it's in object format
    for (const key in config.params) {
      if (typeof config.params[key] === 'object' && config.params[key].$oid) {
        config.params[key] = config.params[key].$oid;
      }
    }
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout')
};

// Helper function to handle MongoDB ID formats
const extractMongoId = (id) => {
  if (id && typeof id === 'object' && id.$oid) {
    return id.$oid;
  }
  return id;
};

export const airlineService = {
  getAllAirlines: () => api.get('/airlines'),
  getAirlineById: (id) => api.get(`/airlines/${extractMongoId(id)}`),
  createAirline: (airlineData) => api.post('/airlines', airlineData),
  updateAirline: (id, airlineData) => {
    console.log('updateAirline called with ID:', id, 'and data:', airlineData);
    return api.put(`/airlines/${extractMongoId(id)}`, airlineData);
  },
  deleteAirline: (id) => {
    console.log('deleteAirline called with ID:', id);
    return api.delete(`/airlines/${extractMongoId(id)}`);
  }
};

export const aircraftService = {
  getAllAircraft: () => api.get('/aircraft'),
  getAircraftById: (id) => api.get(`/aircraft/${extractMongoId(id)}`),
  createAircraft: (aircraftData) => api.post('/aircraft', aircraftData),
  updateAircraft: (id, aircraftData) => api.put(`/aircraft/${extractMongoId(id)}`, aircraftData),
  deleteAircraft: (id) => api.delete(`/aircraft/${extractMongoId(id)}`),
  bulkCreateAircraft: (aircraftDataArray) => api.post('/aircraft/bulk', aircraftDataArray)
};

export const terminalService = {
  getAllTerminals: () => api.get('/terminals'),
  getTerminalById: (id) => api.get(`/terminals/${extractMongoId(id)}`),
  createTerminal: (terminalData) => api.post('/terminals', terminalData),
  updateTerminal: (id, terminalData) => api.put(`/terminals/${extractMongoId(id)}`, terminalData),
  deleteTerminal: (id) => api.delete(`/terminals/${extractMongoId(id)}`)
};

export const gateService = {
  getAllGates: () => api.get('/gates'),
  getGateById: (id) => api.get(`/gates/${extractMongoId(id)}`),
  createGate: (gateData) => api.post('/gates', gateData),
  updateGate: (id, gateData) => api.put(`/gates/${extractMongoId(id)}`, gateData),
  deleteGate: (id) => api.delete(`/gates/${extractMongoId(id)}`)
};

export const passengerService = {
  getAllPassengers: () => api.get('/passengers'),
  getPassengerById: (id) => api.get(`/passengers/${extractMongoId(id)}`),
  createPassenger: (passengerData) => api.post('/passengers', passengerData),
  updatePassenger: (id, passengerData) => api.put(`/passengers/${extractMongoId(id)}`, passengerData),
  deletePassenger: (id) => api.delete(`/passengers/${extractMongoId(id)}`),
  bulkCreatePassengers: (passengerDataArray) => api.post('/passengers/bulk', passengerDataArray)
};

export const flightService = {
  getAllFlights: () => api.get('/flights'),
  getFlightById: (id) => api.get(`/flights/${extractMongoId(id)}`),
  createFlight: (flightData) => api.post('/flights', flightData),
  updateFlight: (id, flightData) => api.put(`/flights/${extractMongoId(id)}`, flightData),
  deleteFlight: (id) => api.delete(`/flights/${extractMongoId(id)}`)
};

export const ticketService = {
  getAllTickets: () => api.get('/tickets'),
  getTicketById: (id) => api.get(`/tickets/${extractMongoId(id)}`),
  createTicket: (ticketData) => api.post('/tickets', ticketData),
  updateTicket: (id, ticketData) => api.put(`/tickets/${extractMongoId(id)}`, ticketData),
  deleteTicket: (id) => api.delete(`/tickets/${extractMongoId(id)}`)
};

export default {
  authService,
  airlineService,
  aircraftService,
  terminalService,
  gateService,
  passengerService,
  flightService,
  ticketService
};