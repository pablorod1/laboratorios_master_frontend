import { css } from '@emotion/css';

export const root = css`
  max-width: 56rem;
  margin: 0 auto;
`;

export const summary = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;

  @media (min-width: 720px) {
    grid-template-columns: 18rem 1fr;
  }
`;

export const image = css`
  width: 100%;
  max-width: 18rem;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 0.5rem;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const metadata = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin: 0;

  dt {
    font-weight: 700;
  }

  dd {
    margin: 0.25rem 0 0;
  }
`;

export const actions = css`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;
