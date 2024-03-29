import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { LogoutButton } from 'components/atoms/LogoutButton/LogoutButton';
import Image from 'next/image';
import NextLink from 'next/link';
import { Session } from 'next-auth';
import { FunctionComponent } from 'react';

import styles from './Header.module.scss';

export const Header: FunctionComponent<{
  session: Session | undefined;
}> = async ({ session }) => {
  return (
    <Navbar className={styles.header}>
      <NavbarBrand>
        <Link href="/" color="foreground" as={NextLink}>
          <Image
            src="/logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="rounded-sm"
          />
          <p className="font-bold text-inherit px-2">Opendata Bridge</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
        <NavbarItem>
          <Link href="/manage/">管理</Link>
        </NavbarItem>
        <NavbarItem>{session && <LogoutButton />}</NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
