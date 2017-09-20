import {NgModule, Component}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';


import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {routing} from "./user.routing";
import {UserComponent} from "./user.component";
import {UserListComponent} from "./list/userList.component";
import {UserService} from "../../theme/services/user/user.service";
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgbDropdownModule,
    NgbModalModule,
    NgZorroAntdModule,

    routing
  ],
  declarations: [
    UserComponent,
    UserListComponent
  ],
  entryComponents: [
  ],
  providers: [
    UserService,
    NgbActiveModal,

  ]
})
export class UserModule {
}
