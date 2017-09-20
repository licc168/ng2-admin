
import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import 'rxjs/add/operator/map'
import {User} from "../models/user";
import {Menu} from "../models/menu";
import {AuthenticationService} from "./login/authentication.service";
import {CONSTANTS} from "app/app.const";


@Injectable()
export class MenuService {
  constructor(private http: Http,private  authenticationService:AuthenticationService) {
  }
  //获取菜单列表
  list(){
    return this.http.get(CONSTANTS.API_URL.menu.list).map((response: Response) => response);
  }
  //查询菜单信息
  page(menu:Menu){

    let options =  new RequestOptions({
      method: RequestMethod.Get,
      url:CONSTANTS.API_URL.menu.page,
      search:menu
    });
    return this.http.request(new Request(options)).map((response: Response) => response);
  }

  deleteById(id:number){
    return this.http.delete(CONSTANTS.API_URL.menu.delete+"/"+id).map((response: Response) => response);
  }

  saveMenu(menu:Menu){
    return this.http.post(CONSTANTS.API_URL.menu.save,menu).map((response: Response) => response);
  }

  parentList(){
    return this.http.get(CONSTANTS.API_URL.menu.parentList).map((response: Response) => response);
  }
  getById(id:number){
    return this.http.get(CONSTANTS.API_URL.menu.getById+"/"+id).map((response: Response) => response);
  }
}
