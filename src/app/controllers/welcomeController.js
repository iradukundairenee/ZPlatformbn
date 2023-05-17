import sendReponse from '../utils/response.js';

const welcomeController = {

  welcome: (req, res) => {
    sendReponse(res, 200, "working");
  },
};

export default welcomeController;
