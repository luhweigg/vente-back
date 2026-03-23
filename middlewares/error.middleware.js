module.exports = (req, res, next) => {
    res.status(404).send('<h1>404 - Page non trouvée</h1>');
};