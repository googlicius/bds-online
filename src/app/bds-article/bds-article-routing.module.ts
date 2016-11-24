import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BdsArticleComponent } from './bds-article.component';
import { AttributeManageComponent } from './attribute-manage/attribute-manage.component';
import { BlocksResolver } from './attribute-manage/resolvers';
import { AttributeOptionsComponent } from './attribute-options/attribute-options.component';

let routes: Routes = [
    { path: '', component: BdsArticleComponent, children: [
        { path: 'quan-ly-truong', component: AttributeManageComponent, resolve: {blocks: BlocksResolver} },
        { path: 'danh-sach-chon', component: AttributeOptionsComponent },
        { path: '', redirectTo: 'quan-ly-truong', pathMatch: 'full'}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BlocksResolver]
})
export class BdsArticleRoutingModule{}