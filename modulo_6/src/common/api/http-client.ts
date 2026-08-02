const graphQLApiUrl = 'https://rickandmortyapi.com/graphql';

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

export const getJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new HttpError(
      response.statusText || 'The request could not be completed',
      response.status
    );
  }

  return response.json() as Promise<T>;
};

interface GraphQLError {
  message: string;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export const graphQLRequest = async <TData, TVariables>(
  query: string,
  variables: TVariables
): Promise<TData> => {
  const response = await fetch(graphQLApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new HttpError(
      response.statusText || 'The GraphQL request could not be completed',
      response.status
    );
  }

  const payload = (await response.json()) as GraphQLResponse<TData>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map(({ message }) => message).join('\n'));
  }

  if (!payload.data) {
    throw new Error('The GraphQL response does not contain data');
  }

  return payload.data;
};
