import styled from 'styled-components';

const Container = styled.div<{ $difficulty: number }>`
  display: grid;
  grid-gap: 2rem;
  ${(props) =>
    props.$difficulty === 1
      ? `
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 100rem;
  margin: 0 auto;`
      : props.$difficulty === 2
      ? `
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  max-width: 140rem;
  margin: 0 auto;`
      : `
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }`}
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: all 0.2s ease-in;
  transform-style: preserve-3d;
`;

const FlipWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 150%;
`;

const Flip = styled.div<{ $status: boolean; $clickable: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  perspective: 110rem;
  &:active ${Card} {
    transform: rotateY(180deg);
  }
  pointer-events: ${(props) =>
    props.$status || !props.$clickable ? 'none' : 'auto'};
  cursor: pointer;
`;

const Front = styled.div<{ $status: boolean; $background: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: url(${(props) => props.$background});
  background-size: cover;
  transform: ${(props) =>
    props.$status ? 'rotateY(0deg)' : 'rotateY(180deg)'};
`;

const Back = styled.div<{ $status: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: royalblue;
  transform: ${(props) =>
    props.$status ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const RestartBtn = styled.button`
  font-size: 4rem;
  padding: 2rem;
  margin: 2rem 0 0 0;
`;

export { Container, Card, FlipWrapper, Flip, Front, Back, RestartBtn };