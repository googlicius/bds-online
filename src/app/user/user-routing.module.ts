import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent} from './user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent } from './list/list.component';

let routes: Routes = [
    { path: '', component: UserComponent, children: [
        { path: 'doi-mat-khau', component: ChangePasswordComponent },
        { path: 'sua-thong-tin-ca-nhan', component: EditProfileComponent },
        { path: 'thong-tin-tai-khoan', component: ProfileComponent },
        { path: 'danh-sach/:loai', component: ListComponent },
        { path: '', redirectTo: 'thong-tin-tai-khoan', pathMatch: 'full'}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule{}