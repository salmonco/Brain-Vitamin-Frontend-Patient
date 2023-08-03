import { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Card,
  FlipWrapper,
  Flip,
  Front,
  Back,
} from '../../components/games/CardMatch.tsx';
import { useLocation, useNavigate } from 'react-router';
import Timer from '../../modules/Timer.tsx';

/**
 * 난도
 * 하 : 2 * 3
 * 중 : 2 * 4
 * 상 : 3 * 4
 */
export default function CardMatch() {
  const navigate = useNavigate();
  const location = useLocation();
  const gameData = location.state.gameData;
  const gameIndex = location.state.gameIndex;
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);

  type Props = {
    imgUrl: string;
  };
  const [problemPool, setProblemPool] = useState<Props[]>(
    gameData[gameIndex].problemPool,
  );
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [clickable, setClickable] = useState<boolean>(true);
  let difficulty = gameData[gameIndex].difficulty;
  let cardCnt;

  if (difficulty === 1) {
    cardCnt = 6;
  } else if (difficulty === 2) {
    cardCnt = 8;
  } else {
    cardCnt = 12;
  }

  // const deck = Array.from(
  //   { length: cardCnt / 2 },
  //   () => '#' + Math.floor(Math.random() * 0xffffff).toString(16),
  // );
  const deck = problemPool.map((v) => v.imgUrl);
  const cards = [...deck, ...deck].map((card, i) => {
    return { idx: i, type: card, status: false };
  });
  const shuffle = () => cards.sort(() => 0.5 - Math.random());
  const mixedCards = useMemo(() => shuffle(), []);

  // 모든 카드의 상태가 true면 게임 종료
  useEffect(() => {
    if (mixedCards.every((card) => card.status === true)) {
      setIsGameEnded(true);
    }
    // 클릭된 카드가 두 장인 경우, 매칭 여부 검사
    setClickable(false);
    setTimeout(() => {
      if (clickedCards.length === 2) {
        let firstCard = mixedCards.find((card) => card.idx === clickedCards[0])
          ?.type;
        let secondCard = mixedCards.find((card) => card.idx === clickedCards[1])
          ?.type;
        // 두 카드가 같지 않은 경우, 클릭된 두 장의 카드 다시 뒤집기
        if (firstCard !== secondCard) {
          mixedCards.forEach((card) => {
            if (card.idx === clickedCards[0] || card.idx === clickedCards[1]) {
              card.status = false;
            }
          });
          console.log('매칭에 실패하셨습니다ㅠㅠ');
        } else {
          // 매칭 성공
          console.log('매칭에 성공하셨습니다!');
        }
        setClickedCards([]);
      }
      setClickable(true);
    }, 500);
  }, [clickedCards]);

  const handleClick = (idx: number) => {
    console.log(idx);
    setClickedCards((prev) => [...prev, idx]);
    mixedCards.forEach((card) => {
      if (card.idx === idx) {
        card.status = !card.status;
        return;
      }
    });
  };

  useEffect(() => {
    if (isGameEnded) {
      alert('게임이 종료되었습니다.');
      const nextGamePath = gameData[gameIndex + 1].pathUri;
      if (nextGamePath) {
        navigate(nextGamePath, {
          state: { gameData, gameIndex: gameIndex + 1 },
        });
      } else {
        // navigate('/cogTraining');
        navigate('/coloring', {
          state: { gameData, gameIndex: gameIndex + 1 },
        });
      }
    }
  }, [isGameEnded, gameData, navigate]);

  const handleTimeUp = () => {
    setIsGameEnded(true);
  };

  return (
    <>
      {isGameStarted ? (
        <>
          <Timer
            timeLimit={gameData[gameIndex].timeLimit}
            onTimeUp={handleTimeUp}
          />
          <Container $difficulty={difficulty}>
            {mixedCards.map((card) => (
              <FlipWrapper key={card.idx}>
                <Flip
                  $status={card.status}
                  $clickable={clickable}
                  onClick={() => {
                    !card.status ? handleClick(card.idx) : null;
                  }}>
                  <Card>
                    <Front $status={card.status} $background={card.type} />
                    <Back $status={card.status} />
                  </Card>
                </Flip>
              </FlipWrapper>
            ))}
          </Container>
        </>
      ) : (
        <button onClick={() => setIsGameStarted(true)}>Start Game</button>
      )}
    </>
  );
}