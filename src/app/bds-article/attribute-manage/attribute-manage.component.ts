import { Component, OnInit } from '@angular/core';

interface  Block{
    block_id: number,
    name: string,
    label: string,
    seq: number,
    attributes: Attribute[]
}
interface Attribute{
    attr_id: number,
    name: string,
    label: string,
    seq: number,
    type: InputType,
}
interface InputType{
    name: string,
    options?: any[]
}

@Component({
    selector: 'app-attribute-manage',
    templateUrl: './attribute-manage.component.html',
    styleUrls: ['./attribute-manage.component.css']
})
export class AttributeManageComponent implements OnInit {

    blocks: Block[];

    constructor() { }

    ngOnInit() {

        this.blocks = [
            {
                block_id: 1,
                name: "thongTinCoBan",
                label: "Thông tin cơ bản",
                seq: 1,
                attributes: [
                    {
                        attr_id: 1,
                        name: "district",
                        label: "District",
                        seq: 2,
                        type: {name: "select"}
                    },{
                        attr_id: 2,
                        name: "description",
                        label: "Mô tả",
                        seq: 3,
                        type: {name: "textarea"}
                    },{
                        attr_id: 3,
                        name: "title",
                        label: "Tiêu đề",
                        seq: 1,
                        type: {name: "text"}
                    }
                ]
            },
            {
                block_id: 2,
                name: "thongTinLienHe",
                label: "Thông tin liên hệ",
                seq: 2,
                attributes: [
                    {
                        attr_id: 4,
                        name: "contact_name",
                        label: "Tên liên hệ",
                        seq: 1,
                        type: {name: "text"}
                    },
                    {
                        attr_id: 5,
                        name: "contact_phone",
                        label: "Số điện thoại",
                        seq: 2,
                        type: {name: "text"}
                    }
                ]
            }
        ];

        
    }

    triggerEditAttribute(attr){

    }

    triggerAddNewAttribute(){

    }
}
