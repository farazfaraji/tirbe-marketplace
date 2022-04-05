import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TribeClient } from '@tribeplatform/gql-client';
import { Member, PaginatedPostType, PaginatedSpace, Post, PostMappingTypeEnum } from '@tribeplatform/gql-client/types';
import { MappingField } from '../seller/schemas/offer.schema';


@Injectable()
export class TribeCoreService {
  public client: TribeClient;

  constructor(protected readonly configService: ConfigService) {
    this.client = new TribeClient({
      graphqlUrl: configService.get('tribe.graphqlUrl'),
      accessToken: configService.get('tribe.accessToken'),
    });

    //this.generateToken();
  }

  async generateToken() {
    const client = new TribeClient({
      clientId: this.configService.get('tribe.clientId'),
      clientSecret: this.configService.get('tribe.clientSecret'),
      graphqlUrl: this.configService.get('tribe.graphqlUrl'),
    });

    client.generateToken({
      networkId: this.configService.get('tribe.networkId'),
      memberId: this.configService.get('tribe.memberId'),
    }).then(async (accessToken) => {
      console.log(accessToken)
    });
  }

  async getSpaces(limit: number): Promise<PaginatedSpace> {
    return await this.client.spaces.list({ limit }, { postsCount: 'basic' })
  }

  async listPostTypes(limit): Promise<PaginatedPostType> {
    return this.client.posts.listPostTypes({ limit })
  }

  async getMemberById(id: string): Promise<Member> {
    return await this.client.members.get(id)
  }

  async createPost(title: string, content: string): Promise<Post> {
    return await this.client.posts.create({
      spaceId: this.configService.get('tribe.spaces.parking'),
      input: {
        postTypeId: this.configService.get('tribe.inputs.post'),
        mappingFields: [
          {
            key: 'title',
            type: PostMappingTypeEnum.TEXT,
            value: `"${title}"`
          },
          {
            key: 'content',
            type: PostMappingTypeEnum.HTML,
            value: `"${content}"`
          }
        ],
        publish: true,
      }
    })
  }

  async updatePostContent(postId: string, mappingField: MappingField[]) {
    return await this.client.posts.update({
      id: postId,
      input: {
        mappingFields: [
          {
            key: mappingField[0].key,
            type: PostMappingTypeEnum.TEXT,
            value: mappingField[0].value,
          },
          {
            key: mappingField[1].key,
            type: PostMappingTypeEnum.HTML,
            value: mappingField[1].value,
          },
          {
            key: mappingField[2].key,
            type: PostMappingTypeEnum.IMAGE,
            value: mappingField[2].value,
          }
        ]
      }
    })
  }
}
