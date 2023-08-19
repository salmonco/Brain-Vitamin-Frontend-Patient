import { styled } from 'styled-components';
import LeftTapBar from '../components/common/LeftTapBar';
import BottomTapBar from '../components/common/BottomTapBar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import axios from 'axios';
import { useAppDispatch } from '../store';
import userSlice from '../slices/user';
import { useNavigate } from 'react-router';

function Setting() {
  const { nickname, familyKey, accessToken, fontSize } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toProfile = () => {
    alert('해당 기능은 향후 추가될 예정이에요.');
  };

  const toPhoneNumberEdit = () => {
    alert('해당 기능은 향후 추가될 예정이에요.');
  };

  const toFontSizeEdit = () => {
    alert('해당 기능은 향후 추가될 예정이에요.');
  };

  const handleSignout = async () => {
    const confirmed = window.confirm('정말 회원탈퇴하시겠습니까?');
    if (!confirmed) return;
    const refreshToken = await localStorage.getItem('refreshToken');
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/signout`,
        {
          accessTokenDto: {
            accessToken,
          },
          refreshTokenDto: {
            refreshToken,
          },
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      await localStorage.removeItem('refreshToken');
      await localStorage.removeItem('accessToken');
      dispatch(
        userSlice.actions.setUser({
          name: '',
          nickname: '',
          fontSize,
          phoneNumber: '',
          familyKey: '',
          accessToken: '',
        }),
      );
      alert(data.result);
      navigate('/logIn');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    const confirmed = window.confirm('정말 로그아웃하시겠습니까?');
    if (!confirmed) return;
    const refreshToken = await localStorage.getItem('refreshToken');
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/logout`,
        {
          accessTokenDto: {
            accessToken,
          },
          refreshTokenDto: {
            refreshToken,
          },
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      await localStorage.removeItem('refreshToken');
      await localStorage.removeItem('accessToken');
      dispatch(
        userSlice.actions.setUser({
          name: '',
          nickname: '',
          fontSize,
          phoneNumber: '',
          familyKey: '',
          accessToken: '',
        }),
      );
      alert(data.result);
      navigate('/logIn');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <LeftTapBar />
      <Container2>
        <Container3>
          <Box>
            <Version>버전 : 1.0</Version>
            <ProfileContainer>
              <ProfileImage alt="" src="/assets/images/profile-default.svg" />
              <Name>{nickname}</Name>
              <Sub>가족 고유번호 : {familyKey}</Sub>
            </ProfileContainer>
            <ButtonContainer>
              <EditButton onClick={toProfile}>회원정보 변경하기</EditButton>
              <EditButton onClick={toPhoneNumberEdit}>
                전화번호 변경하기
              </EditButton>
              <EditButton onClick={toFontSizeEdit}>
                글자크기 변경하기
              </EditButton>
            </ButtonContainer>
          </Box>
          <SubButtonContainer>
            <SignoutButton onClick={handleSignout}>회원탈퇴</SignoutButton>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </SubButtonContainer>
        </Container3>
      </Container2>
      <BottomTapBar />
    </Container>
  );
}

const Container = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Container2 = styled.div`
  padding: 5rem;
  display: flex;
  gap: 2.8rem;
  justify-content: center;
  height: 100vh;
  @media screen and (min-width: 768px) {
    align-items: center;
    flex-direction: column;
    width: 140rem;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    padding: 3rem 1.6rem;
    gap: 1rem;
    align-content: flex-start;
  }
`;
const Container3 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 87rem;
  height: 48.7rem;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3.7rem 6.9rem 3.7rem 11rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 3rem 2rem;
    flex-direction: column;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 41.2rem;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;
const ProfileImage = styled.img`
  width: 20rem;
  height: 20rem;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
  }
`;
const Name = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: 2.6rem;
  color: #433d3a;
  margin: 2.9rem 0 1.3rem 0;
  @media screen and (max-width: 767px) {
    font-size: 2.2rem;
    margin: 1.5rem 0 1rem 0;
  }
`;
const Sub = styled.span`
  font-size: 1.6rem;
  color: #433d3a;
`;
const EditButton = styled.button`
  width: 100%;
  height: 5.7rem;
  border-radius: 0.8rem;
  border: 0.2rem solid #e8e8e8;
  font-size: 2.2rem;
  font-family: 'Pretendard-Medium';
  color: #433d3a;
  background: white;
  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
  }
`;
const Version = styled.span`
  font-size: 1.6rem;
  color: #433d3a;
  position: absolute;
  top: 4rem;
  right: 7rem;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    top: 2rem;
    right: 2rem;
  }
`;
const SubButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 87rem;
  gap: 1.2rem;
  margin: 4.5rem 0 0 0;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 2rem 0 0 0;
  }
`;
const SignoutButton = styled.button`
  width: 20rem;
  height: 5.7rem;
  border-radius: 0.8rem;
  background: #ffe1e1;
  color: #ff3c3c;
  font-size: 2.2rem;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;
const LogoutButton = styled.button`
  width: 20rem;
  height: 5.7rem;
  border-radius: 0.8rem;
  border: 0.2rem solid #e8e8e8;
  background: none;
  color: #6d6b69;
  font-size: 2.2rem;
  font-family: 'Pretendard-Medium';
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

export default Setting;