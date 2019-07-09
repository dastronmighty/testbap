import React, { Component } from "react";

import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListAffiliateInfo from "./ListAffiliateInfo";
import Recaptcha from "react-recaptcha";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      code: "",
      submitted: false,
      data: [],
      error: false,
      loading: false,
      recaptchaVerified: false
    };

    this.recaptchaInstance = null;
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  checkEntered(e) {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  verifyCallback(response) {
    console.log("recaptcha sent");

    axios
      .post("/api/helper/recaptcha", {
        recaptchaResponse: response
      })
      .then(data => {
        if (data.data.success) {
          this.setState({
            recaptchaVerified: true
          });
        } else {
          this.setState({
            error: true
          });
          this.recaptchaInstance.reset();
        }
      })
      .catch(error => {
        this.setState({
          error: true
        });
        this.recaptchaInstance.reset();
      });
  }

  login() {
    this.setState({
      loading: true
    });
    axios
      .post(`/api/auth/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(data => {
        let code = data.data.code;
        axios
          .post(`/api/crm`, {
            password: "password",
            code: code
          })
          .then(data2 => {
            this.setState({
              loading: false,
              code: code,
              data: data2.data.value,
              submitted: true
            });
          })
          .catch(error => {
            this.setState({
              submitted: true,
              loading: false,
              error: true
            });
          });
      })
      .catch(error => {
        this.setState({
          submitted: true,
          loading: false,
          error: true
        });
      });
    this.recaptchaInstance.reset();
  }

  recaptchaCallback() {
    if (this.recaptchaInstance) {
      this.recaptchaInstance.reset();
    }
  }

  render() {
    return (
      <div
        style={{
          marginTop: "100px"
        }}
      >
        {" "}
        {this.state.submitted && !this.state.error && (
          <ListAffiliateInfo code={this.state.code} data={this.state.data} />
        )}{" "}
        {this.state.loading && (
          <center>
            <img
              src="https://66.media.tumblr.com/c52372a97a623c9943c5b7855cfb6672/tumblr_mjd0lsp0Fp1ri9266o1_500.gif"
              alt="Loading"
            />
          </center>
        )}{" "}
        {this.state.error && (
          <Alert variant="danger">
            There has been an error.oh no. <br /> Don 't worry the IT guys are
            sorting it out{" "}
          </Alert>
        )}{" "}
        {!this.state.submitted && !this.state.loading && (
          <Container
            style={{
              padding: "10px"
            }}
          >
            <Jumbotron
              style={{
                backgroundColor: "white"
              }}
            >
              <h1
                style={{
                  textAlign: "center"
                }}
              >
                Sign In{" "}
              </h1>{" "}
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label> Email address </Form.Label>{" "}
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={e => {
                      this.inputChange(e);
                    }}
                    typ
                  />
                  <Form.Text className="text-muted">
                    email you used to register with{" "}
                  </Form.Text>{" "}
                </Form.Group>{" "}
                <Form.Group controlId="formBasicPassword">
                  <Form.Label> Password </Form.Label>{" "}
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onKeyDown={e => {
                      this.checkEntered(e);
                    }}
                    onChange={e => {
                      this.inputChange(e);
                    }}
                    typ
                  />
                  <Form.Text className="text-muted">
                    Password sent with the registration email{" "}
                  </Form.Text>{" "}
                </Form.Group>
                <Form.Group>
                  <Form.Label> Confirm you are real </Form.Label>{" "}
                  <Recaptcha
                    ref={e => (this.recaptchaInstance = e)}
                    sitekey="6LdTxqwUAAAAAPUdzkzngL2540plzr-1792ImoLE"
                    render="explicit"
                    verifyCallback={this.verifyCallback.bind(this)}
                    onloadCallback={this.recaptchaCallback.bind(this)}
                  />{" "}
                  <Form.Text className="text-muted">
                    Please refresh the page if the reCaptcha doesn 't activate
                    button{" "}
                  </Form.Text>{" "}
                </Form.Group>
                <Button
                  disabled={!this.state.recaptchaVerified}
                  onClick={this.login.bind(this)}
                  variant="primary"
                >
                  Sign Me In{" "}
                </Button>{" "}
              </Form>{" "}
            </Jumbotron>{" "}
          </Container>
        )}{" "}
      </div>
    );
  }
}

export default Home;
