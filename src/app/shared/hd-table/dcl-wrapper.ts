import { Component, Input, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, Compiler, Type, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { Column } from './interfaces';
import { HdText } from './hd-text';

@Component({
    selector: 'dcl-wrapper',
    template: '<template #target></template>',
})
export class DclWrapper implements AfterViewInit, OnDestroy  {
    @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
    @Input() column: Column;
    @Input() data: any;
    cmpRef: ComponentRef<Component>;
    private isViewInitialized: boolean = false;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler) {

    }

    updateComponent() {
        if (!this.isViewInitialized) {
            return;
        }
        if (this.cmpRef) {
            // when the `type` input changes we destroy a previously 
            // created component before creating the new one
            this.cmpRef.destroy();
        }

        let factory = this.componentFactoryResolver.resolveComponentFactory(HdText);
        this.cmpRef = this.target.createComponent(factory);
        // to access the created instance use

        // this.compRef.instance.someOutput.subscribe(val => doSomething());
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}