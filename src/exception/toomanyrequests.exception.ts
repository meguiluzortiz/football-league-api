import HttpException from './http.exception';

class TooManyRequestsError extends HttpException {
  constructor() {
    super(429, 'Too many requests');
  }
}

export default TooManyRequestsError;
