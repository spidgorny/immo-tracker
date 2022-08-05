import SidebarMenu from "react-bootstrap-sidebar-menu";

export function Sidebar() {
  return (
    <>
      <SidebarMenu>
        <SidebarMenu.Collapse>
          <SidebarMenu.Header>
            <SidebarMenu.Brand
              title="React-Bootstrap"
              href="https://github.com/react-bootstrap/react-bootstrap"
            >
              <span className="react-bootstrap-img" />
            </SidebarMenu.Brand>
            <SidebarMenu.Toggle />
          </SidebarMenu.Header>
          <SidebarMenu.Body>
            <SidebarMenu.Nav>
              <SidebarMenu.Nav.Link eventKey="setup">
                <SidebarMenu.Nav.Icon>1</SidebarMenu.Nav.Icon>
                <SidebarMenu.Nav.Title>How to install</SidebarMenu.Nav.Title>
              </SidebarMenu.Nav.Link>
            </SidebarMenu.Nav>
          </SidebarMenu.Body>
          <SidebarMenu.Footer></SidebarMenu.Footer>
        </SidebarMenu.Collapse>
      </SidebarMenu>
    </>
  );
}
