import { NgModule } from "@angular/core";
import { TaskRouting } from "./task.routing";
import { ViewTaskComponent } from './view-task/view-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedLayoutModule } from '../shared/sharedLayout.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TaskRouting,
        SharedLayoutModule
    ],
    declarations: [
        ViewTaskComponent,
        EditTaskComponent
    ],
    exports: [

    ],
    providers: [

    ]
})

export class TaskModule {
    constructor() {
        console.log('Task module loaded');
    }
}