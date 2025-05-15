import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout')
};

export const airlineService = {
  getAllAirlines: () => api.get('/airlines'),
  getAirlineById: (id) => api.get(`/airlines/${id}`),
  createAirline: (airlineData) => api.post('/airlines', airlineData),
  updateAirline: (id, airlineData) => api.put(`/airlines/${id}`, airlineData),
  deleteAirline: (id) => api.delete(`/airlines/${id}`)
};

export const aircraftService = {
  getAllAircraft: () => api.get('/aircraft'),
  getAircraftById: (id) => api.get(`/aircraft/${id}`),
  createAircraft: (aircraftData) => api.post('/aircraft', aircraftData),
  updateAircraft: (id, aircraftData) => api.put(`/aircraft/${id}`, aircraftData),
  deleteAircraft: (id) => api.delete(`/aircraft/${id}`),
  bulkCreateAircraft: (aircraftDataArray) => api.post('/aircraft/bulk', aircraftDataArray)
};

export const terminalService = {
  getAllTerminals: () => api.get('/terminals'),
  getTerminalById: (id) => api.get(`/terminals/${id}`),
  createTerminal: (terminalData) => api.post('/terminals', terminalData),
  updateTerminal: (id, terminalData) => api.put(`/terminals/${id}`, terminalData),
  deleteTerminal: (id) => api.delete(`/terminals/${id}`)
};

export const gateService = {
  getAllGates: () => api.get('/gates'),
  getGateById: (id) => api.get(`/gates/${id}`),
  createGate: (gateData) => api.post('/gates', gateData),
  updateGate: (id, gateData) => api.put(`/gates/${id}`, gateData),
  deleteGate: (id) => api.delete(`/gates/${id}`)
};

export const passengerService = {
  getAllPassengers: () => api.get('/passengers'),
  getPassengerById: (id) => api.get(`/passengers/${id}`),
  createPassenger: (passengerData) => api.post('/passengers', passengerData),
  updatePassenger: (id, passengerData) => api.put(`/passengers/${id}`, passengerData),
  deletePassenger: (id) => api.delete(`/passengers/${id}`),
  bulkCreatePassengers: (passengerDataArray) => api.post('/passengers/bulk', passengerDataArray)
};

export const flightService = {
  getAllFlights: () => api.get('/flights'),
  getFlightById: (id) => api.get(`/flights/${id}`),
  createFlight: (flightData) => api.post('/flights', flightData),
  updateFlight: (id, flightData) => api.put(`/flights/${id}`, flightData),
  deleteFlight: (id) => api.delete(`/flights/${id}`)
};

export const ticketService = {
  getAllTickets: () => api.get('/tickets'),
  getTicketById: (id) => api.get(`/tickets/${id}`),
  createTicket: (ticketData) => api.post('/tickets', ticketData),
  updateTicket: (id, ticketData) => api.put(`/tickets/${id}`, ticketData),
  deleteTicket: (id) => api.delete(`/tickets/${id}`)
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