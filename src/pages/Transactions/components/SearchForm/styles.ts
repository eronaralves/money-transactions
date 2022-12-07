import styled from "styled-components";

export const SearchFormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    padding: 1rem;
    color: ${props => props.theme["gray-300"]};
    background-color: ${props => props.theme["gray-900"]};

    &::placeholder {
      color: ${props => props.theme["gray-500"]};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 0;
    border-radius: 6px;
    border: 1px solid ${props => props.theme
    ["green-300"]};
    padding: 1rem 2rem;
    font-weight: bold;

    color: ${props => props.theme["green-300"]};
    background-color: transparent;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      border: 1px solid ${props => props.theme
      ["green-500"]};
      color: ${props => props.theme.white};
      background-color: ${props => props.theme["green-500"]};

      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`