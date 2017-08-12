import { Component, Input, OnInit } from '@angular/core';


@Component({
    template: `
    {{renderValue}}
  `,
})
export class CustomRenderComponent implements /*ViewCell,*/ OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

}