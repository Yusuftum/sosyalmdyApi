const errorHandler = (err, req, res, next) => {
    //sunucu hatasını JSON olarak döner 
    res.status(500).json({ error: err.message });
};

module.exports = errorHandler;
