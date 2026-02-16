// app/not-found.tsx
'use client';
import { Container, Title, Text, Button } from '@mantine/core';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container>
      <Title>404 — Страница не найдена</Title>
      <Text>К сожалению, такой страницы нет.</Text>
      <Button component={Link} href="/" mt="md">
        Вернуться на главную
      </Button>
    </Container>
  );
}