import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TribeClient } from '@tribeplatform/gql-client';
import { PaginatedPostType, PaginatedSpace, Post, PostMappingTypeEnum } from '@tribeplatform/gql-client/types';

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
}
