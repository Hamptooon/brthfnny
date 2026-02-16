'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Button,
  Container,
  Text,
  Title,
  Anchor,
  ActionIcon,
  TextInput,
  PasswordInput,
  Paper,
  Progress,
  Group,
  Box,
} from '@mantine/core';
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';
import { LuckyWheel } from '../LuckyWheel/LuckyWheel';
import classes from './Welcome.module.css';
import { useIllusion } from '@/app/context/IllusionContext';
import { useBirthday } from '@/app/context/BirthdaySurpriseContext';

// Список фраз для неверных ответов
const errorPhrases = [
  'Глупец, активируй своего темного попутичка и подумай еще!',
  'Боже я разочарован, вспомни свой кодекс!',
  'Да уж Радик, не думал я что ты станешь таким...',
  'Я не хочу с тобой говорить',
  'Все давай пока, ты должен вспомнить все сам',
];

// Правильные ответы
const correctAnswers = {
  password: 'Zvezda05',
  fullName: 'Мулюков Радмил Русланович',
  age: 23,
  birthDate: '17.02.2003',
  faceitElo: 2171,
  girlfriendName: 'Назиля',
};

export function Welcome() {
  const { setBirthdayVisited, setAuthCompleted, authCompleted } = useBirthday();
  const [stage, setStage] = useState<'auth' | 'video' | 'question' | 'wheel' | 'prize'>('auth');
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false); // флаг достижения 85 сек
  const [noButtonText, setNoButtonText] = useState('Нет');
  const [noButtonDisabled, setNoButtonDisabled] = useState(false);
  const [showNoButton, setShowNoButton] = useState(true);
  const [authErrorIndex, setAuthErrorIndex] = useState(-1);
  const [authForm, setAuthForm] = useState({
    password: '',
    fullName: '',
    age: '',
    birthDate: '',
    faceitElo: '',
    girlfriendName: '',
  });

  // Переключение звука видео
  const toggleSound = () => {
    if (videoRef.current) {
      const muted = !videoRef.current.muted;
      videoRef.current.muted = muted;
      setIsMuted(muted);
    }
  };
 useEffect(() => {
    // При заходе на страницу помечаем, что пользователь её посетил
    setBirthdayVisited(true);
    console.log('authCompld', authCompleted)
    if(authCompleted) {
      setStage('video')
    }
  }, [setBirthdayVisited, setAuthCompleted, authCompleted]);
  // Обработка отправки формы авторизации
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isPasswordValid = authForm.password === correctAnswers.password;
    const isFullNameValid = authForm.fullName.trim().toLowerCase() === correctAnswers.fullName.toLowerCase();
    const isAgeValid = parseInt(authForm.age) === correctAnswers.age;
    const isBirthDateValid = authForm.birthDate === correctAnswers.birthDate;
    const isFaceitEloValid = parseInt(authForm.faceitElo) === correctAnswers.faceitElo;
    const isGirlfriendValid = authForm.girlfriendName.trim().toLowerCase() === correctAnswers.girlfriendName.toLowerCase();

    if (
      isPasswordValid &&
      isFullNameValid &&
      isAgeValid &&
      isBirthDateValid &&
      isFaceitEloValid &&
      isGirlfriendValid
    ) {
      setStage('video');
      setAuthCompleted(true)
      setAuthErrorIndex(-1);
    } else {
      const nextIndex = (authErrorIndex + 1) % errorPhrases.length;
      setAuthErrorIndex(nextIndex);
      if (nextIndex === errorPhrases.length - 1) {
        setTimeout(() => setAuthErrorIndex(-1), 3000);
      }
    }
  };

  // Следим за временем видео (всегда, независимо от stage)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      console.log(video.currentTime)
      setVideoProgress((video.currentTime / 85) * 100);
      if (video.currentTime >= 85) {
        setShowCongrats(true);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [stage]);

  // Обработка нажатия "Нет"
  const handleNoClick = () => {
    if (noButtonText === 'Нет') {
      setNoButtonText('нет?!');
    } else if (noButtonText === 'нет?!') {
      setNoButtonText('что значит нет ты дурак?');
    } else if (noButtonText === 'что значит нет ты дурак?') {
      setNoButtonText('пиздец');
      setNoButtonDisabled(true);
      setTimeout(() => setShowNoButton(false), 1000);
    }
  };

  const handleYesClick = () => setStage('wheel');
  const handleWheelWin = () => setStage('prize');
  const handleWheelLose = () => {};

  // ========== РЕНДЕР ==========
  return (
    <div className={classes.birthPage}>
      {/* Видеофон (скрыт на этапе auth) */}
      {/* Видеофон (только после авторизации) */}
      {stage !== 'auth' && (
        <div className={classes.videoContainer}>
          <video
            ref={videoRef}
            autoPlay
            loop
            playsInline
            className={classes.videoBackground}
            muted={isMuted}
          >
            <source src="/0215ppppp.mp4" type="video/mp4" />
          </video>
          <div className={classes.overlay} />
        </div>
      )}

      {/* Кнопка звука (везде, кроме auth) */}
      {stage !== 'auth' && (
        <ActionIcon
          className={classes.soundButton}
          onClick={toggleSound}
          variant="filled"
          size="lg"
          radius="xl"
          color="gray"
        >
          {isMuted ? <IconVolumeOff size={20} /> : <IconVolume size={20} />}
        </ActionIcon>
      )}

      {/* ЭТАП АВТОРИЗАЦИИ */}
      {stage === 'auth' && (
        <div className={classes.authScreen}>
          <Container size="xs" py="xl">
            <Paper  shadow="md" p="xl" radius="md" className={classes.authFormContainer}>
              <Title order={2} ta="center" mb="lg">
                🎂 Секретная страница
              </Title>
              <Text ta="center" mb="lg" size="sm" >
                Вот ты и на секретной страничке, но для доступа к ней введи свой пароль от ТТК (подсказка), также введи свои данные – всё поймешь.
              </Text>
              <form onSubmit={handleAuthSubmit}>
                <PasswordInput
                  label="Пароль от ТТК"
                  placeholder="Zve*****"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  required
                  mb="sm"
                />
                <TextInput
                  label="Фамилия Имя Отчество"
                  placeholder="М*******"
                  value={authForm.fullName}
                  onChange={(e) => setAuthForm({ ...authForm, fullName: e.target.value })}
                  required
                  mb="sm"
                />
                <TextInput
                  label="Возраст"
                  placeholder="2*"
                  value={authForm.age}
                  onChange={(e) => setAuthForm({ ...authForm, age: e.target.value })}
                  required
                  type="number"
                  mb="sm"
                />
                <TextInput
                  label="Дата рождения"
                  placeholder="17*****"
                  value={authForm.birthDate}
                  onChange={(e) => setAuthForm({ ...authForm, birthDate: e.target.value })}
                  required
                  mb="sm"
                />
                <TextInput
                  label="Максимальный эло на FACEIT"
                  placeholder="21**"
                  value={authForm.faceitElo}
                  onChange={(e) => setAuthForm({ ...authForm, faceitElo: e.target.value })}
                  required
                  type="number"
                  mb="sm"
                />
                <TextInput
                  label="Имя твоей девушки"
                  placeholder="Н****"
                  value={authForm.girlfriendName}
                  onChange={(e) => setAuthForm({ ...authForm, girlfriendName: e.target.value })}
                  required
                  mb="lg"
                />
                <Button type="submit" variant="gradient" gradient={{ from: 'yellow', to: 'orange' }}>
                  Проверить
                </Button>
              </form>
            </Paper>
          </Container>

          {/* Персонаж с облачком при ошибке */}
          {authErrorIndex !== -1 && (
            <div className={classes.characterContainer}>
              <img src="/harry.png" alt="Персонаж" className={classes.characterImage} />
              <Paper className={classes.speechBubble} withBorder>
                <Text>{errorPhrases[authErrorIndex]}</Text>
              </Paper>
            </div>
          )}
        </div>
      )}

      {/* ЭТАП ВИДЕО */}
      {stage === 'video' && (
        <div className={classes.stageContainer}>
          {/* Прогресс-бар (до появления поздравления) */}
          {!showCongrats && (
            <Box className={classes.progressWrapper}>
              
                <Title order={1} ta="center" className={classes.congratsTitle}>
                  С днём рождения, Вождь!
                </Title>
              
              
              <Progress value={videoProgress} size="xl" radius="xl" striped animated w="80%" maw={500} />
            </Box>
          )}

          {/* Блок с поздравлением */}
          <div className={`${classes.congratsBlock} ${showCongrats ? classes.visible : ''}`}>
            <Paper className={classes.congratsPaper}>
              <Title order={1} ta="center" className={classes.congratsTitle}>
                С днём рождения, Вождь!
              </Title>
              <Text ta="center" size="lg" className={classes.congratsText}>
                Желаем тебе счастья, здоровья и исполнения желаний!<br />
                Пусть каждый день приносит радость и удачу.
              </Text>
              {showCongrats && (
                <Button
                  size="lg"
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'orange' }}
                  onClick={() => setStage('question')}
                  mt="lg"
                >
                  Идем дальше?!
                </Button>
              )}
            </Paper>
          </div>
        </div>
      )}

      {/* ЭТАП ВОПРОСА */}
      {stage === 'question' && (
        <div className={classes.stageContainer}>
          <Container size="sm" py="xl">
            <Paper withBorder shadow="xl" p="xl" radius="md" className={classes.glassPaper}>
              <Title order={2} ta="center" mb="lg">
                Ты же самый крутой парень на московке?
              </Title>
              <Group justify="center" gap="md">
                <Button size="lg" radius="xl" variant="gradient" gradient={{ from: 'green', to: 'teal' }} onClick={handleYesClick}>
                  Да
                </Button>
                {showNoButton && (
                  <Button
                    size="lg"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: 'red', to: 'orange' }}
                    onClick={handleNoClick}
                    disabled={noButtonDisabled}
                  >
                    {noButtonText}
                  </Button>
                )}
              </Group>
            </Paper>
          </Container>
        </div>
      )}

      {/* ЭТАП РУЛЕТКИ */}
      {stage === 'wheel' && (
        <div className={classes.stageContainer}>
          <Container size="sm" py="xl">
            <Paper withBorder shadow="xl" p="xl" radius="md" className={classes.glassPaper}>
              <Title order={3} ta="center" mb="lg">
                Покажи на что способен, ты станешь самым богатым и счастливым пареньком на свете?
              </Title>
              <Text ta="center" size="sm" mb="md" c="dimmed">
                Шанс выигрыша 5%
              </Text>
              <LuckyWheel winProbability={5} onWin={handleWheelWin} onLose={handleWheelLose} />
            </Paper>
          </Container>
        </div>
      )}

      {/* ЭТАП ПРИЗА */}
      {stage === 'prize' && (
        <div className={classes.stageContainer}>
          <Container size="sm" py="xl">
            <Paper withBorder shadow="xl" p="xl" radius="md" className={classes.glassPaper} style={{ textAlign: 'center' }}>
              <Title order={2} mb="md" style={{ color: 'gold' }}>
                🎉 Ахуенно! 🎉
              </Title>
              <Text size="lg" mb="lg">
                Тогда держи подарок, напиши ему "го кс" и получи свой подарок La' passion!
              </Text>
              <Anchor href="https://t.me/hamptooon" target="_blank" size="xl" style={{ color: '#0088cc' }}>
                Ссылка на мой ТГ
              </Anchor>
            </Paper>
          </Container>
        </div>
      )}
    </div>
  );
}