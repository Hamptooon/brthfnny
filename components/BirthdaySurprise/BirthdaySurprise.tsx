'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, Button, Paper } from '@mantine/core';
import classes from './BirthdaySurprise.module.css';
import { useIllusion } from '@/app/context/IllusionContext';
import { useBirthday } from '@/app/context/BirthdaySurpriseContext';

const wrongReplies = [
  'Ты что дурак? Вот тебе подсказка La baget',
  'Нет, попробуй ещё. Подсказка: это французское словосочетание',
  'Не угадал. Может, вспомнишь, что я люблю?',
  'Опять мимо. Ла багет, а слово?',
  'Ты что сука?! издеваешься Merde',
];
const birtdayVisitedMesage = 'О похоже ты уже переходил на страничку и отгадывал мое любимое слово, но не прошел авторизацию, в шапке появилась ссылка нажми на нее!'
const birtdayVisitedAuthCompletedMessage = 'О похоже ты уже был на секретной страничке, в шапке появилась ссылка нажми на нее, если хочешь еще!'

const correctAnswers = ['la passion', 'ля пассион', 'ля пасьон'];

export function BirthdaySurprise() {
  const router = useRouter();
  const {
    authCompleted,
    birthdayVisited,
    setAuthCompleted,
    setBirthdayVisited,
    setHasAttemptedAuth,
  } = useBirthday();
  const {isIllusionBroken} = useIllusion()

  const [characterVisible, setCharacterVisible] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState(
    'Эмаа ну что насмотрелся? У тебя же сегодня день рождение!! Напиши мое любимое слово в поле и узнаешь что будет'
  );
  const [wrongIndex, setWrongIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFlyingGif, setShowFlyingGif] = useState(false);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  // Проверка даты: сегодня 17 февраля?
  const isBirthdayDate = () => {
    const today = new Date();
    return today.getMonth() === 1 && (today.getDate() === 16 || today.getDate() === 17|| today.getDate() === 18); // февраль = 1
  };

  useEffect(() => {
    if (!isIllusionBroken) return;

    if (!isBirthdayDate()) {
      setMessage('Сегодня не мой день, приходи 17 февраля!');
      setCharacterVisible(true);
      setBubbleVisible(true);
      startTyping('Сегодня не мой день, приходи 17 февраля!');
      return;
    }

    const timer = setTimeout(() => {
      setCharacterVisible(true);
      setTimeout(() => {
        setBubbleVisible(true);
        startTyping(message);
      }, 500);
    }, 20000); // задержка 5 секунд после загрузки страницы

    return () => clearTimeout(timer);
  }, [isIllusionBroken]);

  const startTyping = (text: string) => {
    if (typingRef.current) clearInterval(typingRef.current);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        typingRef.current = null;
        if (!isCorrect) setInputVisible(true);
      }
    }, 40);
    typingRef.current = interval;
  };

  useEffect(() => {
    if (bubbleVisible) {
      if(birthdayVisited && !authCompleted) {
        startTyping(birtdayVisitedMesage)
      }
      else if (birthdayVisited && authCompleted) {
        startTyping(birtdayVisitedAuthCompletedMessage)
      }
      else {
        startTyping(message);
      }
      
    }
  }, [message, bubbleVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (correctAnswers.includes(trimmed)) {
      setIsCorrect(true);
      setMessage('Молодец, а теперь поймай эту стерву!');
      setInputVisible(false);
      setInputValue('');

      setTimeout(() => {
        setCharacterVisible(false);
        setBubbleVisible(false);
        setShowFlyingGif(true);
      }, 2000);
    } else {
      const nextIndex = (wrongIndex + 1) % wrongReplies.length;
      setWrongIndex(nextIndex);
      setMessage(wrongReplies[nextIndex]);
      setInputValue('');
      setHasAttemptedAuth(true); // фиксируем попытку (неудачную)
    }
  };

  const handleGifClick = () => {
    setShowFlyingGif(false);
    setBirthdayVisited(true); // пользователь перешёл на страницу дня рождения
    router.push('/birthday');
  };

  if (!isIllusionBroken) return null;

  // Если сегодня не день рождения – показываем только сообщение без поля ввода
  if (!isBirthdayDate()) {
    return (
      <div className={classes.container}>
        <img
          src="/angel.png"
          alt="Персонаж"
          className={`${classes.character} ${characterVisible ? classes.visible : ''}`}
        />
        {bubbleVisible && (
          <Paper className={classes.bubble} withBorder>
            <div className={classes.typingText}>{displayText}</div>
          </Paper>
        )}
      </div>
    );
  }
   if (birthdayVisited) {
    return (
      <div className={classes.container}>
        <img
          src="/angel.png"
          alt="Персонаж"
          className={`${classes.character} ${characterVisible ? classes.visible : ''}`}
        />
        {bubbleVisible && (
          <Paper className={classes.bubble} withBorder>
            <div className={classes.typingText}>{displayText}</div>
          </Paper>
        )}
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <img
        src="/angel.png"
        alt="Персонаж"
        className={`${classes.character} ${characterVisible ? classes.visible : ''}`}
      />
      {bubbleVisible && (
        <Paper className={classes.bubble} withBorder>
          <div className={classes.typingText}>{displayText}</div>
          {inputVisible && (
            <div className={classes.inputArea}>
              <TextInput
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Введи слово..."
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button onClick={handleSubmit} size="xs" mt="xs">
                Отправить
              </Button>
            </div>
          )}
        </Paper>
      )}

      {showFlyingGif && (
        <img
          src="/danceDebra.gif"
          alt="Лети!"
          className={classes.flyingGif}
          onClick={handleGifClick}
        />
      )}
    </div>
  );
}