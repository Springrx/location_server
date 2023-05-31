import { Context, inject, controller, get, provide, post } from "midway";
import { ILabService } from "../../interface";
import BaseController from "../common/BaseController";
// const path = require('path');
// const fs = require('fs');

@provide()
@controller("/api")
export class HomeController extends BaseController{
  @inject()
  ctx: Context;

  @inject("labService")
  service: ILabService;
  HOME = process.env.HOME;
  @get("/:name")
  async getFunc() {
    const { ctx,service } = this;
    let name = ctx.params.name;
    console.log(name)
    //let title = 'BZ302';
    switch (name) {
      case "post":
        let position=ctx.request.query;
          let data = await service.getPost(position);
            ctx.response.body = {
              code: "1000",
              data: data,
            };
        break;
        case "getWorkOrderPhoto":
          let list_queryParameters = ctx.request.query;
          const { workorder_id } = list_queryParameters;
            let photo_data = await service.getWorkOrderPhoto(workorder_id);
              ctx.response.body = {
                code: "1000",
                data: photo_data,
              };
          break;
         case "getWorkOrderMessage":
          let list_queryPara = ctx.request.query;
          const { id } = list_queryPara;
            let message_data = await service.getWorkOrderMessage(id);
              ctx.response.body = {
                code: "1000",
                data: message_data,
              };
          break;          
    }
  }
  @post("/:name")
  async postFunc(){
    const { ctx,service } = this;
    let name = ctx.params.name;
    console.log(name)
    switch (name) {
      case "delWorkOrder":
        let list_queryParameter = ctx.request.body;
        const { id } = list_queryParameter;
          await service.delWorkOrder(id);
            ctx.response.body = {
              code: "1000",
              data: "success",
            };
        break;
      case "delSelectWorkOrderMessage":
        //let list_queryParame = ctx.request.body;
        console.log(ctx.request.body);
        const { workorder_id } = ctx.request.body;
        console.log(workorder_id);
          await service.delSelectWorkOrderMessage(workorder_id);
            ctx.response.body = {
              code: "1000",
              data: "success",
            };
        break;        
      case"addSelectWorkOrderMessage":
        console.log(ctx.request.body,"kctest")
        const {workOrderMessage} = ctx.request.body;
        await service.addSelectWorkOrderMessage(workOrderMessage);
        //   let data = await service.delWorkOrder(id);
              ctx.response.body = {
                code: "1000",
                data: "success",
              };
        break;
      case "post":
        const res=await service.addPost(ctx.request.body);
        if(typeof(res)==="number"){
          ctx.response.body = {
            code: "1000",
            data: res,
          };
        }
        else this.failed('创建失败');
        break;   
      case "postImage":
        const ret=await service.addPostPhoto(ctx.request.body);
        const post_id=ret.post_id;
        ctx.response.body = {
          code: "1000",
          data: post_id,
        };
        break;
      case "updateWorkOrder":
        await service.updateWorkOrder(ctx.request.body);
        ctx.response.body = {
          code: "1000",
          data: "success",
        };
        break;
    }
  }
}
