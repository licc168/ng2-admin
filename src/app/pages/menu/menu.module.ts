import {NgModule, Component}      from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgaModule} from '../../theme/nga.module';


import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {routing} from "./menu.routing";
import {MenuComponent} from "./menu.component";
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {MenuService} from "../../services/menu.service";
import {MenuEditComponent} from "./children/menu-edit/menu-edit.component";

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    NgbDropdownModule,
    NgbModalModule,
    NgZorroAntdModule,

    routing
  ],
  declarations: [
    MenuComponent,
    MenuEditComponent
  ],
  entryComponents: [
    MenuEditComponent
  ],
  providers: [
    MenuService,
    NgbActiveModal,

  ]
})
export class MenuModule {
}
