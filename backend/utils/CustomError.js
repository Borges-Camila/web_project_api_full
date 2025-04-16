class CustomError extends Error {
  constructor(message, statusCode = 500, type = 'Erro interno') {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
  }
}

export default CustomError;
