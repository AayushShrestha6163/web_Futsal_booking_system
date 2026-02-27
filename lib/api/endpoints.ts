export const API = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    UPDATEPROFILE: '/api/auth/update',
    REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
    RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
  },

  ADMIN: {
    CREATEUSER: '/api/admin/users',
    GETALL: "/api/admin/users",
    GET_ONE: (userId: string) => `/api/admin/users/${userId}`,
    UPDATE: (email: string) => `/api/admin/users/${email}`,
    DELETE: (userId: string) => `/api/admin/users/${userId}`,


    COURTS: "/api/admin/courts",
    COURT_UPDATE: (id: string) => `/api/admin/courts/${id}`,
    COURT_DELETE: (id: string) => `/api/admin/courts/${id}`,

    
    BOOKINGS: "/api/admin/bookings",
  },

  
  BOOKINGS: {
    CREATE: "/api/bookings",
    ME: "/api/bookings/me",
    CANCEL: (id: string) => `/api/bookings/${id}`,
  },

 
  PAYMENTS: {
    ESEWA_INITIATE: "/api/payments/esewa/initiate",
  },

  USER: {
    COURTS: "/api/courts",
    COURT_ONE: (id: string) => `/api/courts/${id}`,
    SLOTS: (courtId: string) => `/api/courts/${courtId}/slots`,
  },
};