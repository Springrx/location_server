import { Context, inject, controller, get, provide, post, } from "midway";
import { ILabService } from "../../interface";
import BaseController from "../common/BaseController";
const path = require('path');
// const fs = require('fs');

@provide()
@controller("/api")
export class HomeController extends BaseController {
  @inject()
  ctx: Context;

  @inject("labService")
  service: ILabService;
  HOME = process.env.HOME;
  @get("/:name")
  // { middleware: ['loginAuthMiddleware'] }
  async getFunc() {
    const { ctx, service } = this;
    let name = ctx.params.name;
    console.log(name)
    //let title = 'BZ302';
    switch (name) {
      case "post":
        let getPostInfo = ctx.request.query;
        console.log(getPostInfo,'post kc');
        let data = await service.getPost(getPostInfo);
        ctx.response.body = {
          code: "1000",
          data: data,
        };
        break;
      case"postOfUser":
        const {user_id}=ctx.request.query;
        let post=await service.getPostOfUser(user_id);
        ctx.response.body={
          code:'1000',
          data:post,
        }
        break;
      case "postImage":
        const { post_id } = ctx.request.query;
        let res = await service.getPostImage(post_id);
        ctx.response.body = {
          code: "1000",
          data: res,
        };
        break;
      case "comment":
        const {postId} = ctx.request.query;
        let comment = await service.getComment(postId);
        if(comment.length!==0){
          comment = await Promise.all( comment.map(async (item)=>{
          const user=await service.getUserInfo(item.user_id);
          item.dataValues.username=user.username;
          item.dataValues.avatar_url=user.avatar_url;
        return item;}
          ))
      }
        ctx.response.body = {
          code: "1000",
          data: comment,
        };
        break;
    }
  }
  @post("/:name",{ middleware: ['loginAuthMiddleware'] })
  async postFunc() {
    const { ctx, service } = this;
    let name = ctx.params.name;
    console.log(name)
    switch (name) {
      case "post":
        const res = await service.addPost(ctx.request.body);
        if (typeof (res) === "number") {
          ctx.response.body = {
            code: "1000",
            data: res,
          };
        }
        else this.failed('创建失败');
        break;
      case "comment":
        let { postId, userId, commentText, commentMediaUrl,mediaType } = ctx.request.body;
        const comment = { post_id: postId, user_id: userId, text: commentText, media_url: commentMediaUrl === '' ? '' : path.join(this.HOME, `location-files`, commentMediaUrl), media_type: mediaType }
        const commentSuc = await service.addComment(comment);
        this.success(commentSuc);
        break;
      case "postImage":
        let postPhoto = ctx.request.body;
        const ret = await service.addPostPhoto(postPhoto);
        ctx.response.body = {
          code: "1000",
          data: ret.post_id,
        };
        break;
      case "updateWorkOrder":
        await service.updateWorkOrder(ctx.request.body);
        ctx.response.body = {
          code: "1000",
          data: "success",
        };
        break;
      case "delWorkOrder":
        let list_queryParameter = ctx.request.body;
        const { id } = list_queryParameter;
        await service.delWorkOrder(id);
        ctx.response.body = {
          code: "1000",
          data: "success",
        };
        break;
    }
  }
}
