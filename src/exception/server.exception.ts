import HttpException from './http.exception';

class InternalServerError extends HttpException {
  constructor() {
    super(500, 'Internal server error');
  }
}

export default InternalServerError;
