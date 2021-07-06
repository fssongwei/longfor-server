const router = require("express").Router();
const Record = require("../models/Record");

router.get(
  "/records",
  async (req, res) => {
    try {
      let search = req.query.search || "";
      console.log(req.query);
      let records = await Record.find({
        'name': {
          '$regex' : search
        }
      });

      res.send(records);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.get(
  "/oneRecord",
  async (req, res) => {
    try {
      let search = req.query.search || "";
      console.log(req.query);
      let count = await Record.count();
      let random = Math.floor(Math.random() * count)

      let record = await Record.findOne().skip(random);

      res.send(record);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.post(
  "/forcast",
  async (req, res) => {
    try {
      let {arr} = req.body;
      if (arr && arr.length > 0) {
        res.status(200).send(forcast(arr));
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

const getRealTimePrice = require('../getRealtimePrice');

router.get(
  "/realTimePrice",
  async (req, res) => {
    try {
      let search = req.query.search || "";
      let data = await getRealTimePrice(search);
      console.log(data);
      res.status(200).send(data);
    } catch (error) {
      console.log(error.toString());
      res.status(500).send(error);
    }
  }
);

const ARIMA = require('arima');
const arima = new ARIMA({
  p: 2,
  d: 1,
  q: 2,
  P: 1,
  D: 0,
  Q: 1,
  s: 12,
  verbose: false
});

const forcast = (prices) => {
  arima.train(prices) // Or arima.fit(ts)
  return arima.predict(3)[0].map((num) => parseFloat(num.toFixed(2)));
}

module.exports = router;
