import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  YogaDimension: { input: number | "auto"; output: number | "auto"; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type CssGridContainerStyle = {
  __typename?: 'CSSGridContainerStyle';
  display: Scalars['String']['output'];
  gap: Scalars['String']['output'];
  gridTemplateColumns: Scalars['String']['output'];
  gridTemplateRows: Scalars['String']['output'];
  padding?: Maybe<Scalars['String']['output']>;
};

export type CssGridItem = {
  __typename?: 'CSSGridItem';
  id: Scalars['ID']['output'];
  style: CssGridItemStyle;
};

export type CssGridItemStyle = {
  __typename?: 'CSSGridItemStyle';
  gridColumn: Scalars['String']['output'];
  gridRow: Scalars['String']['output'];
  maxHeight?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  minHeight?: Maybe<Scalars['String']['output']>;
  minWidth?: Maybe<Scalars['String']['output']>;
};

export type CssGridLayout = {
  __typename?: 'CSSGridLayout';
  container: CssGridContainerStyle;
  items: Array<CssGridItem>;
};

export type CreateLayoutInput = {
  config: LayoutConfigInput;
  description?: InputMaybe<Scalars['String']['input']>;
  items: Array<LayoutItemInput>;
  name: Scalars['String']['input'];
};

export type DeleteLayoutResult = {
  __typename?: 'DeleteLayoutResult';
  id: Scalars['ID']['output'];
  success: Scalars['Boolean']['output'];
};

export type FlexboxContainerStyle = {
  __typename?: 'FlexboxContainerStyle';
  display: Scalars['String']['output'];
  flexDirection: Scalars['String']['output'];
  gap: Scalars['String']['output'];
  padding?: Maybe<Scalars['String']['output']>;
};

export type FlexboxItem = {
  __typename?: 'FlexboxItem';
  id: Scalars['ID']['output'];
  style: FlexboxItemStyle;
};

export type FlexboxItemStyle = {
  __typename?: 'FlexboxItemStyle';
  flex: Scalars['String']['output'];
  maxHeight?: Maybe<Scalars['String']['output']>;
  maxWidth?: Maybe<Scalars['String']['output']>;
  minHeight?: Maybe<Scalars['String']['output']>;
  minWidth?: Maybe<Scalars['String']['output']>;
};

export type FlexboxLayout = {
  __typename?: 'FlexboxLayout';
  container: FlexboxContainerStyle;
  rows: Array<FlexboxRow>;
};

export type FlexboxRow = {
  __typename?: 'FlexboxRow';
  items: Array<FlexboxItem>;
  style: FlexboxRowStyle;
};

export type FlexboxRowStyle = {
  __typename?: 'FlexboxRowStyle';
  display: Scalars['String']['output'];
  gap: Scalars['String']['output'];
  minHeight: Scalars['String']['output'];
};

export type GapConfig = {
  __typename?: 'GapConfig';
  column: Scalars['Int']['output'];
  row: Scalars['Int']['output'];
};

export type GapConfigInput = {
  column: Scalars['Int']['input'];
  row: Scalars['Int']['input'];
};

export type LayoutConfig = {
  __typename?: 'LayoutConfig';
  cols: Scalars['Int']['output'];
  gap: GapConfig;
  padding?: Maybe<PaddingConfig>;
  rowHeight: Scalars['Int']['output'];
};

export type LayoutConfigInput = {
  cols: Scalars['Int']['input'];
  gap: GapConfigInput;
  padding?: InputMaybe<PaddingConfigInput>;
  rowHeight: Scalars['Int']['input'];
};

export type LayoutConnection = {
  __typename?: 'LayoutConnection';
  edges: Array<LayoutEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LayoutEdge = {
  __typename?: 'LayoutEdge';
  cursor: Scalars['String']['output'];
  node: SavedLayout;
};

export type LayoutItem = {
  __typename?: 'LayoutItem';
  h: Scalars['Int']['output'];
  i: Scalars['ID']['output'];
  maxH?: Maybe<Scalars['Int']['output']>;
  maxW?: Maybe<Scalars['Int']['output']>;
  minH?: Maybe<Scalars['Int']['output']>;
  minW?: Maybe<Scalars['Int']['output']>;
  static?: Maybe<Scalars['Boolean']['output']>;
  w: Scalars['Int']['output'];
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
};

export type LayoutItemInput = {
  h: Scalars['Int']['input'];
  i: Scalars['ID']['input'];
  maxH?: InputMaybe<Scalars['Int']['input']>;
  maxW?: InputMaybe<Scalars['Int']['input']>;
  minH?: InputMaybe<Scalars['Int']['input']>;
  minW?: InputMaybe<Scalars['Int']['input']>;
  static?: InputMaybe<Scalars['Boolean']['input']>;
  w: Scalars['Int']['input'];
  x: Scalars['Int']['input'];
  y: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new layout (requires authentication) */
  createLayout: SavedLayout;
  /** Delete a layout */
  deleteLayout: DeleteLayoutResult;
  /** Login and get JWT token */
  login: AuthPayload;
  /** Update an existing layout */
  updateLayout?: Maybe<SavedLayout>;
};


export type MutationCreateLayoutArgs = {
  input: CreateLayoutInput;
};


export type MutationDeleteLayoutArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateLayoutArgs = {
  id: Scalars['ID']['input'];
  input: UpdateLayoutInput;
};

export type PaddingConfig = {
  __typename?: 'PaddingConfig';
  bottom: Scalars['Int']['output'];
  left: Scalars['Int']['output'];
  right: Scalars['Int']['output'];
  top: Scalars['Int']['output'];
};

export type PaddingConfigInput = {
  bottom: Scalars['Int']['input'];
  left: Scalars['Int']['input'];
  right: Scalars['Int']['input'];
  top: Scalars['Int']['input'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Get a specific layout by ID */
  layout?: Maybe<SavedLayout>;
  /** Convert a layout to CSS Grid format */
  layoutToCSSGrid?: Maybe<CssGridLayout>;
  /** Convert a layout to Flexbox format */
  layoutToFlexbox?: Maybe<FlexboxLayout>;
  /** Convert a layout to Yoga format */
  layoutToYoga?: Maybe<YogaLayout>;
  /** Get paginated layouts */
  layouts: LayoutConnection;
  /** Get current authenticated user */
  me?: Maybe<User>;
};


export type QueryLayoutArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLayoutToCssGridArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLayoutToFlexboxArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLayoutToYogaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLayoutsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type SavedLayout = {
  __typename?: 'SavedLayout';
  config: LayoutConfig;
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items: Array<LayoutItem>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UpdateLayoutInput = {
  config?: InputMaybe<LayoutConfigInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<LayoutItemInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type YogaLayout = {
  __typename?: 'YogaLayout';
  root: YogaNode;
};

export type YogaNode = {
  __typename?: 'YogaNode';
  children?: Maybe<Array<YogaNode>>;
  flexBasis?: Maybe<Scalars['YogaDimension']['output']>;
  flexDirection: Scalars['String']['output'];
  flexGrow?: Maybe<Scalars['Int']['output']>;
  flexShrink?: Maybe<Scalars['Int']['output']>;
  gap?: Maybe<Scalars['Int']['output']>;
  height?: Maybe<Scalars['YogaDimension']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  maxHeight?: Maybe<Scalars['Int']['output']>;
  maxWidth?: Maybe<Scalars['Int']['output']>;
  minHeight?: Maybe<Scalars['Int']['output']>;
  minWidth?: Maybe<Scalars['Int']['output']>;
  padding?: Maybe<PaddingConfig>;
  width?: Maybe<Scalars['YogaDimension']['output']>;
};

export type CreateLayoutMutationVariables = Exact<{
  input: CreateLayoutInput;
}>;


export type CreateLayoutMutation = { __typename?: 'Mutation', createLayout: { __typename?: 'SavedLayout', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string, config: { __typename?: 'LayoutConfig', cols: number, rowHeight: number, gap: { __typename?: 'GapConfig', row: number, column: number } }, items: Array<{ __typename?: 'LayoutItem', i: string, x: number, y: number, w: number, h: number }> } };

export type DeleteLayoutMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteLayoutMutation = { __typename?: 'Mutation', deleteLayout: { __typename?: 'DeleteLayoutResult', success: boolean, id: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, email: string, name: string } } };

export type LayoutToCssGridQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LayoutToCssGridQuery = { __typename?: 'Query', layoutToCSSGrid?: { __typename?: 'CSSGridLayout', container: { __typename?: 'CSSGridContainerStyle', display: string, gridTemplateRows: string, gridTemplateColumns: string, gap: string, padding?: string | null }, items: Array<{ __typename?: 'CSSGridItem', id: string, style: { __typename?: 'CSSGridItemStyle', gridRow: string, gridColumn: string, minWidth?: string | null, maxWidth?: string | null, minHeight?: string | null, maxHeight?: string | null } }> } | null };

export type LayoutToFlexboxQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LayoutToFlexboxQuery = { __typename?: 'Query', layoutToFlexbox?: { __typename?: 'FlexboxLayout', container: { __typename?: 'FlexboxContainerStyle', display: string, flexDirection: string, gap: string, padding?: string | null }, rows: Array<{ __typename?: 'FlexboxRow', style: { __typename?: 'FlexboxRowStyle', display: string, gap: string, minHeight: string }, items: Array<{ __typename?: 'FlexboxItem', id: string, style: { __typename?: 'FlexboxItemStyle', flex: string, minWidth?: string | null, maxWidth?: string | null, minHeight?: string | null, maxHeight?: string | null } }> }> } | null };

export type LayoutQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LayoutQuery = { __typename?: 'Query', layout?: { __typename?: 'SavedLayout', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string, config: { __typename?: 'LayoutConfig', cols: number, rowHeight: number, gap: { __typename?: 'GapConfig', row: number, column: number }, padding?: { __typename?: 'PaddingConfig', top: number, right: number, bottom: number, left: number } | null }, items: Array<{ __typename?: 'LayoutItem', i: string, x: number, y: number, w: number, h: number, minW?: number | null, maxW?: number | null, minH?: number | null, maxH?: number | null, static?: boolean | null }> } | null };

export type LayoutsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type LayoutsQuery = { __typename?: 'Query', layouts: { __typename?: 'LayoutConnection', totalCount: number, edges: Array<{ __typename?: 'LayoutEdge', cursor: string, node: { __typename?: 'SavedLayout', id: string, name: string, description?: string | null, createdAt: string, updatedAt: string, config: { __typename?: 'LayoutConfig', cols: number, rowHeight: number, gap: { __typename?: 'GapConfig', row: number, column: number } }, items: Array<{ __typename?: 'LayoutItem', i: string, x: number, y: number, w: number, h: number }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, name: string } | null };


export const CreateLayoutDocument = gql`
    mutation CreateLayout($input: CreateLayoutInput!) {
  createLayout(input: $input) {
    id
    name
    description
    createdAt
    updatedAt
    config {
      cols
      rowHeight
      gap {
        row
        column
      }
    }
    items {
      i
      x
      y
      w
      h
    }
  }
}
    `;
export type CreateLayoutMutationFn = Apollo.MutationFunction<CreateLayoutMutation, CreateLayoutMutationVariables>;

/**
 * __useCreateLayoutMutation__
 *
 * To run a mutation, you first call `useCreateLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLayoutMutation, { data, loading, error }] = useCreateLayoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLayoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateLayoutMutation, CreateLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLayoutMutation, CreateLayoutMutationVariables>(CreateLayoutDocument, options);
      }
export type CreateLayoutMutationHookResult = ReturnType<typeof useCreateLayoutMutation>;
export type CreateLayoutMutationResult = Apollo.MutationResult<CreateLayoutMutation>;
export type CreateLayoutMutationOptions = Apollo.BaseMutationOptions<CreateLayoutMutation, CreateLayoutMutationVariables>;
export const DeleteLayoutDocument = gql`
    mutation DeleteLayout($id: ID!) {
  deleteLayout(id: $id) {
    success
    id
  }
}
    `;
export type DeleteLayoutMutationFn = Apollo.MutationFunction<DeleteLayoutMutation, DeleteLayoutMutationVariables>;

/**
 * __useDeleteLayoutMutation__
 *
 * To run a mutation, you first call `useDeleteLayoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLayoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLayoutMutation, { data, loading, error }] = useDeleteLayoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLayoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLayoutMutation, DeleteLayoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLayoutMutation, DeleteLayoutMutationVariables>(DeleteLayoutDocument, options);
      }
export type DeleteLayoutMutationHookResult = ReturnType<typeof useDeleteLayoutMutation>;
export type DeleteLayoutMutationResult = Apollo.MutationResult<DeleteLayoutMutation>;
export type DeleteLayoutMutationOptions = Apollo.BaseMutationOptions<DeleteLayoutMutation, DeleteLayoutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      name
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LayoutToCssGridDocument = gql`
    query LayoutToCSSGrid($id: ID!) {
  layoutToCSSGrid(id: $id) {
    container {
      display
      gridTemplateRows
      gridTemplateColumns
      gap
      padding
    }
    items {
      id
      style {
        gridRow
        gridColumn
        minWidth
        maxWidth
        minHeight
        maxHeight
      }
    }
  }
}
    `;

/**
 * __useLayoutToCssGridQuery__
 *
 * To run a query within a React component, call `useLayoutToCssGridQuery` and pass it any options that fit your needs.
 * When your component renders, `useLayoutToCssGridQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLayoutToCssGridQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLayoutToCssGridQuery(baseOptions: Apollo.QueryHookOptions<LayoutToCssGridQuery, LayoutToCssGridQueryVariables> & ({ variables: LayoutToCssGridQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>(LayoutToCssGridDocument, options);
      }
export function useLayoutToCssGridLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>(LayoutToCssGridDocument, options);
        }
// @ts-ignore
export function useLayoutToCssGridSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>): Apollo.UseSuspenseQueryResult<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>;
export function useLayoutToCssGridSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>): Apollo.UseSuspenseQueryResult<LayoutToCssGridQuery | undefined, LayoutToCssGridQueryVariables>;
export function useLayoutToCssGridSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>(LayoutToCssGridDocument, options);
        }
export type LayoutToCssGridQueryHookResult = ReturnType<typeof useLayoutToCssGridQuery>;
export type LayoutToCssGridLazyQueryHookResult = ReturnType<typeof useLayoutToCssGridLazyQuery>;
export type LayoutToCssGridSuspenseQueryHookResult = ReturnType<typeof useLayoutToCssGridSuspenseQuery>;
export type LayoutToCssGridQueryResult = Apollo.QueryResult<LayoutToCssGridQuery, LayoutToCssGridQueryVariables>;
export const LayoutToFlexboxDocument = gql`
    query LayoutToFlexbox($id: ID!) {
  layoutToFlexbox(id: $id) {
    container {
      display
      flexDirection
      gap
      padding
    }
    rows {
      style {
        display
        gap
        minHeight
      }
      items {
        id
        style {
          flex
          minWidth
          maxWidth
          minHeight
          maxHeight
        }
      }
    }
  }
}
    `;

/**
 * __useLayoutToFlexboxQuery__
 *
 * To run a query within a React component, call `useLayoutToFlexboxQuery` and pass it any options that fit your needs.
 * When your component renders, `useLayoutToFlexboxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLayoutToFlexboxQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLayoutToFlexboxQuery(baseOptions: Apollo.QueryHookOptions<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables> & ({ variables: LayoutToFlexboxQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>(LayoutToFlexboxDocument, options);
      }
export function useLayoutToFlexboxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>(LayoutToFlexboxDocument, options);
        }
// @ts-ignore
export function useLayoutToFlexboxSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>): Apollo.UseSuspenseQueryResult<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>;
export function useLayoutToFlexboxSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>): Apollo.UseSuspenseQueryResult<LayoutToFlexboxQuery | undefined, LayoutToFlexboxQueryVariables>;
export function useLayoutToFlexboxSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>(LayoutToFlexboxDocument, options);
        }
export type LayoutToFlexboxQueryHookResult = ReturnType<typeof useLayoutToFlexboxQuery>;
export type LayoutToFlexboxLazyQueryHookResult = ReturnType<typeof useLayoutToFlexboxLazyQuery>;
export type LayoutToFlexboxSuspenseQueryHookResult = ReturnType<typeof useLayoutToFlexboxSuspenseQuery>;
export type LayoutToFlexboxQueryResult = Apollo.QueryResult<LayoutToFlexboxQuery, LayoutToFlexboxQueryVariables>;
export const LayoutDocument = gql`
    query Layout($id: ID!) {
  layout(id: $id) {
    id
    name
    description
    createdAt
    updatedAt
    config {
      cols
      rowHeight
      gap {
        row
        column
      }
      padding {
        top
        right
        bottom
        left
      }
    }
    items {
      i
      x
      y
      w
      h
      minW
      maxW
      minH
      maxH
      static
    }
  }
}
    `;

/**
 * __useLayoutQuery__
 *
 * To run a query within a React component, call `useLayoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLayoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLayoutQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLayoutQuery(baseOptions: Apollo.QueryHookOptions<LayoutQuery, LayoutQueryVariables> & ({ variables: LayoutQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LayoutQuery, LayoutQueryVariables>(LayoutDocument, options);
      }
export function useLayoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayoutQuery, LayoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LayoutQuery, LayoutQueryVariables>(LayoutDocument, options);
        }
// @ts-ignore
export function useLayoutSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LayoutQuery, LayoutQueryVariables>): Apollo.UseSuspenseQueryResult<LayoutQuery, LayoutQueryVariables>;
export function useLayoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayoutQuery, LayoutQueryVariables>): Apollo.UseSuspenseQueryResult<LayoutQuery | undefined, LayoutQueryVariables>;
export function useLayoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayoutQuery, LayoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LayoutQuery, LayoutQueryVariables>(LayoutDocument, options);
        }
export type LayoutQueryHookResult = ReturnType<typeof useLayoutQuery>;
export type LayoutLazyQueryHookResult = ReturnType<typeof useLayoutLazyQuery>;
export type LayoutSuspenseQueryHookResult = ReturnType<typeof useLayoutSuspenseQuery>;
export type LayoutQueryResult = Apollo.QueryResult<LayoutQuery, LayoutQueryVariables>;
export const LayoutsDocument = gql`
    query Layouts($first: Int, $after: String) {
  layouts(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        name
        description
        createdAt
        updatedAt
        config {
          cols
          rowHeight
          gap {
            row
            column
          }
        }
        items {
          i
          x
          y
          w
          h
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    totalCount
  }
}
    `;

/**
 * __useLayoutsQuery__
 *
 * To run a query within a React component, call `useLayoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLayoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLayoutsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useLayoutsQuery(baseOptions?: Apollo.QueryHookOptions<LayoutsQuery, LayoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LayoutsQuery, LayoutsQueryVariables>(LayoutsDocument, options);
      }
export function useLayoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LayoutsQuery, LayoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LayoutsQuery, LayoutsQueryVariables>(LayoutsDocument, options);
        }
// @ts-ignore
export function useLayoutsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<LayoutsQuery, LayoutsQueryVariables>): Apollo.UseSuspenseQueryResult<LayoutsQuery, LayoutsQueryVariables>;
export function useLayoutsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayoutsQuery, LayoutsQueryVariables>): Apollo.UseSuspenseQueryResult<LayoutsQuery | undefined, LayoutsQueryVariables>;
export function useLayoutsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LayoutsQuery, LayoutsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LayoutsQuery, LayoutsQueryVariables>(LayoutsDocument, options);
        }
export type LayoutsQueryHookResult = ReturnType<typeof useLayoutsQuery>;
export type LayoutsLazyQueryHookResult = ReturnType<typeof useLayoutsLazyQuery>;
export type LayoutsSuspenseQueryHookResult = ReturnType<typeof useLayoutsSuspenseQuery>;
export type LayoutsQueryResult = Apollo.QueryResult<LayoutsQuery, LayoutsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;