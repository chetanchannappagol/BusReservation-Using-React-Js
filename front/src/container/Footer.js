import React from 'react'


const Footer = () => {
    return (
        <footer className="footer bg-transparent">
            <div className="">
                <div className="text-center">
                    <h3>About Us</h3>
                    <p>This Is Online Bus Ticket Booking</p>
                </div>
                <ul className="list-unstyled list-inline text-center">
                    <li className="list-inline-item">
                        <a className="btn-floating btn-fb mx-1">
                        <i className="fa fa-facebook-f" style={{"font-size":"36px"}}></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-tw mx-1">
                        <i className="fa fa-linkedin" style={{"font-size":"36px"}}></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-gplus mx-1">
                        <i className="fa fa-google-plus" style={{"font-size":"36px"}}></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-li mx-1">
                            <i className="fa fa-instagram" style={{"font-size":"36px"}}></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-dribbble mx-1">
                             <i className="fa fa-twitter" style={{"font-size":"36px"}}></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
                  <a href="#"> BusBooking.com</a>
            </div>
        </footer>


    )
}

export default Footer;