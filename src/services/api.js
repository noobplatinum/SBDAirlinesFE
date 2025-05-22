import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  console.log(`API ${config.method.toUpperCase()} Request:`, config.url, config.data || {});
  
  if (config.url && config.url.includes('/') && config.params) {
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
  logout: () => api.post('/auth/logout'),
  createPassengerForUser: (userId, passengerData) => api.post(`/auth/create-passenger/${extractMongoId(userId)}`, passengerData),
  migrateUsers: () => api.post('/auth/migrate-users'),
  getUserPassengerDetails: (userId) => api.get(`/auth/profile/${extractMongoId(userId)}`)
};

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
  getTicketsByPassenger: (passengerId) => api.get(`/tickets/passenger/${extractMongoId(passengerId)}`),
  createTicket: (ticketData) => api.post('/tickets', ticketData),
  updateTicket: (id, ticketData) => api.put(`/tickets/${extractMongoId(id)}`, ticketData),
  deleteTicket: (id) => api.delete(`/tickets/${extractMongoId(id)}`)
};

export const userTicketService = {
  getUserTickets: (userId) => {
    return authService.getUserPassengerDetails(userId)
      .then(response => {
        const passengerId = response.data.passenger ? response.data.passenger._id : 
                           (response.data.penumpang_id || response.data.passenger_details?._id);
        
        if (!passengerId) {
          throw new Error('No passenger ID found for this user');
        }
        
        return ticketService.getTicketsByPassenger(passengerId);
      });
  },
  
  bookTicketForUser: (userId, flightId, ticketDetails) => {
    return authService.getUserPassengerDetails(userId)
      .then(response => {
        const passengerId = response.data.passenger ? response.data.passenger._id : 
                           (response.data.penumpang_id || response.data.passenger_details?._id);
        
        if (!passengerId) {
          throw new Error('No passenger ID found for this user');
        }
        
        const ticketData = {
          ...ticketDetails,
          penumpang_id: passengerId,
          flight_id: extractMongoId(flightId)
        };
        
        return ticketService.createTicket(ticketData);
      });
  }
};

export default {
  authService,
  airlineService,
  aircraftService,
  terminalService,
  gateService,
  passengerService,
  flightService,
  ticketService,
  userTicketService
};