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

const ventilatorSchema = new mongoose.Schema(
  {
    PIP : {
        type: Number,
        required: [true, 'Peak Inspiratory Pressure is required.'],
        default: null
    },
    VTI : {
        type: Number,
        required: [true, 'Tidal Volume Inhale is required.'],
        default: null
    },
    Pplat : {
        type: Number,
        default: null
    },
    RR : {
        type: Number,
        required: [true, 'Respiratory Rate is required.'],
        default: null
    },
    PEEP_Ti : {
      type: Number,
      default: null
    },
    Ti : {
        type: Number,
        default: null
    },
    Te : {
        type: Number,
        default: null
    },
    AvgLeak : {
        type: Number,
        default: null
    },
    VentilationMode : {
        type: Number,
        default: null,
        required: [true, 'Ventilation Mode is required.']
    },
    Trigger : {
        type: Number,
        default: null
    }
  },
  schemaOptions
);

const Ventilator = mongoose.model('Ventilator', ventilatorSchema);

module.exports = Ventilator;
