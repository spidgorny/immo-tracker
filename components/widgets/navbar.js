import { Button, Container, Navbar } from "react-bootstrap";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar1() {
	const { data: session } = useSession();

	const loginLogout = session ? (
		<div>
			{session.user.email}
			<Button variant="outline-dark" onClick={() => signOut()} className="ms-2">
				Sign out
			</Button>
		</div>
	) : (
		<div>
			<Button variant="outline-dark" onClick={() => signIn()} className="ms-2">
				Sign in
			</Button>
		</div>
	);

	return (
		<Navbar expand="lg" style={{ backgroundColor: "#eee" }}>
			<Container fluid className="px-5">
				<Navbar.Brand href="#home">Tools v2</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{/*<Nav className="me-auto">*/}
					{/*<Nav.Link href="#home">Home</Nav.Link>*/}
					{/*<Nav.Link href="#link">Link</Nav.Link>*/}
					{/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
					{/*	<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
					{/*	<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
					{/*	<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
					{/*	<NavDropdown.Divider />*/}
					{/*	<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
					{/*</NavDropdown>*/}
					{/*</Nav>*/}
				</Navbar.Collapse>
				<Navbar.Text>{loginLogout}</Navbar.Text>
			</Container>
		</Navbar>
	);
}
