import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { Pages } from './pages.component';
import {AuthGuard} from "../theme/services/guards/auth.guard";
import {MenuService} from "app/theme/services/menu.service";

@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  providers: [
    AuthGuard,
    MenuService
  ],
  declarations: [Pages]
})
export class PagesModule {
}
