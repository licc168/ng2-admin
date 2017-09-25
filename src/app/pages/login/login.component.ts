import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";




import 'style-loader!./login.scss';
import {CONSTANTS} from "../../app.const";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styles: [ `
    .login-form {
      max-width: 400px;
      
    }
  
    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
  `
  ]
})
export class Login implements OnInit {

  validateForm:FormGroup;
   userName:AbstractControl;
   password:AbstractControl;
   remember:AbstractControl;
   submitted:boolean = false;
   returnUrl:string;
   errorMessage:string;
   alerts:any = [];

  constructor(fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    this.validateForm = fb.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'remember': [ true ]
    });

    this.userName = this.validateForm.controls['userName'];
    this.password = this.validateForm.controls['password'];
    this.remember = this.validateForm.controls['remember'];

  }

  ngOnInit() {

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    sessionStorage.setItem("returnUrl", this.returnUrl);
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.validateForm.valid) {
      this.login();
    }
  }

  login() {
    this.authenticationService.login(this.userName.value, this.password.value)
      .subscribe(
        data => {
        if (data.status === CONSTANTS.HTTPStatus.SUCCESS) {
          this.router.navigate([this.returnUrl]);
        }
      },
        error => {

        const status = error.status;
        switch (status) {
          case  CONSTANTS.HTTPStatus.UNAUTHORIZED:
            const message = JSON.parse(error._body).message.replace("Authentication Failed:", "").trim();
            switch (message) {
              case "Bad credentials":
                this.errorMessage = "用户名或密码错误";
                break
              default:
                this.errorMessage = message;
            }
            break;
          case  CONSTANTS.HTTPStatus.INTERNAL_SERVER_ERROR:
            this.errorMessage = "系统异常";
            break;
          case CONSTANTS.HTTPStatus.GATEWAY_TIMEOUT:
            this.errorMessage = "服务器连接超时";
            break;
          case CONSTANTS.HTTPStatus.FORBIDDEN:
            this.errorMessage = "没有权限禁止访问";
            break;
          default:
            this.errorMessage = error._body;
        }
        this.alerts = [];
        this.alerts.push({
          type: 'danger',
          msg: this.errorMessage,
          timeout: 5000
        });

      });
  }
}
