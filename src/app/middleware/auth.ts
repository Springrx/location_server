import { WebMiddleware, provide } from 'midway';
import Response, { ResultStatus, StatusCode } from '../common/response';

@provide()
export class LoginAuthMiddleware implements WebMiddleware {
  resolve() {
    const response = new Response();
    return async (ctx, next) => {
      console.log(ctx.cookie)
      if(ctx.cookie===undefined){
        response.status = ResultStatus.fail;
        response.code = StatusCode.dataError;
        response.msg = 'cookie异常';
        ctx.body=new Response();
      }
      else{
        if (!ctx.cookie.user_info) {
        response.status = ResultStatus.fail;
        response.code = StatusCode.unlogin;
        response.msg = '当前用户未登录';
        ctx.body = response;
        } else {
        await next();
        }
      }
    };
  }
}
