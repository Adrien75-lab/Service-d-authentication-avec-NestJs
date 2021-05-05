import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name:Post.name, schema: PostSchema
    }]),
    PassportModule.register({
      defaultStrategy:'jwt',
      session: false
    })
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
