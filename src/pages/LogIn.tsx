import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import Label from '../components/common/Label';
import { useState } from 'react';
import Input from '../components/common/Input';
import ShortInput from '../components/common/ShortInput';
import Button from '../components/common/Button';
import axios from 'axios';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';

function LogIn() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [authNum, setAuthNum] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.trim());
  };

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.trim());
  };

  const sendCode = async () => {
    const phoneNumberRegex = /^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      alert('전화번호를 올바르게 입력해주세요.');
      return;
    }
    alert('인증번호가 전송되었습니다.');
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/sms`,
        {
          to: phoneNumber,
          content: '',
        },
      );
      setAuthNum(data.result.authNum);
    } catch (error) {
      console.error(error);
    }
  };

  const logIn = async () => {
    if (code !== authNum) {
      alert('인증번호가 올바르지 않습니다. 다시 입력해주세요.');
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/login`,
        {
          phoneNumber,
          status: 'ACTIVE',
          authorities: [
            {
              authority: 'PATIENT',
            },
          ],
        },
      );
      if (!data.isSuccess) {
        alert(data.message);
        return;
      }
      dispatch(
        userSlice.actions.setUser({
          name: data.result.name,
          nickname: data.result.nickname,
          fontSize: data.result.fontSize,
          phoneNumber: data.result.phoneNumber,
          familyKey: data.result.familyKey,
          accessToken: data.result.accessTokenDto.accessToken,
        }),
      );
      await localStorage.setItem(
        'refreshToken',
        data.result.refreshTokenDto.refreshToken,
      );
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const toSignUp = () => {
    navigate('/phoneNumberSet');
  };

  return (
    <Container>
      <Box>
        <Wrapper>
          <Label style={{ textAlign: 'center' }}>로그인</Label>
          <ShortInput
            style={{ margin: '8.2rem 0 1.6rem 0' }}
            label="전화번호"
            desc="010 1234 5678"
            value={phoneNumber}
            callbackFn={onChangePhoneNumber}
            buttonText="인증하기"
            onClickButton={sendCode}
          />
          <Input
            label="인증번호"
            desc="인증번호를 입력해주세요"
            value={code}
            callbackFn={onChangeCode}
          />
          <Button
            style={{ margin: '3rem 0 0 0' }}
            disabled={!phoneNumber || !code}
            onClick={logIn}>
            로그인
          </Button>
        </Wrapper>
        <Button onClick={toSignUp}>처음이신가요? 회원가입하기</Button>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  max-width: 192rem;
  display: flex;
  justify-content: center;
  padding: 1.6rem;
  margin: 16rem 0 0 0;
  @media screen and (max-width: 767px) {
    margin: 3rem 0 0 0;
  }
`;

const Box = styled.div`
  width: 86.8rem;
  height: 71.9rem;
  border-radius: 16px;
  background: #fff;
  box-shadow: 15px 13px 28px 0px rgba(0, 0, 0, 0.06);
  padding: 7.2rem 0 4.6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    width: 35rem;
    height: 60rem;
    padding: 1.6rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default LogIn;