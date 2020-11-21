import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
    selector: 'error-popup',
    templateUrl: './error-popup.component.html',
    styleUrls: ['./error-popup.component.scss']
})

export class ErrorPopupComponent {
    constructor(
        public readonly sharedService: SharedService
    ) {
    }

    ngOnInit() {
        
    }
}