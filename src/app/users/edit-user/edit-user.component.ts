import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from "@angular/router";
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Subscription } from 'rxjs';

import { SelectItem } from 'primeng/api';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  public formUser: FormGroup;

  public selectedUserId: string;
  public user: any;
  public headerTitle: string;

  msgs: Message[] = [];
  subscription: Subscription
  loading: boolean;
  userProps: any;

  public roles: SelectItem[];
  public selectedAccessId: string;
  public selectedAccess: any;
  public accessLastUpdatedDateTime: Date;



  constructor(private _formBuilder: FormBuilder,
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,



    private cdr: ChangeDetectorRef) {

    this.formUser = _formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'email': ['', Validators.required],
      'userType': ['', Validators.required]
    });

    this.roles = [
      { label: '', value: null },
      { label: 'Admin', value: 'Admin' },
      { label: 'User', value: 'User' }
    ];
  }

  ngOnInit() {


    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.selectedUserId = params['userId'];
        this.fetchUserData();
        this.headerTitle = "User Details";
      } else {
        this.headerTitle = "Add User";
      }



    });
  }

  fetchUserData() {

    this.loading = true;
    const body: any =
    {

    };
    this.subscription = this.userService.getUserById(this.selectedUserId).subscribe(
      (resp) => {
        this.loading = false;
        this.user = resp;
        this.formUser.patchValue(this.user);
      }, (error) => {
        this.loading = false;

      }
    );


  }

  onSave() {

    /*this.loading = true;

    const body: UserRequest = this.sharedService.getDirtyValues(this.formUser);
    body.id = this.selectedUserId;
    body.lastUpdatedDateTime = this.user.lastUpdatedDateTime;
    body.codeTag = this.userProps.globalBid;



    this.subscription = this.defaultService.userApiUserUpdateAccount(body, 'body', false).subscribe(
      (resp) => {
        this.loading = false;

        if (resp.errorCode === 0) {
          this.user.lastUpdatedDateTime = resp.lastUpdatedDateTime;

          if (this.formUser.get('tabletPin').dirty) {
            //only if Pin has been modified
            const body: AccessRequest =
            {
              userId: this.selectedUserId,
              codeTag: this.userProps.globalBid,
              pin: this.formUser.get('tabletPin').value,
              id: this.selectedAccessId,
              lastUpdatedDateTime: this.accessLastUpdatedDateTime
            };
            this.defaultService.accessApiAccessUpdate(body, 'body', false).subscribe(
              (resp) => {
                this.loading = false;
                if (resp.errorCode === 0) {
                  this.accessLastUpdatedDateTime = resp.lastUpdatedDateTime;
                  this.formUser.markAsPristine();
                  //this.msgs.push({ severity: 'success', summary: 'Success : ', detail: 'User updated' });
                  this.msgs = this.sharedService.getMessageSuccess('User updated');
                } else {
                  //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be updated' });
                  this.msgs = this.sharedService.getMessageError('User could not be updated');
                }
              });
          } else {
            this.loading = false;
            this.formUser.markAsPristine();
            //this.msgs.push({ severity: 'success', summary: 'Success : ', detail: 'User updated' });
            this.msgs = this.sharedService.getMessageSuccess('User updated');
          }

        } else {
          this.loading = false;
          //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be updated' });
          this.msgs = this.sharedService.getMessageError('User could not be updated');
        }
      }, (error) => {
        this.loading = false;
        //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be updated' });
        this.msgs = this.sharedService.getMessageError('User could not be updated');
      }
    );*/

  }

  onAdd() {

    /*if (this.formUser.valid) {

      this.loading = true;


      const body: AccessRequest =
      {
        codeTag: this.userProps.globalBid,
        pin: this.formUser.get('tabletPin').value,
      };
      this.subscription = this.defaultService.accessApiAccessGetByPin(body, 'body', false).subscribe(
        (resp) => {

          if (resp.errorCode === 0) {
            this.loading = false;
            //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'Pin number already exists in the system' });
            this.msgs = this.sharedService.getMessageError('Pin number already exists in the system');
          } else {

            const body: UserRequest = this.formUser.getRawValue();
            body.codeTag = this.userProps.globalBid;



            this.subscription = this.defaultService.userApiUserCreate(body, 'body', false).subscribe(
              (resp) => {


                if (resp.id) {
                  this.selectedUserId = resp.id;

                  const body: AccessRequest =
                  {
                    userId: resp.id,
                    codeTag: this.userProps.globalBid,
                    pin: this.formUser.get('tabletPin').value,
                    id: this.selectedAccessId,
                    lastUpdatedDateTime: this.accessLastUpdatedDateTime
                  };
                  this.defaultService.accessApiAccessCreate(body, 'body', false).subscribe(
                    (resp) => {

                      if (resp.errorCode === 0) {

                        //Create user with default password in Firebase
                        this.subscription = this.authService.createUser(this.formUser.get('email').value, 'password').subscribe(
                          (resp) => {

                            this.subscription = this.authService.resetPassword(this.formUser.get('email').value).subscribe(
                              (resp) => {
                                this.loading = false;
                                this.formUser.markAsPristine();
                                this.sharedService.messageData = 'ADD';
                                this.router.navigate(['/edit-user', this.selectedUserId]);
                              }, (error) => {
                                //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'Reset email could not be sent' });
                                this.msgs = this.sharedService.getMessageError('Reset email could not be sent');
                              }
                            );

                          }, (error) => {
                            //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be added in Firebase' });
                            this.msgs = this.sharedService.getMessageError('User could not be added in Firebase');
                          }
                        );

                      } else {
                        //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be added' });
                        this.msgs = this.sharedService.getMessageError('User could not be added');
                      }
                    });

                } else {
                  //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be added' });
                  this.msgs = this.sharedService.getMessageError('User could not be added');
                }

              }, (error) => {
                this.loading = false;
                //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be added' });
                this.msgs = this.sharedService.getMessageError('User could not be added');
              }
            );
          }
        }, (error) => {
          this.loading = false;
          //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be added' });
          this.msgs = this.sharedService.getMessageError('User could not be added');
        });
    }*/
  }

  onConfirmDeletion() {

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete User Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.loading = true;

        /* const body: AccessRequest =
         {
           userId: this.selectedUserId,
           codeTag: this.userProps.globalBid,
           id: this.selectedAccessId,
           lastUpdatedDateTime: this.accessLastUpdatedDateTime
         };
         this.defaultService.accessApiAccessDelete(body, 'body', false).subscribe(
           (resp) => {
             this.loading = false;
             if (resp.errorCode === 0) {
               const body: UserRequest =
               {
                 id: this.selectedUserId,
                 lastUpdatedDateTime: this.user.lastUpdatedDateTime,
                 codeTag: this.userProps.globalBid,
               };
 
               this.subscription = this.defaultService.userApiUserDelete(body, 'body', false).subscribe(
                 (resp) => {
                   this.loading = false;
 
                   if (resp.errorCode === 0) {
 
                     this.sharedService.messageData = 'DELETE';
                     this.router.navigate(['view-user']);
 
                   } else {
                     //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be removed' });
                     this.msgs = this.sharedService.getMessageError('User could not be removed');
                   }
                 }, (error) => {
                   this.loading = false;
                   //this.msgs.push({ severity: 'error', summary: 'Error : ', detail: 'User could not be removed' });
                   this.msgs = this.sharedService.getMessageError('User could not be removed');
                 }
               );
             }
           });*/

      },
      reject: () => {
      }
    });
  }

  onChangeRole() {
    let password = this.formUser.get('password');

    if ((this.formUser.get('roleType').value).toString() === '10') {
      password.setValidators([Validators.required, Validators.minLength(8)]);
    } else {
      password.setValidators([]);
    }
    this.cdr.detectChanges();
  }

  onCancel() {

    if (this.user) {
      this.formUser.patchValue(this.user);
      this.formUser.get('tabletPin').setValue(this.selectedAccess.pin);

    } else {
      this.formUser.reset();
    }

    this.formUser.markAsPristine();
  }
  onBack() {
    //this._location.back();
    this.router.navigate(['view-user']);
  }


}

