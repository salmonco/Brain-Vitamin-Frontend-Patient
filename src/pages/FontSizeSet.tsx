import { useNavigate } from 'react-router';
import { setFirstRun } from '../utils/firstRun';
import Label from '../components/common/Label';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import { useState } from 'react';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';

function FontSizeSet() {
  const [fontSize, setFontSize] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goNext = () => {
    setFirstRun();
    dispatch(userSlice.actions.setFontSize(fontSize));
    navigate('/phoneNumberSet');
  };

  return (
    <Container>
      <Label>글자 크기를 설정해주세요</Label>
      <BoxWrapper>
        <Box
          style={{
            background: fontSize === 3 ? 'var(--main-bg-color)' : 'white',
            border: fontSize === 3 ? '0.2rem solid var(--main-color)' : 'none',
          }}
          onClick={() => setFontSize(3)}>
          <LabelLarge>크게</LabelLarge>
          <Large>잘했고, 잘해왔고, 잘할 거야</Large>
        </Box>
        <Box
          style={{
            background: fontSize === 2 ? 'var(--main-bg-color)' : 'white',
            border: fontSize === 2 ? '0.2rem solid var(--main-color)' : 'none',
          }}
          onClick={() => setFontSize(2)}>
          <LabelMedium>중간</LabelMedium>
          <Medium>잘했고, 잘해왔고, 잘할 거야</Medium>
        </Box>
        <Box
          style={{
            background: fontSize === 1 ? 'var(--main-bg-color)' : 'white',
            border: fontSize === 1 ? '0.2rem solid var(--main-color)' : 'none',
          }}
          onClick={() => setFontSize(1)}>
          <LabelSmall>작게</LabelSmall>
          <Small>잘했고, 잘해왔고, 잘할 거야</Small>
        </Box>
      </BoxWrapper>
      <Button
        style={{ margin: '0 auto' }}
        disabled={!fontSize}
        onClick={goNext}>
        다음
      </Button>
    </Container>
  );
}

const Container = styled.div`
  max-width: 192rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.6rem;
  height: 100vh;
  align-items: center;
`;

const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 4.6rem;
  flex-wrap: wrap;
  margin: 6.6rem 0 11.2rem 0;
  @media screen and (max-width: 767px) {
    gap: 2rem;
    margin: 1rem 0 2rem 0;
  }
`;

const Box = styled.button`
  width: 35.8rem;
  height: 24.5rem;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1.8rem 0 rgba(0, 0, 0, 0.1);
  padding: 3.7rem 2.2rem;
  word-break: keep-all;
  @media screen and (max-width: 767px) {
    width: 16rem;
    height: 11rem;
    padding: 1.35rem 1.1rem;
  }
`;

const LabelLarge = styled.p`
  font-size: 3.2rem;
  color: var(--main-color);
  font-family: 'Pretendard-Bold';
  margin: 0 0 1.8rem 0;
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

const LabelMedium = styled.p`
  font-size: 2.6rem;
  color: var(--main-color);
  font-family: 'Pretendard-Bold';
  margin: 0 0 1.8rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const LabelSmall = styled.p`
  font-size: 2.2rem;
  color: var(--main-color);
  font-family: 'Pretendard-Bold';
  margin: 0 0 1.8rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

const Large = styled.p`
  font-size: 3.2rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

const Medium = styled.p`
  font-size: 2.6rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const Small = styled.p`
  font-size: 2.2rem;
  font-family: 'Pretendard-Bold';
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

export default FontSizeSet;
