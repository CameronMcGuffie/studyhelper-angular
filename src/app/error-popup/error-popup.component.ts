import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'error-popup',
    templateUrl: './error-popup.component.html',
    styleUrls: ['./error-popup.component.scss']
})

export class ErrorPopupComponent {
    constructor(
        private sharedService: SharedService
    ) {
    }

    error_title: string;
    error_info: string;

    ngOnInit() {
        this.error_title = this.sharedService.error_title;
        this.error_info = this.sharedService.error_info;
    }
}