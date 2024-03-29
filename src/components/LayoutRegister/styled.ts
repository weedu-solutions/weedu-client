import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const ImageContainer = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .image_bg_wrapper {
    width: 100%;
    height: 100%;
    position: absolute;

    .image_bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-position: center;
    }
  }
`

export const FormContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow: auto;

  strong {
    font-size: 32px;
    text-align: center;
    margin-bottom: 50px;
  }

  .formcontainer_inputs {
    width: 100%;
    height: 100%;
  }
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`