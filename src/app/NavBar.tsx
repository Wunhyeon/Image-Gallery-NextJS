"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Nav,
  NavDropdown,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  // const useSearchParams = useSearchParams();

  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        <NavbarBrand as={Link} href="/">
          Image Gallery
        </NavbarBrand>
        {/* <NavbarBrand href="/">Image Gallery</NavbarBrand> */}
        <NavbarToggle aria-controls="main-navbar" />
        <NavbarCollapse id="main-navbar">
          <Nav>
            <NavLink as={Link} href="/static" active={pathname === "/static"}>
              Static
            </NavLink>
            <NavLink as={Link} href="/dynamic" active={pathname === "/dynamic"}>
              Dynamic
            </NavLink>
            <NavLink as={Link} href="/isr" active={pathname === "/isr"}>
              ISR
            </NavLink>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item as={Link} href="/topics/health">
                Health
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/fitness">
                fitness
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/coding">
                coding
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink as={Link} href="/search" active={pathname === "/search"}>
              Search
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
