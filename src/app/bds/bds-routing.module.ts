import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BdsComponent } from './bds.component';
import { AttributeManageComponent } from './attribute-manage/attribute-manage.component';
import { BlocksResolver, ArticlesResolver } from './resolvers';
import { AttributeOptionsComponent } from './attribute-options/attribute-options.component';
import { ArticleListComponent } from './article-list/article-list.component';

let routes: Routes = [
    { path: '', component: BdsComponent, children: [
        { path: 'cai-dat', children: [
            { path: 'quan-ly-truong', component: AttributeManageComponent, resolve: {blocks: BlocksResolver} },
            { path: 'danh-sach-chon', component: AttributeOptionsComponent },
            { path: '', redirectTo: 'quan-ly-truong', pathMatch: 'full'},
        ]},
        { path: 'article', children: [
            { path: 'danh-sach', component: ArticleListComponent, resolve: {articles: ArticlesResolver} }
        ]},
        { path: '', redirectTo: 'cai-dat' },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [BlocksResolver,ArticlesResolver]
})
export class BdsRoutingModule{}