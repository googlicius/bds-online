import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/_guards/AuthGuard';

const routes: Routes = [
    { path: '', redirectTo: 'bds', pathMatch: 'full' },
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'bds', canActivateChild: [AuthGuard], loadChildren: 'app/bds/bds.module#BdsModule'},
    { path: 'user', canActivateChild: [AuthGuard], loadChildren: 'app/user/user.module#UserModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class BdsOnlineManageRoutingModule { }
