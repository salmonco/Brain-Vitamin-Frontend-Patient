import { useEffect, useRef, useState } from 'react';
import { Container, Desc, Body } from '../../components/games/DateQuiz';
import { GameProps } from '../../routes/gameRouter.tsx';

export default function DateQuiz({
  gameData,
  onGameEnd,
  saveGameResult,
}: GameProps) {
  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const TODAY = DATE.getDate();

  const [totalDate, setTotalDate] = useState<number[]>([]);

  const changeDate = (year: number, month: number) => {
    // 이전 날짜
    const PVLastDate = new Date(year, month - 1, 0).getDate();
    const PVLastDay = new Date(year, month - 1, 0).getDay();

    // 다음 날짜
    const ThisLasyDay = new Date(year, month, 0).getDay();
    const ThisLasyDate = new Date(year, month, 0).getDate();

    // 이전 날짜 만들기
    let PVLD = [];
    if (PVLastDay !== 6) {
      for (let i = 0; i < PVLastDay + 1; i++) {
        PVLD.unshift(PVLastDate - i);
      }
    }

    // 다음 날짜 만들기
    let TLD = [];
    for (let i = 1; i < 7 - ThisLasyDay; i++) {
      if (i === 0) {
        return TLD;
      }
      TLD.push(i);
    }

    // 현재날짜
    let TD = [];
    TD = [...Array(ThisLasyDate + 1).keys()].slice(1);
    return PVLD.concat(TD, TLD);
  };

  useEffect(() => {
    setTotalDate(changeDate(YEAR, MONTH));
  }, []);

  return (
    <Container>
      <Desc>
        {YEAR}년 {MONTH}월 달력을 보고 있습니다.
        <br />
        아래 달력에서 오늘의 날짜를 터치해주세요.
      </Desc>
      <Body
        totalDate={totalDate}
        today={TODAY}
        gameData={gameData}
        onGameEnd={onGameEnd}
        saveGameResult={saveGameResult}
      />
    </Container>
  );
}
