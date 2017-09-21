import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {Router, ActivatedRoute} from '@angular/router';
import {MenuService} from "../../../../services/menu.service";
import {Menu} from "../../../../models/menu";
import {CONSTANTS} from "../../../../app.const";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'nz-menu-edit',
    templateUrl: './menu-edit.component.html',
    styleUrls: ['./menu-edit.component.less']
})
export class MenuEditComponent implements OnInit {
    _id = '';
  validateForm: FormGroup;
  menus: Array<Object>;


  constructor(private menuService: MenuService, private _message: NzMessageService, private router: Router, private route: ActivatedRoute,fb: FormBuilder) {

    this.validateForm = fb.group({
      'id': [''],
      'title': ['', Validators.compose([Validators.required])],
      'parentId': [''],
      'icon': [''],
      'path': [''],
      'orderNum': [''],


    });

        this.route.params.subscribe((params) => {
            console.dir(params);
            this._id = params['id'] || '';
        });
    }
  createMessage = (type, text) => {
    this._message.create(type,text);
  }

    ngOnInit(): void {
      this.parentList();
    }

  parentList() {

    this.menuService.parentList().subscribe(
      res => {
        if (res.status === CONSTANTS.HTTPStatus.SUCCESS) {
          let data = JSON.parse(res.text());
          this.menus = data;
        }
      },
      error => {


      });
  }
  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  public onSubmit(menu: Menu): void {
        debugger

      this.menuService.saveMenu(menu).subscribe(
        (data) => {
          if (data.status === CONSTANTS.HTTPStatus.SUCCESS) {
            this.createMessage("success","操作成功");
          }
        },
        error => {
          this.createMessage("error","操作失败");

        });
    };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  }

}
