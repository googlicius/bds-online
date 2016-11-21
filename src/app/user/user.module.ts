import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatlabTemplateModule as TemplateModule } from './../templates/flatlab';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent } from './list/list.component';

@NgModule({
    imports: [
        CommonModule,
        TemplateModule,
        UserRoutingModule,
    ],
    declarations: [UserComponent, ChangePasswordComponent, EditProfileComponent, ProfileComponent, ListComponent]
})
export class UserModule { }
