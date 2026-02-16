'use client';

import { Burger, Button, Container, Group, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './HeaderPrime.module.css';
import Image from 'next/image';
import { useBirthday } from '@/app/context/BirthdaySurpriseContext';
import { IconBackspace, IconClearAll } from '@tabler/icons-react';

const baseLinks = [
  { link: '/', label: 'Кто он такой?' },
  { link: '/contacts', label: 'Связаться с ним' },
];

export function HeaderPrime() {
  const [opened, { toggle }] = useDisclosure(false);
  const pathname = usePathname();
  const { authCompleted, birthdayVisited } = useBirthday();

  // Если пользователь успешно прошёл авторизацию и уже был на странице дня рождения,
  // добавляем ссылку на /birthday
  const links = birthdayVisited
    ? [...baseLinks, { link: '/birthday', label: '---День рождения!---' }]
    : baseLinks;

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
        <div className={classes.logoWrapper}>
          <Image
            src="/radik-icon.png"
            width={36}
            height={36}
            alt="Radik"
            className={classes.logo}
          />
          <span className={classes.logoGlitch}>STAMP1EX</span>
        </div>

        <Group gap={5} visibleFrom="xs" className={classes.navGroup}>
          {items}
          <Tooltip label="Очистить все что натворил?!">
            <Button onClick={() => {localStorage.clear(); 
              location.reload()
            }} className={classes.btnClear} type="submit" size="compact-md"><IconBackspace/></Button>
          </Tooltip>
        </Group>
a
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
          classNames={{
            root: classes.burger,
            burger: classes.burgerInner,
          }}
        />
      </Container>
    </header>
  );
}