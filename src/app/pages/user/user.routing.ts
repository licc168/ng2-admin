import { Routes, RouterModule }  from '@angular/router';
import {UserComponent} from "./user.component";
import {UserListComponent} from "./list/userList.component";


// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'userList', component: UserListComponent}
    ]
  }
];

export const routing = RouterModule.forChild(routes);
