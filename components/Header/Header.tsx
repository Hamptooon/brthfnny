'use client';

import { Burger, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './Header.module.css';
import Image from 'next/image';

const links = [
  { link: '/', label: 'Кто она такой?' },
  { link: '/pricinglol', label: 'Чего он хочет?' },
  { link: '/pricinglol', label: 'Что он может?' },
  { link: '/pricinglol', label: 'Связаться с ним' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={pathname === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image src="/radik-icon.png"
            width={36}
            height={36}
            alt="Picture of the author"
        />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>
    </header>
  );
}