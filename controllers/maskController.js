const Mask = require('../models/maskModel');


exports.pushMaskData = async (req, res) => {
    try {
        
        const user = await Mask.create(req.body);

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

exports.getMaskData = async (req, res) => {
    try {

        const masks = await Mask.find();

        res.status(200).json({ status: true, data: masks });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ status: false, message: 'Internal Server Error.'});
    }
};