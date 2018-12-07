import React, { ReactElement } from "react";
import { Typography, Paper } from "@material-ui/core";
import styled from "styled-components";

const ErrorText = styled(Typography)`
  color: #b00020;
`;

const ErrorTitle = styled(ErrorText)`
  margin-bottom: 10px;
  display: block;
`;

const ErrorWrapper = styled(Paper)`
  padding: 10px;
  border: 1px solid rgba(178, 0, 32, 0.2);
`;

interface ErrorMessageProps {
  error: Error;
}

export const ErrorMessage: React.FunctionComponent<ErrorMessageProps> = (props): ReactElement<any> => {
  const { error } = props;

  return (
    <ErrorWrapper>
      <ErrorTitle variant="h5">{error.name}</ErrorTitle>
      <ErrorText>{error.message}</ErrorText>
      <ErrorText>{error.stack}</ErrorText>
    </ErrorWrapper>
  );
};
