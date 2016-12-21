import { Component, Input, Injectable } from '@angular/core';

@Injectable()
export class Link{
    url?: string;
    display?: string;
    title?: string;
}

@Component({
    selector: 'hd-link',
    template: `
        <a title="{{link.title}}" >{{link.display}}</a>
    `,
})
export class HdLink{
    @Input() link: Link;
    constructor(){}
}