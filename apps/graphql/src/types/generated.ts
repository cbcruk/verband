import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { StoredLayout } from '../data-sources/layout-store';
import { Context } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CSSGridContainerStyle: ResolverTypeWrapper<CssGridContainerStyle>;
  CSSGridItem: ResolverTypeWrapper<CssGridItem>;
  CSSGridItemStyle: ResolverTypeWrapper<CssGridItemStyle>;
  CSSGridLayout: ResolverTypeWrapper<CssGridLayout>;
  CreateLayoutInput: CreateLayoutInput;
  DeleteLayoutResult: ResolverTypeWrapper<DeleteLayoutResult>;
  FlexboxContainerStyle: ResolverTypeWrapper<FlexboxContainerStyle>;
  FlexboxItem: ResolverTypeWrapper<FlexboxItem>;
  FlexboxItemStyle: ResolverTypeWrapper<FlexboxItemStyle>;
  FlexboxLayout: ResolverTypeWrapper<FlexboxLayout>;
  FlexboxRow: ResolverTypeWrapper<FlexboxRow>;
  FlexboxRowStyle: ResolverTypeWrapper<FlexboxRowStyle>;
  GapConfig: ResolverTypeWrapper<GapConfig>;
  GapConfigInput: GapConfigInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LayoutConfig: ResolverTypeWrapper<LayoutConfig>;
  LayoutConfigInput: LayoutConfigInput;
  LayoutConnection: ResolverTypeWrapper<Omit<LayoutConnection, 'edges'> & { edges: Array<ResolversTypes['LayoutEdge']> }>;
  LayoutEdge: ResolverTypeWrapper<Omit<LayoutEdge, 'node'> & { node: ResolversTypes['SavedLayout'] }>;
  LayoutItem: ResolverTypeWrapper<LayoutItem>;
  LayoutItemInput: LayoutItemInput;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  PaddingConfig: ResolverTypeWrapper<PaddingConfig>;
  PaddingConfigInput: PaddingConfigInput;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  SavedLayout: ResolverTypeWrapper<StoredLayout>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateLayoutInput: UpdateLayoutInput;
  User: ResolverTypeWrapper<User>;
  YogaDimension: ResolverTypeWrapper<Scalars['YogaDimension']['output']>;
  YogaLayout: ResolverTypeWrapper<YogaLayout>;
  YogaNode: ResolverTypeWrapper<YogaNode>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  CSSGridContainerStyle: CssGridContainerStyle;
  CSSGridItem: CssGridItem;
  CSSGridItemStyle: CssGridItemStyle;
  CSSGridLayout: CssGridLayout;
  CreateLayoutInput: CreateLayoutInput;
  DeleteLayoutResult: DeleteLayoutResult;
  FlexboxContainerStyle: FlexboxContainerStyle;
  FlexboxItem: FlexboxItem;
  FlexboxItemStyle: FlexboxItemStyle;
  FlexboxLayout: FlexboxLayout;
  FlexboxRow: FlexboxRow;
  FlexboxRowStyle: FlexboxRowStyle;
  GapConfig: GapConfig;
  GapConfigInput: GapConfigInput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LayoutConfig: LayoutConfig;
  LayoutConfigInput: LayoutConfigInput;
  LayoutConnection: Omit<LayoutConnection, 'edges'> & { edges: Array<ResolversParentTypes['LayoutEdge']> };
  LayoutEdge: Omit<LayoutEdge, 'node'> & { node: ResolversParentTypes['SavedLayout'] };
  LayoutItem: LayoutItem;
  LayoutItemInput: LayoutItemInput;
  Mutation: Record<PropertyKey, never>;
  PaddingConfig: PaddingConfig;
  PaddingConfigInput: PaddingConfigInput;
  PageInfo: PageInfo;
  Query: Record<PropertyKey, never>;
  SavedLayout: StoredLayout;
  String: Scalars['String']['output'];
  UpdateLayoutInput: UpdateLayoutInput;
  User: User;
  YogaDimension: Scalars['YogaDimension']['output'];
  YogaLayout: YogaLayout;
  YogaNode: YogaNode;
}>;

export type AuthPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type CssGridContainerStyleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CSSGridContainerStyle'] = ResolversParentTypes['CSSGridContainerStyle']> = ResolversObject<{
  display?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gap?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gridTemplateColumns?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gridTemplateRows?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  padding?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CssGridItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CSSGridItem'] = ResolversParentTypes['CSSGridItem']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['CSSGridItemStyle'], ParentType, ContextType>;
}>;

export type CssGridItemStyleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CSSGridItemStyle'] = ResolversParentTypes['CSSGridItemStyle']> = ResolversObject<{
  gridColumn?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gridRow?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxHeight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxWidth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minHeight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minWidth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type CssGridLayoutResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CSSGridLayout'] = ResolversParentTypes['CSSGridLayout']> = ResolversObject<{
  container?: Resolver<ResolversTypes['CSSGridContainerStyle'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['CSSGridItem']>, ParentType, ContextType>;
}>;

export type DeleteLayoutResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteLayoutResult'] = ResolversParentTypes['DeleteLayoutResult']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type FlexboxContainerStyleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FlexboxContainerStyle'] = ResolversParentTypes['FlexboxContainerStyle']> = ResolversObject<{
  display?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flexDirection?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gap?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  padding?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type FlexboxItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FlexboxItem'] = ResolversParentTypes['FlexboxItem']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['FlexboxItemStyle'], ParentType, ContextType>;
}>;

export type FlexboxItemStyleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FlexboxItemStyle'] = ResolversParentTypes['FlexboxItemStyle']> = ResolversObject<{
  flex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxHeight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxWidth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minHeight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  minWidth?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type FlexboxLayoutResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FlexboxLayout'] = ResolversParentTypes['FlexboxLayout']> = ResolversObject<{
  container?: Resolver<ResolversTypes['FlexboxContainerStyle'], ParentType, ContextType>;
  rows?: Resolver<Array<ResolversTypes['FlexboxRow']>, ParentType, ContextType>;
}>;

export type FlexboxRowResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FlexboxRow'] = ResolversParentTypes['FlexboxRow']> = ResolversObject<{
  items?: Resolver<Array<ResolversTypes['FlexboxItem']>, ParentType, ContextType>;
  style?: Resolver<ResolversTypes['FlexboxRowStyle'], ParentType, ContextType>;
}>;

export type FlexboxRowStyleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FlexboxRowStyle'] = ResolversParentTypes['FlexboxRowStyle']> = ResolversObject<{
  display?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gap?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  minHeight?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type GapConfigResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GapConfig'] = ResolversParentTypes['GapConfig']> = ResolversObject<{
  column?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  row?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type LayoutConfigResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LayoutConfig'] = ResolversParentTypes['LayoutConfig']> = ResolversObject<{
  cols?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gap?: Resolver<ResolversTypes['GapConfig'], ParentType, ContextType>;
  padding?: Resolver<Maybe<ResolversTypes['PaddingConfig']>, ParentType, ContextType>;
  rowHeight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type LayoutConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LayoutConnection'] = ResolversParentTypes['LayoutConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['LayoutEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type LayoutEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LayoutEdge'] = ResolversParentTypes['LayoutEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['SavedLayout'], ParentType, ContextType>;
}>;

export type LayoutItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LayoutItem'] = ResolversParentTypes['LayoutItem']> = ResolversObject<{
  h?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  i?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  maxH?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxW?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minH?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minW?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  static?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  w?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  x?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  y?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createLayout?: Resolver<ResolversTypes['SavedLayout'], ParentType, ContextType, RequireFields<MutationCreateLayoutArgs, 'input'>>;
  deleteLayout?: Resolver<ResolversTypes['DeleteLayoutResult'], ParentType, ContextType, RequireFields<MutationDeleteLayoutArgs, 'id'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  updateLayout?: Resolver<Maybe<ResolversTypes['SavedLayout']>, ParentType, ContextType, RequireFields<MutationUpdateLayoutArgs, 'id' | 'input'>>;
}>;

export type PaddingConfigResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaddingConfig'] = ResolversParentTypes['PaddingConfig']> = ResolversObject<{
  bottom?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  left?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  right?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  top?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  layout?: Resolver<Maybe<ResolversTypes['SavedLayout']>, ParentType, ContextType, RequireFields<QueryLayoutArgs, 'id'>>;
  layoutToCSSGrid?: Resolver<Maybe<ResolversTypes['CSSGridLayout']>, ParentType, ContextType, RequireFields<QueryLayoutToCssGridArgs, 'id'>>;
  layoutToFlexbox?: Resolver<Maybe<ResolversTypes['FlexboxLayout']>, ParentType, ContextType, RequireFields<QueryLayoutToFlexboxArgs, 'id'>>;
  layoutToYoga?: Resolver<Maybe<ResolversTypes['YogaLayout']>, ParentType, ContextType, RequireFields<QueryLayoutToYogaArgs, 'id'>>;
  layouts?: Resolver<ResolversTypes['LayoutConnection'], ParentType, ContextType, Partial<QueryLayoutsArgs>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type SavedLayoutResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SavedLayout'] = ResolversParentTypes['SavedLayout']> = ResolversObject<{
  config?: Resolver<ResolversTypes['LayoutConfig'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['LayoutItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export interface YogaDimensionScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['YogaDimension'], any> {
  name: 'YogaDimension';
}

export type YogaLayoutResolvers<ContextType = Context, ParentType extends ResolversParentTypes['YogaLayout'] = ResolversParentTypes['YogaLayout']> = ResolversObject<{
  root?: Resolver<ResolversTypes['YogaNode'], ParentType, ContextType>;
}>;

export type YogaNodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['YogaNode'] = ResolversParentTypes['YogaNode']> = ResolversObject<{
  children?: Resolver<Maybe<Array<ResolversTypes['YogaNode']>>, ParentType, ContextType>;
  flexBasis?: Resolver<Maybe<ResolversTypes['YogaDimension']>, ParentType, ContextType>;
  flexDirection?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flexGrow?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  flexShrink?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  gap?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['YogaDimension']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  maxHeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  maxWidth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minHeight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minWidth?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  padding?: Resolver<Maybe<ResolversTypes['PaddingConfig']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['YogaDimension']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  CSSGridContainerStyle?: CssGridContainerStyleResolvers<ContextType>;
  CSSGridItem?: CssGridItemResolvers<ContextType>;
  CSSGridItemStyle?: CssGridItemStyleResolvers<ContextType>;
  CSSGridLayout?: CssGridLayoutResolvers<ContextType>;
  DeleteLayoutResult?: DeleteLayoutResultResolvers<ContextType>;
  FlexboxContainerStyle?: FlexboxContainerStyleResolvers<ContextType>;
  FlexboxItem?: FlexboxItemResolvers<ContextType>;
  FlexboxItemStyle?: FlexboxItemStyleResolvers<ContextType>;
  FlexboxLayout?: FlexboxLayoutResolvers<ContextType>;
  FlexboxRow?: FlexboxRowResolvers<ContextType>;
  FlexboxRowStyle?: FlexboxRowStyleResolvers<ContextType>;
  GapConfig?: GapConfigResolvers<ContextType>;
  LayoutConfig?: LayoutConfigResolvers<ContextType>;
  LayoutConnection?: LayoutConnectionResolvers<ContextType>;
  LayoutEdge?: LayoutEdgeResolvers<ContextType>;
  LayoutItem?: LayoutItemResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaddingConfig?: PaddingConfigResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SavedLayout?: SavedLayoutResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  YogaDimension?: GraphQLScalarType;
  YogaLayout?: YogaLayoutResolvers<ContextType>;
  YogaNode?: YogaNodeResolvers<ContextType>;
}>;

