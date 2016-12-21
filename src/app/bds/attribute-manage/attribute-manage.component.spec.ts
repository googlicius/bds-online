/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AttributeManageComponent } from './attribute-manage.component';
import { AttributeService } from './attribute.service';

describe('Component: AttributeManage', () => {
  it('should create an instance', () => {
    let attributeService: AttributeService;
    let component = new AttributeManageComponent(attributeService);
    expect(component).toBeTruthy();
  });
});
