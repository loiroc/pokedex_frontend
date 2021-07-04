import React from "react";
import "../styles/Author.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function Author() {
  return (
    <div className="Author">
      <Nav
        style={{
          backgroundColor: "#FFFAFA",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        <Nav.Item>
          <img
            alt="Pokemon"
            src="images/logo.png"
            style={{ width: "100px", marginLeft: "20px", marginRight: "20px" }}
          />
        </Nav.Item>
        <Nav.Item style={{ marginTop: "10px" }}>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginTop: "10px" }}>
          <Nav.Link href="author" style={{ fontWeight: "bold" }}>
            About the Developer
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ marginTop: "10px" }}>
          <Nav.Link>Logout</Nav.Link>
        </Nav.Item>
      </Nav>
      <img
        id="picture"
        alt="Lucas Coimbra"
        src="https://media-exp1.licdn.com/dms/image/C5603AQEmbpVEF54Gpw/profile-displayphoto-shrink_800_800/0/1619536042381?e=1631145600&v=beta&t=dPl-JAldnvlHU88zii-L9rG5FIcTuCKRgd6jzRl26wI"
      ></img>
      <h1>Lucas Coimbra</h1>
      <div className="container">
        <div className="content">
          <span>
            <PhoneIcon /> +55 (19) 99425-3921
          </span>
          <span>
            <MailIcon /> loiroc@hotmail.com
          </span>
          <span>
            <LinkedInIcon />{" "}
            <a href="http://linkedin.com/in/lucascmbr/" target="_blank">
              linkedin.com/in/lucascmbr/
            </a>
          </span>
          <Button
            variant="dark"
            style={{ marginTop: "20px", width: "80px" }}
            href="/home"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Author;
