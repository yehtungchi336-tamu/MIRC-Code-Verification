import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';

function App() {

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

      <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size='md' tag='a' className='me-2' id="google-login"  style={{ backgroundColor: "#dd4b39" }}>
              <MDBIcon fab icon='google' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2' id="facebook-login" href="https://connect.facebook.net/en_US/sdk.js">
              <MDBIcon fab icon='facebook' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='linkedin-in' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2' style={{ backgroundColor: "#000000" }}>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4 justify-content-center">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' icon="envelope" id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' icon="lock" id='formControlLg' type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#" className="link-danger">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5 bg-info" size='lg'>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-info">

        <div className="text-white mb-3 mb-md-0">
          Copyright © 2022. MOON AND CAKE.
        </div>

      </div>

    </MDBContainer>
  );
}

export default App;