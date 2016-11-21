import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatlabTemplateModule as TemplateModule } from './../templates/flatlab';
import { BdsArticleRoutingModule } from './bds-article-routing.module';
import { BdsArticleComponent } from './bds-article.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttributeManageComponent } from './attribute-manage/attribute-manage.component';
import { AttributeOptionsComponent } from './attribute-options/attribute-options.component';


@NgModule({
  imports: [
    CommonModule,
    TemplateModule,
    BdsArticleRoutingModule,
  ],
  declarations: [BdsArticleComponent, DashboardComponent, AttributeManageComponent, AttributeOptionsComponent]
})
export class BdsArticleModule { }
