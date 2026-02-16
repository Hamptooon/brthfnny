'use client'

import { useState, useEffect, useRef } from 'react';
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
import classes from '../../../lll.module.css'
import { HeaderPrime } from '@/components/HeaderPrime/HeaderPrime';
import { useIllusion } from '@/app/context/IllusionContext';

const profileImage = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';

export default function LearnPage() {
  const { isIllusionBroken } = useIllusion();

  if (isIllusionBroken) {
    return (
     <div className={classes.show} style={{ position: 'relative', minHeight: '100vh' }}>
        <HeaderPrime />

        {/* Видеофон на весь экран */}
        <video autoPlay loop muted playsInline className={classes.videoBackground}>
          <source src="/0216666666.mp4" type="video/mp4" />
        </video>
        {/* Затемняющий оверлей для читаемости текста */}
        <div className={classes.overlay} />

        {/* Контент поверх видео */}
        {/* <div style={{ position: 'relative', zIndex: 2 }}> */}

           <div className={`${classes.content} `}>
            {/* <Stack  gap="md" className={classes.combinedAnimations}>
              <Image
            src="/radik-bio.png"
            width={680}
            height={680}
            alt="Radik Icon"
          />
            </Stack> */}

            <Stack gap="md" className={`${classes.combinedAnimations2} ${classes.textBioWrapper2}`}>
              <div className={classes.textBio}>
                <h1>⚡ Контакты ⚡</h1>
                <p>
                  🌍 О вы и правда хотите написать ему?
                </p>
                <p>
                   Вот все ссылки на него, это полный деанон.
                </p>
                <p>
                  TG <a href="https://t.me/radik_gg" target="_blank" rel="noopener noreferrer">Егошный телеграм</a>
                </p>
                <p>
                  VK <a href="https://vk.com/youngstamp" target="_blank" rel="noopener noreferrer">Вк ублюдка</a>
                </p>
                <p>
                  INST <a href="https://www.instagram.com/youngstamp1?igsh=MTFjeGJ1eXkyaXFybA==" target="_blank" rel="noopener noreferrer">Фотки легенды</a>
                </p>
                
                
              </div>
            </Stack>
            
          </div>
      </div>
    );
  }
  return (
    <div>Куда ты зашел дурак? Здесь ничего нет....</div>
  )
  

  // ========== СКУЧНАЯ СТРАНИЦА ==========
  
}