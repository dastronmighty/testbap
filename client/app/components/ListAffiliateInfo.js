import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import User from "./User";

class ListAffiliateInfo extends Component {
  constructor(props) {
    super(props);

    let leadsClosed = [];
    let leadsOpen = [];

    props.data.forEach(user => {
      if (user.statuscode === 3) {
        leadsClosed.push(user);
      } else {
        leadsOpen.push(user);
      }
    });

    let conversionRate = Math.round(
      (leadsClosed.length / (leadsClosed.length + leadsOpen.length)) * 100
    );

    this.state = {
      leadsOpen: leadsOpen,
      leadsClosed: leadsClosed,
      conversionRate: conversionRate
    };

    console.log(this.state);
  }

  render() {
    return (
      <Container>
        <div
          style={{
            width: "100%",
            backgroundColor: "black",
            color: "white",
            padding: "10px"
          }}
        >
          <Jumbotron>
            <h1> Code: {this.props.code} </h1>{" "}
            <h3>
              Open Leads: {this.state.leadsClosed.length} | Closed Leads:{" "}
              {this.state.leadsOpen.length}{" "}
            </h3>{" "}
            <h3> Conversion: {this.state.conversionRate} % </h3>{" "}
            <h3> Revenue: €{this.state.leadsClosed.length * 20} </h3>{" "}
          </Jumbotron>{" "}
          <Container>
            <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <tr>
                  <th> # </th> <th> id </th> <th> days old </th>{" "}
                  <th> state </th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                <tr />{" "}
                {this.state.leadsClosed
                  .concat(this.state.leadsOpen)
                  .map((data, key) => (
                    <User data={data} number={key} />
                  ))}{" "}
              </tbody>{" "}
            </Table>{" "}
          </Container>{" "}
        </div>{" "}
      </Container>
    );
  }
}

export default ListAffiliateInfo;
