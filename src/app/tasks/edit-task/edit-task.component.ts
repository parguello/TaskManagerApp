import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from "@angular/router";
import { Message } from 'primeng/components/common/api';
import { Subscription } from 'rxjs';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectItem } from 'primeng/api';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})

export class EditTaskComponent implements OnInit {

  public formTask: FormGroup;
  public countries: SelectItem[];
  public priorities: SelectItem[];

  public selectedTaskId: number;
  public task: any;
  public headerTitle: string;
  public dirtyValues = {};

  msgs: Message[] = [];
  subscription: Subscription
  loading: boolean;
  userProps: any;



  constructor(private _formBuilder: FormBuilder, private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute) {


    this.priorities = [
      { label: '', value: null },
      { label: 'High', value: 'High' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Low', value: 'Low' }
    ];

    this.countries = [
      { label: '', value: null },
      { label: 'United Kingdom', value: 'GBR' },
      { label: 'Ireland', value: 'IRL' }
    ];

    this.formTask = _formBuilder.group({
      'shortDescription': ['', Validators.required],
      'status': [''],
      'longDescription': [''],
      'priority': ['', Validators.required],
      'userAssigned': [''],
      'email': ['', Validators.email],
      'notification': ['']
    });
  }

  ngOnInit() {



    this.route.params.subscribe(params => {
      if (params['taskId']) {
        this.selectedTaskId = params['taskId'];
        this.fetchTaskData();
        this.headerTitle = "Edit Task";
      } else {
        this.headerTitle = "Add Task";
      }


    });
  }

  fetchTaskData() {

    this.loading = true;
    const body: any =
    {

    };
    this.subscription = this.taskService.getTaskById(this.selectedTaskId).subscribe(
      (resp) => {
        this.loading = false;
        this.task = resp;
        this.formTask.patchValue(this.task);
      }, (error) => {
        this.loading = false;

      }
    );


  }

  onDisplayBillingAddress(isSame: boolean) {

    if (isSame) {
      this.mapBillingAddress();
    } else {
      this.formTask.get('billingAddressLine1').setValue('');
      this.formTask.get('billingAddressLine2').setValue('');
      this.formTask.get('billingAddressLine3').setValue('');
      this.formTask.get('billingPostalZipCode').setValue('');
      this.formTask.get('billingCity').setValue('');
      this.formTask.get('billingCountyState').setValue('');
    }
  }

  mapBillingAddress() {
    this.formTask.get('billingAddressLine1').setValue(this.formTask.get('addressLine1').value);
    this.formTask.get('billingAddressLine2').setValue(this.formTask.get('addressLine2').value);
    this.formTask.get('billingAddressLine3').setValue(this.formTask.get('addressLine3').value);
    this.formTask.get('billingPostalZipCode').setValue(this.formTask.get('postalZipCode').value);
    this.formTask.get('billingCity').setValue(this.formTask.get('city').value);
    this.formTask.get('billingCountyState').setValue(this.formTask.get('countyState').value);
  }

  onSave() {
    /* if (this.formTask.get('sameAddress').value) {
       this.mapBillingAddress();
     }
 
     this.loading = true;
 
     const body: BusinessRequest = this.sharedService.getDirtyValues(this.formTask);
     body.codeTag = this.selectedTaskId.toString();
     body.id = this.selectedTaskId.toString();
     body.userId = this.userProps.userId;
     body.lastUpdatedDateTime = this.task.lastUpdatedDateTime;
 
     this.subscription = this.defaultService.businessApiBusinessUpdate(body, 'body', false).subscribe(
       (resp) => {
         this.loading = false;
         if (resp.errorCode === 0) {
           this.formTask.reset();
           this.formTask.markAsPristine();
           this.fetchTaskData();
 
           this.msgs = this.sharedService.getMessageSuccess('task updated');
         } else {
           this.msgs = this.sharedService.getMessageError('task could not be updated');
         }
       }, (error) => {
         this.loading = false;
         this.msgs = this.sharedService.getMessageError('task could not be updated');
       }
     );*/

  }

  onAdd() {

    /*if (this.formTask.get('sameAddress').value) {
      this.mapBillingAddress();
    }
    this.loading = true;
    const body: BusinessRequest = this.formTask.getRawValue();
    body.userId = this.userProps.userId;
    body.timezone = "GMT";
    body.configJsonStr = "{}";
    body.type = "task";


    this.subscription = this.defaultService.businessApiCreateBusiness(body, 'body', false).subscribe(
      (resp) => {
        this.loading = false;
        if (resp.id) {
          this.formTask.markAsPristine();

          this.sharedService.messageData = 'ADD';
          this.router.navigate(['/edit-task', resp.id]);
        } else {
          this.msgs = this.sharedService.getMessageError('task could not be added');
        }
      }, (error) => {
        this.loading = false;
        this.msgs = this.sharedService.getMessageError('task could not be added');
      }
    );*/
  }

  onConfirmDeletion() {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete task Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true;
        /* const body: BusinessRequest =
         {
           codeTag: this.selectedTaskId.toString(),
           id: this.selectedTaskId.toString(),
           businessName: this.task.businessName,
           userId: this.userProps.userId,
           lastUpdatedDateTime: this.task.lastUpdatedDateTime,
         };
 
         this.subscription = this.defaultService.businessApiEraseBusiness(body, 'body', false).subscribe(
           (resp) => {
             this.loading = false;
 
             if (resp.errorCode === 0) {
               this.sharedService.messageData = 'DELETE';
               this.router.navigate(['view-task']);
             } else {
 
               this.msgs = this.sharedService.getMessageError('task could not be removed');
             }
           }, (error) => {
             this.loading = false;
 
             this.msgs = this.sharedService.getMessageError('task could not be removed');
           }
         );*/
      },
      reject: () => {
      }
    });
  }

  onCancel() {
    if (this.task) {
      this.formTask.patchValue(this.task);
    } else {
      this.formTask.reset();
    }

    this.formTask.markAsPristine();
  }
  onBack() {
    this.router.navigate(['/view-task']);
  }


}
