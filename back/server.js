const mongoose = require('mongoose')
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const userData = require('./userSchema');
const LoginData = require('./LoginSchema');
const BusData = require('./BusSchema');
const AvailableBusData = require('./AvailableBusSchema');
const PassengerInfo = require('./PassengerInfoSchema')
const pdf = require('html-pdf')
const pdfTemplate= require('./document/index')


const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = 'mongodb://127.0.0.1:27017/busdata';



// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// this is our get method
// this method fetches all available data in our database
router.use('/getUserData', (req, res) => {
  const { Email, Password } = req.body
  console.log("ema", Email)
  console.log("pass", Password)
  userData.find({ Email: Email, Password: Password }, (err, data) => {
    console.log(data)
    if (err) return res.json({ success: false, error: err });
    return (
      res.json({ success: true, data: data })
    )
  });
});

router.use('/getBusData', (req, res) => {
  const { From, To, Date } = req.body
  console.log("from", From)
  console.log("to", To)
  console.log("date", Date)

  BusData.find({ From: From, To: To, Date: Date }, (err, data) => {

    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getLoginData', (req, res) => {
  LoginData.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


router.get('/getBuseInfo', (req, res) => {
  AvailableBusData.find((err, data) => {
    console.log(data)
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getPassengerInfo', (req, res) => {
  PassengerInfo.find((err, data) => {
    console.log(data)
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.delete('/deleteLoginData', (req, res) => {
  LoginData.deleteMany({}, (err) => {
    if (err) return res.send(err)
    return res.json({ success: true });
  });
});

router.delete('/deleteBusData', (req, res) => {
  AvailableBusData.deleteMany({}, (err) => {
    if (err) return res.send(err)
    return res.json({ success: true });
  });

});



router.delete('/deletepassengerinfo', (req, res) => {
  PassengerInfo.deleteMany({}, (err) => {
    if (err) return res.send(err)
    return res.json({ success: true });
  });

});


router.post('/putUserData', (req, res) => {
  let data = new userData();

  const { FirstName, LastName, Email, Phone, Password, ConfirmPassword } = req.body;

  data.FirstName = FirstName;
  data.LastName = LastName;
  data.Email = Email;
  data.Phone = Phone;
  data.Password = Password;
  data.ConfirmPassword = ConfirmPassword
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


router.post('/putpassengerinfo', (req, res) => {
  let data = new PassengerInfo();

  const { Name, BusType, Email, Phone, Cost, Arrivals,Departure,SeatNo,Gender,Date } = req.body;

  data.Name = Name;
  data.BusType = BusType;
  data.Email = Email;
  data.Phone = Phone;
  data.Cost = Cost;
  data.Arrivals = Arrivals
  data.Departure = Departure
  data.SeatNo = SeatNo
  data.Gender = Gender
  data.Date = Date

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putLoginData', (req, res) => {
  let data = new LoginData();

  const { Email, Password, Name } = req.body;
  data.Email = Email;
  data.Password = Password;
  data.Name = Name

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/postBuses', (req, res) => {
  let data = new AvailableBusData();
  console.log(req.body.From)
  console.log(req.body.To)
  console.log(req.body.Date)

  const { From, To, Travels, TotalSeats, Fare, BookedSeats, Arrivals, Departure, Route, BusType, Date } = req.body;

  data.From = From
  data.To = To
  data.Travels = Travels
  data.TotalSeats = TotalSeats
  data.Fare = Fare
  data.BookedSeats = BookedSeats
  data.Arrivals = Arrivals
  data.Departure = Departure
  data.Route = Route
  data.BusType = BusType
  data.Date = Date

  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/createpdf',(req,res)=>{
  pdf.create(pdfTemplate(req.body),{}).toFile('result.pdf',(err)=>{
      if(err){
          res.send (Promise.reject());
      }
      res.send(Promise.resolve());
  });
});
app.get('/fetch-pdf',(req,res)=>{
  res.sendFile(`${__dirname}/result.pdf`)
})


// append /api for our http reques
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
