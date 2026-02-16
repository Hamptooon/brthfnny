'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Avatar,
  Paper,
  Grid,
  SimpleGrid,
  Box,
  ThemeIcon,
  Timeline,
  Spoiler,
  Button,
  useMantineTheme,
  Image,
  Stack
} from '@mantine/core';
import { IconBriefcase, IconMapPin, IconCalendar, IconQuote, IconMoodCrazyHappy } from '@tabler/icons-react';
import { Header } from '@/components/Header/Header';
import { HeaderPrime } from '@/components/HeaderPrime/HeaderPrime';
import { useIllusion } from '@/app/context/IllusionContext';
import classes from '../../lll.module.css';

const profileImage = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80';

export default function HomePage() {
  const theme = useMantineTheme();
  const [showButton, setShowButton] = useState(false);
  const { isIllusionBroken, isAnimating, breakIllusion } = useIllusion();

  useEffect(() => {
    if (!isIllusionBroken) {
      const timer = setTimeout(() => setShowButton(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isIllusionBroken]);

  if (isIllusionBroken) {
    return (
      <div className={classes.show} style={{ position: 'relative', minHeight: '100vh' }}>
        <HeaderPrime />
        <video autoPlay loop muted playsInline className={classes.videoBackground}>
          <source src="/021688888.mp4" type="video/mp4" />
        </video>
        <div className={classes.overlay} />

        <div className={classes.content}>
          <Stack gap="md" className={classes.combinedAnimations}>
            <Image src="/radik-bio.png" width={680} height={680} alt="Radik Icon" />
          </Stack>

            <Stack gap="md" className={`${classes.combinedAnimations2} ${classes.textBioWrapper}`}>
              <div className={classes.textBio}>
                <h1>⚡ РАДМИЛ МУЛЮКОВ ⚡</h1>
                <p>
                  🌍 Родился 17 февраля в високосный год на Московке, этот парень до сих пор любит танцевать как в последний раз, первые его слова при рождении "Пэпе" "Шнейне" "Втфаа!".
                </p>
                <p>
                  🧠 В 3 года научился играть в кс, некоторые поговаривают, что его наставником и другом был сам Саша Симпл и Дастан из Vp.
                </p>
                <p>
                  ⚔️ В 16 он уже ебал все что движется, и держался молодцом. Однажды он забил Витю Машкина своими кулачками, за то что тот обозвал его дураком
                </p>
                <p>
                  🚀 Работал курьером, доставщиком подарков, купцом, дельцом, но остановился на новостном канале Трусы *****.
                </p>
                <p>
                  🍕 Изобрёл стрельбу накидкой и придумал несколько фишечных смоков на карте Ancient в CS 2, также был сооснователем фразы "Б на ноге парни!".
                </p>
                <p>
                  🧙‍♂️ Верил в БУДУ и лично знает древнего Будийского монаха "Его воробейшество", который привел его к вере в Семерых.
                </p>
                <p>
                  💬 Цитата: «Когда меня спрашивают, в чём смысл жизни, я отвечаю, что главное не вьебать 5 лузз стриков на фейсите и играть быстро как в жизни так и в игре, нельзя тормозить, жизнь это как Б на ноге, нужно подготовиться раскинуть все, но бежать надо как можно быстрее, не оглядываясь назад».
                </p>
              </div>
            </Stack>
            
          </div>
      </div>
    );
  }

  // ========== СКУЧНАЯ СТРАНИЦА ==========
  return (
    <>
      <Header />
      <Box className={isAnimating ? classes.dissolve : ''}>
        <Container size="lg" py="xl">
          <Paper radius="md" p="xl" withBorder>
            <Grid gutter="xl">
              <Grid.Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  src={profileImage}
                  size={180}
                  radius={120}
                  alt="Радмила Мулюкова"
                  style={{ border: `4px solid ${theme.colors.blue[6]}` }}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <Title order={1} size="h1" style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                  Радмила Мулюкова
                </Title>
                <Text size="xl" color="dimmed" mt="xs">
                  Художник-иллюстратор и дизайнер
                </Text>
                <Text mt="md">
                  Радмила — талантливый иллюстратор с десятилетним опытом работы в издательской и диджитал-сфере. 
                  Её работы отличаются уникальным стилем, сочетающим традиционные техники и современные цифровые инструменты.
                </Text>
                <SimpleGrid cols={2} mt="lg" spacing="xs">
                  <Box>
                    <ThemeIcon variant="light" color="blue" size="sm">
                      <IconMapPin size={14} />
                    </ThemeIcon>
                    <Text size="sm">Казань, Россия</Text>
                  </Box>
                  <Box>
                    <ThemeIcon variant="light" color="blue" size="sm">
                      <IconBriefcase size={14} />
                    </ThemeIcon>
                    <Text size="sm">10+ лет опыта</Text>
                  </Box>
                </SimpleGrid>
              </Grid.Col>
            </Grid>
          </Paper>

          <Paper withBorder radius="md" p="xl" mt="lg">
            <Title order={2} size="h2" mb="md">
              Биография
            </Title>
            <Spoiler maxHeight={120} showLabel="Показать больше" hideLabel="Скрыть">
              <Text>
                Радмила Мулюкова родилась в 1990 году в Казани. С детства увлекалась рисованием и после школы поступила в 
                Казанское художественное училище, которое окончила с отличием. Затем продолжила обучение в Санкт-Петербургской 
                академии художеств имени Репина, где специализировалась на книжной графике.
              </Text>
              <Text mt="sm">
                После окончания академии работала в крупных издательствах Москвы и Санкт-Петербурга, иллюстрировала более 
                50 книг для детей и взрослых. Её работы выставлялись в России и за рубежом, а в 2019 году она стала лауреатом 
                премии «Образ книги» в номинации «Лучшие иллюстрации к произведениям художественной литературы».
              </Text>
              <Text mt="sm">
                Помимо книжной иллюстрации, Радмила занимается созданием авторских открыток, участвует в арт-проектах и 
                проводит мастер-классы для начинающих художников. В свободное время путешествует по России и ищет вдохновение 
                в народных промыслах.
              </Text>
            </Spoiler>
          </Paper>

          <Paper withBorder radius="md" p="xl" mt="lg">
            <Title order={2} size="h2" mb="md">
              Основные вехи
            </Title>
            <Timeline active={3} bulletSize={24} lineWidth={2}>
              <Timeline.Item bullet={<IconCalendar size={12} />} title="2008–2012">
                <Text color="dimmed" size="sm">
                  Обучение в Казанском художественном училище
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconCalendar size={12} />} title="2012–2017">
                <Text color="dimmed" size="sm">
                  Санкт-Петербургская академия художеств имени Репина (специалитет)
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconCalendar size={12} />} title="2017–2020">
                <Text color="dimmed" size="sm">
                  Художник-иллюстратор в издательстве «Детская литература»
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconCalendar size={12} />} title="2020 – настоящее время">
                <Text color="dimmed" size="sm">
                  Фриланс-иллюстратор, сотрудничество с российскими и зарубежными заказчиками
                </Text>
              </Timeline.Item>
            </Timeline>
          </Paper>

          <Paper withBorder radius="md" p="xl" mt="lg" style={{ backgroundColor: theme.colors.blue[0] }}>
            <Box>
              <ThemeIcon size={40} radius="xl" color="blue" variant="light">
                <IconQuote size={24} />
              </ThemeIcon>
              <div>
                <Text size="lg">
                  «Иллюстрация — это мост между текстом и воображением читателя. Я стараюсь строить эти мосты так, 
                  чтобы по ним хотелось идти снова и снова».
                </Text>
                <Text mt="sm">
                  — Радмила Мулюкова
                </Text>
              </div>
            </Box>
          </Paper>
        </Container>
      </Box>

      {showButton && !isAnimating && (
        <Button
          onClick={breakIllusion}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            boxShadow: theme.shadows.xl,
          }}
          size="lg"
          color="red"
          variant="filled"
          radius="xl"
        >
          Ты серьезно? Развей Иллюзию!!
        </Button>
      )}
    </>
  );
}