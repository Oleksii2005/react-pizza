import { Description, Span, Title, Wrapper } from "./NotFound.styled";

export const NotFound = () => {
  return (
    <Wrapper>
      <Title>
        <Span>🙃</Span>
        <br />
        Nothing found
      </Title>
      <Description>
        Unfortunately, this page is not available in our online store.
      </Description>
    </Wrapper>
  );
};
