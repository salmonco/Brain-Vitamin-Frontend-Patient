import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Container,
  PaperWrapper,
  Paper,
  CellWrapper,
  Cell,
  PaletteWrapper,
  Palette,
} from '../../components/games/Coloring';
import { GameProps } from '../../routes/gameRouter.tsx';

/**
 * 난도별 색칠해야 할 칸의 개수 상이
 * 하 : 8
 * 중 : 13
 * 상 : 18
 */
export default function Coloring({
  gameData,
  onGameEnd,
  saveGameResult,
  isNextButtonClicked,
  setAnswerState,
  answerState,
}: GameProps) {
  const [nowColor, setNowColor] = useState('red');
  const cellRefs = useRef<null[] | HTMLDivElement[]>([]);
  let difficulty = gameData.difficulty;
  let totalCellCnt = 18;
  let cellCnt;
  switch (difficulty) {
    case 1:
      cellCnt = 8;
      break;
    case 2:
      cellCnt = 13;
      break;
    case 3:
      cellCnt = 18;
  }
  const COLOR = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white'];
  type colorsProps = {
    idx: number;
    color: string;
  };
  let colors: colorsProps[] = [];
  if (cellCnt) {
    for (let i = 0; i < cellCnt; i++) {
      let randomIndex = Math.floor(Math.random() * (COLOR.length - 1));
      colors.push({ idx: colors.length, color: COLOR[randomIndex] });
    }
    for (let i = 0; i < totalCellCnt - cellCnt; i++) {
      colors.push({ idx: colors.length, color: 'white' });
    }
  }
  const answer = useMemo(() => [...colors].sort(() => 0.5 - Math.random()), []);
  const startTimeRef = useRef<Date | null>(new Date());
  const endTimeRef = useRef<Date | null>(null);
  let duration = useRef(0);

  // 흰색인 것은 초기에 색칠되어 있도록 함
  answer.forEach((v, i) => {
    if (v.color === 'white') {
      cellRefs.current[i]?.setAttribute('color', 'white');
    }
  });

  const checkAnswer = async () => {
    let isIncorrect = false;
    for (let i = 0; i < cellRefs.current.length; i++) {
      let el = cellRefs.current[i];
      if (el?.getAttribute('color') !== answer[i].color) {
        // 오답
        isIncorrect = true;
        break;
      }
    }
    if (isIncorrect) {
      setAnswerState('incorrect');
    } else {
      // 정답
      setAnswerState('correct');
      saveGameResult(gameData.problemId, duration.current, 'SUCCESS', 10);
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setAnswerState('');
          resolve();
        }, 2000);
      });
      onGameEnd();
    }
  };

  useEffect(() => {
    if (answerState === 'incorrect') {
      const handleIncorrect = async () => {
        saveGameResult(gameData.problemId, duration.current, 'FAIL', 0);
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setAnswerState('');
            resolve();
          }, 2000);
        });
        onGameEnd();
      };
      handleIncorrect();
    }
  }, [answerState]);

  useEffect(() => {
    if (isNextButtonClicked) {
      endTimeRef.current = new Date();
      if (startTimeRef.current && endTimeRef.current) {
        duration.current =
          (endTimeRef.current.getTime() - startTimeRef.current.getTime()) /
          1000;
      }
      checkAnswer();
    }
  }, [isNextButtonClicked]);

  const changeCellColor = (el: HTMLElement) => {
    el.setAttribute('color', nowColor);
    el.style.background = nowColor;
  };

  return (
    <Container>
      <PaletteWrapper>
        {COLOR.map((color) => (
          <Palette
            key={color}
            color={color}
            $nowColor={nowColor}
            onClick={() => setNowColor(color)}
          />
        ))}
      </PaletteWrapper>
      <PaperWrapper>
        <Paper>
          {answer.map((v) => (
            <CellWrapper key={v.idx}>
              <Cell color={v.color} />
            </CellWrapper>
          ))}
        </Paper>
        <Paper>
          {answer.map((v, index) => (
            <CellWrapper key={v.idx}>
              <Cell
                onClick={(e) => changeCellColor(e.target as HTMLElement)}
                ref={(el) => (cellRefs.current[index] = el)}
              />
            </CellWrapper>
          ))}
        </Paper>
      </PaperWrapper>
    </Container>
  );
}
