const handleApiCall = (req, res,app) => {
  app.models
    // You may have to do this:
    // .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
    .then(data => {
      res.json(data);
      console.log(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {
	handleApiCall:handleApiCall
};