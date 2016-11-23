import { Component, OnInit, Injectable } from '@angular/core';
import { Response } from '@angular/http'; 
import { Observable } from 'rxjs';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AttributeService } from './attribute.service';
import { Attribute, Block } from './interfaces';
import { AuthHttp, urlEncode } from './../../shared';

@Injectable()
export class BlocksResolver implements Resolve<any>{
	constructor(public http: AuthHttp){}

	getBlocks(): Observable<any>{
		return this.http.get('/article-manage/get-blocks').map((response: Response) => {
			return response.json();
		});
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any{
		return this.getBlocks();
	}
}

@Component({
    selector: 'app-attribute-manage',
    templateUrl: './attribute-manage.component.html',
    styleUrls: ['./attribute-manage.component.css'],
    providers: [AttributeService]
})
export class AttributeManageComponent implements OnInit {

    blocks: Block[];
    attr_to_edit: Attribute;

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
}
