import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-family: "Francois One", sans-serif;
`;

export const Title = styled.div`
  font-size: 3rem;
  margin-top: 2rem;
`;

export const Buttons = styled.div`
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
`;

export const Enter = styled.button`
  justify-self: start;
  align-self: center;
  background: #ffffff;
  font-size: 1rem;
  border: 5px solid #f5f7fa;
  box-sizing: border-box;
  box-shadow: 0px 8px 24px #eff3f9;
  border-radius: 40px;
  padding: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  &:enabled {
    &:hover {
      color: black;
      background: #e6e6e6;
      border: 5px solid #d2d2d4;
    }
  }
`;

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const First = styled.div`
  justify-self: end;
  align-self: center;
  background: #ffffff;
  border: 5px solid #f5f7fa;
  box-sizing: border-box;
  box-shadow: 0px 8px 24px #eff3f9;
  border-radius: 40px;
  padding: 1rem;
  width: 100%;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background: #ffffff;
  border: 2px solid #f5f7fa;
  box-sizing: border-box;
  box-shadow: 0px 8px 24px #eff3f9;
  border-radius: 40px;
  padding: 1rem;
  margin: 0.3rem;
  width: 60%;
  border: ${(props) =>
    props.chosen ? "2px solid #DBEFF4" : "2px solid #f5f7fa"};
`;
