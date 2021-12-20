module.exports=({Logindata,Passenger,TotalCost,SGST,CGST})=>{
    const today=new Date();
  

    return `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        
    </head>
    <body>
    <div class='containerc d-flex justify-content-center  align-items-center'>

                <table class="table checkout table-borderless  " style='width:70%; background-color:blue;'>

                    <tbody>
                        <tr style=>
                            <th class="bg-dark " colSpan='4'><h5>BusBooking.com</h5></th>
                        </tr>
                        <tr >
                            <td colSpan='3'><h6>Dear ${Logindata.Name} , Congratulation, Your Ticket Has Been Booked</h6></td>
                        </tr>
                        <tr>
                            <th scope="row" class="bg-dark" colSpan='4'><h5>Bus Information</h5></th>
                        </tr>
                        <tr>
                            <td><h5>BusType</h5></td>
                            <td><h5>Departure</h5></td>
                            <td><h5>Arrivals</h5></td>
                            <td><h5>Journey Date</h5></td>
                        </tr>
                        <tr>
                            <td><h6>${Passenger.BusType}</h6></td>
                            <td><h6>${Passenger.Departure}</h6></td>
                            <td><h6>${Passenger.Arrivals}</h6></td>
                            <td><h6>${Passenger.Date}</h6></td>
                        </tr>
                        <tr>
                            <th scope="row" class="bg-dark" colSpan='4'><h5>Passenger Information</h5></th>
                        </tr>
                        <tr>
                            <td><h5>Name</h5></td>
                            <td><h5>Seat No</h5></td>
                            <td><h5>Contact No</h5></td>
                            <td><h5>Email</h5></td>
                        </tr>
                        <tr>
                            <td><h6>${Passenger.Name}</h6></td>
                            <td><h6>${Passenger.SeatNo}</h6></td>
                            <td><h6>${Passenger.Phone}</h6></td>
                            <td><h6>${Passenger.Email}</h6></td>
                        </tr>
                        <tr>
                            <th scope="row " class="bg-dark" colSpan='4'><h5>Price Information</h5></th>
                        </tr>
                        <tr>
                            <td><h5>Particulars</h5></td>
                            <td></td>
                            <td></td>
                            <td><h5>Total Amount</h5></td>
                        </tr>
                        <tr>
                            <td><h5>Booking Fee</h5></td>
                            <td></td>
                            <td><h6>${Passenger.Cost}</h6></td>
                            
                        </tr>
                        <tr>
                            <td><h5>Other Tax</h5></td>
                            <td></td>
                            <td><h6>0</h6></td>
                            <td rowSpan='4'><h6>${TotalCost}</h6></td>
                        </tr>
                        <tr>
                            <td><h5>CGST Tax</h5></td>
                            <td></td>
                            <td><h6>${CGST}</h6></td>
                            
                        </tr>
                        <tr>
                            <td><h5>SGST Tax</h5></td>
                            <td></td>
                            <td><h6>${SGST}</h6></td>
                        </tr>
                        
                    </tbody>
                </table>
    </body>
    </html>
    `
}