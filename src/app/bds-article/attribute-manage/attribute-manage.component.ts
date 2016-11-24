import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttributeService } from './attribute.service';
import { Attribute, Block } from './interfaces';
import { urlEncode } from './../../shared';

@Component({
    selector: 'app-attribute-manage',
    templateUrl: './attribute-manage.component.html',
    styleUrls: ['./attribute-manage.component.css'],
    providers: [AttributeService]
})
export class AttributeManageComponent implements OnInit {

    blocks: Block[];
    attr_to_edit: Attribute;
    private add_block_form_open: boolean = false;

    constructor(private _attributeService: AttributeService, private _activatedRoute: ActivatedRoute) {
        _attributeService.saveAnnounced.subscribe((data: Attribute) => {
            console.log("Attribute saved: ", data);
            if(this.attr_to_edit){
                this.attr_to_edit.label = data.label;
                this.attr_to_edit.type = data.type;
                this.attr_to_edit.allow_null = data.allow_null;
                this.attr_to_edit = null;
            }else{
                let block_to_add = this.blocks.filter((block: Block) => {
                    return block.block_id == data.block_id;
                });

                block_to_add[0].attributes.push(data);
            }
        });
    }

    ngOnInit() {

        let blocks_res = this._activatedRoute.snapshot.data['blocks'];

        this.blocks = blocks_res.blocks;
    }

    triggerEditAttribute(block: Block, attr: Attribute){
        console.log(attr);
        this._attributeService.editAnnounce(block,attr);
        this.attr_to_edit = attr;
    }

    triggerAddNewAttribute(block){
        this._attributeService.editAnnounce(block);
    }

    triggerAddNewBlock(){
        this.add_block_form_open = true;
    }

    triggerSaveBlock(){
        this.add_block_form_open = false;
    }
}
