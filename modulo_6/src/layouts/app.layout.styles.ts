import { css } from '@emotion/css';

export const content = css`
  padding: 1.5rem;

  @media (min-width: 720px) {
    padding: 2rem;
  }
`;

export const toolbar = css`
  display: flex;
  min-height: 4rem;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const brand = css`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const sourceSelector = css`
  background: white;

  button {
    min-width: 4.5rem;
  }
`;

export const navigation = css`
  background: white;

  .MuiTabs-flexContainer {
    max-width: 82rem;
    margin: 0 auto;
  }
`;
