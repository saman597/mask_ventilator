const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: true,  
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

const maskSchema = new mongoose.Schema(
  {
    AQI : {
        type: Number,
        default: 0
    },
    RR : {
        type: Number,
        required: [true, 'Respiratory Rate is required.'],
        default: 0
    },
    Temperature : {
        type: Number,
        required: [true, 'Temperature is required.'],
        default: 0
    },
    BodyHydration : {
        type: Number,
        required: [true, 'Body Hydration is required.'],
        default: 0
    },
    ExhaledCO2 : {
      type: Number,
      required: [true, 'Exhaled CO2 is required.'],
      default: 0
    },
    BreathAlcohol : {
        type: Number,
        required: [true, 'Breath Alcohol is required.'],
        default: 0
    },
  },
  schemaOptions
);

const Mask = mongoose.model('Mask', maskSchema);

module.exports = Mask;
