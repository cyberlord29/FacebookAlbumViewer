import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  font-weight: 700;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
`;
export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const Navigation = styled.div`
  flex-shrink: 0;
  background: #fff;
  height: 200vh;
`;
export const Body = styled.div`
  padding: 12px;
  height: 100vh;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

export const ExampleContainer = styled.div`
  background: #fff;
`;

export const ExampleNavigation = styled(Navigation)`
  margin-right: 4px;
`;

export const ExampleBody = styled.div`  
  background: #fff;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.125);
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;  
  height:100%;
  width:100%;
`;

