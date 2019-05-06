import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';


export class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {    // By writing like this we are making 'this' available to this function.
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">Stock Trading App</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#">Get Quote</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Portfolio</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Buy & Sell</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
      </div>
    )
  }
}

export default AppNavBar
