import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../theme/services/user/user.service";
import {User} from "../../../theme/models/user";
import {CONSTANTS} from "../../../app.const";

@Component({
  selector: 'userList',
  templateUrl: './user_list.html'
})
export class UserListComponent implements OnInit {
  private userListData; // 保存角色列表数据

  private totalPages; // 总页数
  private totalElements; // 总条数



  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.getPageData(1);
  }

  getPageData(currPage: number) {
    let user = new User;
    user.page = currPage - 1;
    user.size = 10;
    this.userService.page(user).subscribe(
      res => {
        if (res.status === CONSTANTS.HTTPStatus.SUCCESS) {
          let data = JSON.parse(res.text());

          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
          this.userListData = data.content;
        }
      },
      error => {


      })
  }

  deleteById(id:number){
    this.userService.deleteById(id).subscribe(
      res => {
        if (res.status === CONSTANTS.HTTPStatus.SUCCESS) {

        }
      },
      error => {


      })
  }


}
