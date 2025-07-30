export const ERROR_CODES = {
  // Auth errors
  AUTH: {
    EMAIL_ALREADY_EXISTS: 'auth.email-already-exists',
    INVALID_CREDENTIALS: 'auth.invalid-credentials',
    EMAIL_NOT_VERIFIED: 'auth.email-not-verified',
    INVALID_VERIFICATION_TOKEN: 'auth.invalid-verification-token',
    PASSWORD_TOO_WEAK: 'auth.password-too-weak',
    USER_NOT_FOUND: 'auth.user-not-found',
    TOKEN_EXPIRED: 'auth.token-expired',
    INVALID_TOKEN: 'auth.invalid-token',
  },

  // Validation errors
  VALIDATION: {
    INVALID_EMAIL: 'validation.invalid-email',
    INVALID_PASSWORD: 'validation.invalid-password',
    REQUIRED_FIELD: 'validation.required-field',
    FIELD_TOO_SHORT: 'validation.field-too-short',
    FIELD_TOO_LONG: 'validation.field-too-long',
  },

  // Database errors
  DATABASE: {
    CONNECTION_ERROR: 'database.connection-error',
    QUERY_ERROR: 'database.query-error',
    CONSTRAINT_VIOLATION: 'database.constraint-violation',
  },

  // Server errors
  SERVER: {
    INTERNAL_ERROR: 'server.internal-error',
    SERVICE_UNAVAILABLE: 'server.service-unavailable',
  },
} as const; 