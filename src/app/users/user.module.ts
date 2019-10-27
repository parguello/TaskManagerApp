import { NgModule } from "@angular/core";
import { UserRouting } from "./user.routing";
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SharedLayoutModule } from "../shared/sharedLayout.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserRouting,
        SharedLayoutModule,
    ],
    declarations: [
        ViewUserComponent,
        EditUserComponent
    ],
    exports: [

    ],
    providers: [

    ]
})

export class UserModule {
    constructor() {
        console.log('User module loaded');
    }
}