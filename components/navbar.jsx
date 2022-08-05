import {
  Offcanvas,
  Button,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Container,
} from "react-bootstrap";
import { RiFileAddLine, RiListCheck2 } from "react-icons/ri";
import useSWR from "swr";
import { fetcher } from "../lib/common/http";

export function NavbarForImmo() {
  const expand = "md";
  const { data, error } = useSWR("/api/properties/list", fetcher);
  return (
    <Navbar key={expand} bg="light" expand={expand} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">
          Immo Tracker ({data?.results?.length})
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Immo Tracker
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/">
                <RiListCheck2 /> List Properties
              </Nav.Link>
              <Nav.Link href="/prop/add">
                <RiFileAddLine /> Add Property
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
