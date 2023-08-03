import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import moleHillImage from '../../assets/molehill.png';
import moleImage from '../../assets/mole.png';

const AllMolesContainer = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: auto auto auto;
`;

const MoleWrapper = styled.div`
  border: 0.1rem dashed black;
  img {
    object-fit: fill;
    max-width: 100%;
  }
`;

type EmptySlotProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function EmptySlot({ setIsVisible }: EmptySlotProps) {
  useEffect(() => {
    let numSeconds = Math.ceil(Math.random() * 4000);
    let timer = setTimeout(() => {
      setIsVisible(true);
    }, numSeconds);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <img src={moleHillImage} />
    </div>
  );
}

type MoleProps = {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleWhack: () => void;
};

function Mole({ setIsVisible, handleWhack }: MoleProps) {
  useEffect(() => {
    let numSeconds = Math.ceil(Math.random() * 5000);
    let timer = setTimeout(() => {
      setIsVisible(false);
    }, numSeconds);
    return () => clearTimeout(timer);
  });

  return (
    <div onClick={handleWhack}>
      <img src={moleImage} />
    </div>
  );
}

type MoleContainerProps = {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  score: number;
};

function MoleContainer({ setScore, score }: MoleContainerProps) {
  let [isVisible, setIsVisible] = useState(false);

  let handleWhack = () => {
    if (isVisible) {
      setScore(score + 1);
      setIsVisible(false);
    }
  };

  return (
    <MoleWrapper>
      {isVisible ? (
        <Mole setIsVisible={setIsVisible} handleWhack={handleWhack} />
      ) : (
        <EmptySlot setIsVisible={setIsVisible} />
      )}
    </MoleWrapper>
  );
}

export { AllMolesContainer, MoleContainer };