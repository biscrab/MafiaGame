import * as S from '../styled/App'

const LoginBorder = () => {
    return(
        <S.Background>
            <S.LoginBorder>
                <h1>로그인</h1>
                <S.LoginInput></S.LoginInput>
                <S.LoginInput></S.LoginInput>
                <S.LoginButton></S.LoginButton>
                <S.LoginButton></S.LoginButton>
            </S.LoginBorder>
        </S.Background>
    )
}

export default LoginBorder