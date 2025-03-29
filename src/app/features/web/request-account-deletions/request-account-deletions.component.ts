import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SharedService } from '../../../../app/shared/services/shared.service';
import { DelegateService } from '../../delegate/services/delegate.service';
import { DatePipe, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-request-account-deletions',
  templateUrl: './request-account-deletions.component.html',
  styleUrls: ['./request-account-deletions.component.css']
})
export class RequestAccountDeletionsComponent implements OnInit{

  userForm!: FormGroup;
  isText: boolean = false;

  constructor(
  private _fb: FormBuilder,
  private router: Router,
  private delegateService: DelegateService,
  private sharedService: SharedService,
  private ngxService: NgxUiLoaderService,
  @Inject(DOCUMENT) private document: Document,
  private renderer : Renderer2
) { }
ngOnInit(): void {
  // Set up form configurations
  this._preConfig();
}


getcontrol(name: any): AbstractControl | null {
  return this.userForm.get(name);
}

// Function to initialize form configurations
private _preConfig() {
  this._createuserForm();
}

// Function to Deletion account form
private _createuserForm() {
  this.userForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    reason: ['', []],
    role: 1

  });
}


// Function to submit the form data
deletePeacekeeperAcc() {
  if(this.userForm.value.email == "" || this.userForm.value.email == undefined) {
        this.renderer.selectRootElement('#email').focus();
        this.sharedService.ToastPopup("Please Enter Email ID",'','error');
        return;
      }
      else if (this.userForm.controls['email'].invalid) {
        this.renderer.selectRootElement('#email').focus();
        this.sharedService.ToastPopup('Please enter a valid Email ID', '', 'error');
        return;
      }
  let peaceDeleteAcc = {
    email: this.userForm.controls['email'].value,
    role: this.userForm.controls['role'].value,
  }


  this.ngxService.start();
  
  this.delegateService.postPeaceDeleteAcc(peaceDeleteAcc).subscribe((res: any) => {
       
    this.sharedService.ToastPopup(res.message, '', 'success');
this.ngxService.stop();
    setTimeout(() => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/request-account-deletion']));
    }, 2000);
  }, (err) => {
    this.ngxService.stop();

    this.sharedService.ToastPopup('User not found, Please enter correct detail', '', 'error');
  })
}

}
