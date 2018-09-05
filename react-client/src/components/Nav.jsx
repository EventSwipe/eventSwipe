import React from 'react';

const Nav = () => (
    <div>
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src="https://image.flaticon.com/icons/svg/1051/1051124.svg" width="30" height="30" className="d-inline-block align-top" alt=""/>
            </a>
            <a className="navbar-brand" href="#">GOING</a>
            <a className="navbar-brand" href="#" data-toggle="modal" data-target="#login-modal">Login</a>
            <a className="navbar-brand" href="#" data-toggle="modal" data-target="#signup-modal">Sign Up</a>


            <div className="modal fade" id="login-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{"display": "none"}}>
    	        <div className="modal-dialog">
				    <div className="loginmodal-container">
					<h1>Login to Your Account</h1><br/>
                        <form>
                            <input type="text" name="user" placeholder="Username"/>
                            <input type="password" name="pass" placeholder="Password"/>
                            <input type="submit" name="login" className="login loginmodal-submit" value="Login"/>
                        </form>
					
                        <div className="login-help">
                            <a href="#">Register</a> --- <a href="#">Forgot Password</a>
                        </div>
				    </div>
			    </div>
		    </div>

            <div className="modal fade" id="signup-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{"display" : "none"}}>
                <div className="modal-dialog">
                    <div className="loginmodal-container">
                    <h1>Create an Account</h1><br/>
                        <form>
                            <input type="text" name="first" placeholder="First Name"/>
                            <input type="text" name="last" placeholder="Last Name"/>
                            <input type="text" name="user" placeholder="Username"/>
                            <input type="password" name="pass" placeholder="Password"/>
                            <input type="submit" name="signup" className="login loginmodal-submit" value="Signup"/>
                        </form>

                        <div className="login-help">
                            <a href="#">Already Have an Account</a> --- <a href="#">Forgot Password</a>
                        </div>

                    </div>
                </div>
            </div>

        </nav>
    </div>
)

export default Nav;