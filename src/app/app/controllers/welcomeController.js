import sendReponse from '../utils/response';

const welcomeController = {

  welcome: (req, res) => {
    sendReponse(res, 200, "working");
  },
};

export default welcomeController;
