export class PostDto {
  networkId?: string;
  context?: string;
  entityId?: string;
  type?: string;
  data?: Data;
  currentSettings?: any[];
}

export class MappingFields {
  key?: string;
  value?: string;
  type?: string;
}

class Data {
  challenge?: string
  time?: Date;
  verb?: string;
  verbAction?: string;
  actor?: Actor;
  object?: Obj;
  target?: Target;
  id?: string;
  name?: string;
  noun?: string;
  shortDescription?: string;
  secretInfo?: null;
}

class Actor {
  id?: string;
  roleId?: string;
  roleType?: string;
  sessionInfo?: string[];
  spaceRoleId?: string;
  spaceRoleType?: string;
}

class Obj {
  id?: string;
  networkId?: string;
  templateId?: null;
  spaceId?: string;
  postTypeId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  status?: string;
  createdById?: string;
  ownerId?: string;
  isAnonymous?: boolean;
  mentionedMembers?: any[];
  embedIds?: any[];
  imageIds?: any[];
  pinnedInto?: any[];
  repliedToId?: null;
  repliedToIds?: any[];
  repliesCount?: number;
  totalRepliesCount?: number;
  seoDetail?: string[];
  topRepliers?: any[];
  title?: string;
  slug?: string;
  key?: string;
  shortContent?: string;
  language?: string;
  hasMoreContent?: boolean;
  isReply?: boolean;
  mappingFields?: MappingFields[];
  primaryReactionType?: string;
  positiveReactionsCount?: number;
  negativeReactionsCount?: number;
  reactionsCount?: number;
  singleChoiceReactions?: any[];
  isHidden?: boolean;
  positiveReactions?: null;
  negativeReactions?: null;
  allowedEmojis?: null;
  forbiddenEmojis?: null;
  attachmentIds?: any[];
  searchFields?: string[];
}


class Target {
  organizationId?: string;
  networkId?: string;
  collectionId?: string;
  postTypeId?: string;
  spaceId?: string;
  memberId?: string;
}


