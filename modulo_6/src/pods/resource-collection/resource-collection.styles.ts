import { css } from '@emotion/css';
import { theme } from '#core/theme';

export const root = css`
  max-width: 82rem;
  margin: 0 auto;

  & > :nth-child(n + 2) {
    margin-top: 2rem;
  }
`;

export const list = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (min-width: ${theme.breakpoints.values.sm}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.values.md}px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const card = css`
  height: 100%;
`;

export const facts = css`
  display: grid;
  gap: 0.75rem;
  margin: 1.25rem 0 0;

  dt {
    color: ${theme.palette.text.secondary};
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  dd {
    margin: 0.125rem 0 0;
  }
`;

export const feedback = css`
  display: grid;
  min-height: 12rem;
  place-items: center;
`;
