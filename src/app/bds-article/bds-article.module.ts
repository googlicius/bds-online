import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
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
    ToasterModule,
    DragulaModule,
    SharedModule,
    TemplateModule,
    BdsArticleRoutingModule,
  ],
  declarations: [BdsArticleComponent, DashboardComponent, AttributeManageComponent, AttributeOptionsComponent, AttributeEdit]
})
export class BdsArticleModule { }