import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/_guards/AuthGuard';

const routes: Routes = [
    { path: '', redirectTo: 'article', pathMatch: 'full' },
    { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
    { path: 'article', canActivateChild: [AuthGuard], loadChildren: 'app/bds-article/bds-article.module#BdsArticleModule'},
    { path: 'user', canActivateChild: [AuthGuard], loadChildren: 'app/user/user.module#UserModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class BdsOnlineManageRoutingModule { }
