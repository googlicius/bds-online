import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatlabTemplateModule as TemplateModule } from './../templates/flatlab';
import { SharedModule } from './../shared';
import { BdsArticleRoutingModule } from './bds-article-routing.module';
import { BdsArticleComponent } from './bds-article.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttributeManageComponent } from './attribute-manage/attribute-manage.component';
import { AttributeEdit } from './attribute-manage/attribute-edit';
import { AttributeOptionsComponent } from './attribute-options/attribute-options.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TemplateModule,
    BdsArticleRoutingModule,
  ],
  declarations: [BdsArticleComponent, DashboardComponent, AttributeManageComponent, AttributeOptionsComponent, AttributeEdit]
})
export class BdsArticleModule { }
