const Ventilator = require('../models/ventilatorModel');


exports.pushVentilatorData = async (req, res) => {
    try {
        
        const ventilator = await Ventilator.create(req.body);

        res.status(201).json({status: true, message: 'Data successfully inserted.'});

       
    } catch (err) {

        if (err.name == 'ValidationError') {

            let errMsg = '';

            for (field in err.errors) {
                errMsg += err.errors[field].message + ' ';
            }
            
            return res.status(400).json({ status: false, message: errMsg});
        }

        console.log(err.message);
        return res.status(500).json({ status: false, message: 'Internal Server Error.'});

    }
};

exports.getVentilatorData = async (req, res) => {
    try {

        const ventilators = await Ventilator.find();

        res.status(200).json({ status: true, data: ventilators });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ status: false, message: 'Internal Server Error.'});
    }
};