import { Context, inject, controller, post,get, provide } from "midway";
import { ILabService } from "../../interface";
const fs = require("fs");
const path = require("path");

@provide()
@controller("/")
export class UploadController {
  @inject()
  ctx: Context;

  @inject("labService")
  service: ILabService;

  HOME = process.env.HOME;

  @get("/:name")
  async getFunc() {
    const { ctx } = this;
    let name = ctx.params.name;
    console.log(name)
    //let title = 'BZ302';
    switch (name) {
      case "getVideo":
        let ImageBasePathV=path.join(this.HOME, `location-files`,`d6f2a450-0a7e-4fb6-a040-70b00b0c4139.mp4`);
        ctx.response.body = {
          code: "1000",
          data: JSON.stringify({ url: ImageBasePathV }),
        };
    }
  }
  @post("/:path")
  async postFunc() {
    const { ctx, service } = this;
    console.log(ctx)
    let path_name = ctx.request.url;
    switch (path_name) {
      case "/uploadImg":
          let filePath = ctx.request.files[0].filepath;
          let ImageFile = fs.readFileSync(filePath);
          let ImageBasePath = path.basename(filePath);
          const ADestDir = path.join(this.HOME, `location-files`);
          if(!fs.existsSync(ADestDir)){
          fs.mkdirSync(ADestDir);            
          }
          fs.writeFileSync(
            path.join(this.HOME, `location-files`, ImageBasePath),
            ImageFile
          );
          

          ctx.response.body = {
            code: "1000",
            data: JSON.stringify({ url: ImageBasePath }),
          };
          break;   
      
      case "/uploadVideo":
        let videoPath = ctx.request.files[0].filepath;
        let videoBasePath = path.basename(videoPath);
        // async function wirteVideo(videoPath,home){
        // let videoFile = fs.readFileSync(videoPath);
        // let ImageBasePath = path.basename(videoPath);
        // const ADestDir = path.join(home, `location-files`);
        // if(!fs.existsSync(ADestDir)){
        // fs.mkdirSync(ADestDir);            
        // }
        // fs.writeFileSync(
        //   path.join(home, `location-files`, ImageBasePath),
        //   videoFile
        // );
        // }
        // wirteVideo(videoPath,this.HOME);
        ctx.response.body = {
          code: "1000",
          data: JSON.stringify({ url: videoBasePath }),
          // data: 'success'
        };
        break;

      case "/saveInfo":

        let { workorder_id,imgUrl } = ctx.request.body;
        await this.ctx.model.WorkOrderModel.destroy({where:{id:workorder_id}});
        const photo={workorder_id:workorder_id, url: imgUrl} 
        await service.addWorkOrderPicture(photo);
//         修改,把这边改成新增的操作
//         let ImgModel = await service.oneImageData(imageId);

//         let NowPath = path.join(
//           ctx.app.baseDir,
//           `app/public`,
//           ImgModel[0].photo
//         );
//         let AisUndefine = ImgModel[0].photo.split("/").slice(-1)[0];
//         if (fs.existsSync(NowPath) && AisUndefine!=='undefine.png' && ImgModel[0].photo) {
//           console.log(NowPath);
//           fs.unlink(NowPath, (error) => {
//             console.log(error);
//           });
//         }
//         ImgModel[0].photo = ImageBasePath;
//         await ImgModel[0].save();
        ctx.response.body = {
          code: "1000",
          data:"success",
        };
        break;    
      }
  }
}
