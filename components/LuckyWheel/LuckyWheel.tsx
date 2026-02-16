'use client';

import { Button} from '@mantine/core';
import { useState } from 'react';
import classes from './LuckyWheel.module.css';

interface LuckyWheelProps {
  winProbability?: number;
  onWin?: () => void;
  onLose?: () => void;
}
export function LuckyWheel({ winProbability = 10, onWin, onLose }: LuckyWheelProps) {
  const chance = 10; // %
  const winAngleSize = 360 * (chance / 100);
  const [rotation, setRotation] = useState(210);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState<boolean | null>(null);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setWin(null);

    const spins = 6;

    // случайное попадание по честному шансу
    const isWin = Math.random() < 1;

    let stopAngle;

    if (isWin) {
      // попадаем внутрь зелёной зоны (снизу)
      const half = winAngleSize / 2;
      stopAngle = 90 - half + Math.random() * winAngleSize;
    } else {
      // попадаем вне зелёной зоны
      do {
        stopAngle = Math.random() * 360;
      } while (
        stopAngle >= 90 - winAngleSize / 2 &&
        stopAngle <= 90 + winAngleSize / 2
      );
    }

    const finalRotation = spins * 360 + 160;
    console.log('finalRotation',finalRotation)
    console.log('winAngleSize',winAngleSize)

    setRotation(finalRotation);

    setTimeout(() => {
      setWin(isWin);
      if (isWin && onWin){ 
        console.log('Победа! Вращение остановилось на угле:', stopAngle);
        onWin();

      }
      if (!isWin && onLose) onLose();
      setSpinning(false);
      setRotation(0)
    }, 4000);
  };

  return (
    <div className={classes.chanceHolder}>
      <div className={classes.chanceWrapper}>

        <div className={classes.donutBg} />

        {/* ЗАЛИВКА 10% СНИЗУ */}
        <svg viewBox="0 0 202 202" className={classes.fillCircle}>
          <defs>
            <clipPath id="clipPath">
              <rect
                x="0"
                y={202 - (202 * chance) / 100}
                width="202"
                height={(202 * chance) / 100}
              />
            </clipPath>
          </defs>

          <circle
            cx="101"
            cy="101"
            r="101"
            fill="rgba(47,201,0,0.7)"
            clipPath="url(#clipPath)"
          />
        </svg>

        {/* 🔥 СТРЕЛКА СНАРУЖИ */}
        <div
          className={classes.outerArrow}
          style={{
            transform: `rotate(${rotation}deg)`
          }}
        >
          ▼
        </div>

        <div className={classes.chancePreview}>
          <div className={classes.odometer}>
            {winProbability?.toFixed(2) || 0}%
          </div>
          <h2 className={classes.chanceLabel}>низкий шанс</h2>
        </div>
      </div>

      <div className={classes.upgradeButtonWrapper}>
        <Button
          onClick={spinWheel}
          disabled={spinning}
          className={classes.upgradeButton}
        >
          ПРОКАЧАТЬ
        </Button>
      </div>

      {win !== null && (
        <div className={classes.prizeMessage}>
          {win ? '🎉 ШАНС СЫГРАЛ!' : '😢 Не повезло'}
        </div>
      )}
    </div>
  );
}
