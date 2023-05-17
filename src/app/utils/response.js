const sendReponse = (res, statusCode, message, data = null) => res.status(statusCode).json({
  message,
  data: data || '',
});
export default sendReponse;
