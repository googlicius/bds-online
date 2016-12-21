import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { FlatlabTemplateModule as TemplateModule } from './../templates/flatlab';
import { SharedModule } from './../shared';
import { BdsRoutingModule } from './bds-routing.module';
import { BdsComponent } from './bds.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttributeManageComponent } from './attribute-manage/attribute-manage.component';
import { AttributeEditModal } from './attribute-manage/attribute-edit-modal';
import { AttributeOptionsComponent } from './attribute-options/attribute-options.component';
import { ArticleListComponent } from './article-list/article-list.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    DragulaModule,
    SharedModule,
    TemplateModule,
    BdsRoutingModule,
  ],
  declarations: [BdsComponent, DashboardComponent, AttributeManageComponent, AttributeOptionsComponent, AttributeEditModal, ArticleListComponent],
  entryComponents: [AttributeEditModal],
})
export class BdsModule { }