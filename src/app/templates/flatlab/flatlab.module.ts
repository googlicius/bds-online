import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './../../shared';

@NgModule({
  imports: [SharedModule,RouterModule],
  declarations: [FooterComponent, NavBarComponent, SidebarComponent, HeaderComponent],
  exports: [HeaderComponent, SidebarComponent, FooterComponent],
})
export class FlatlabTemplateModule { }
