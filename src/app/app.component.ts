import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DataRequestService } from './services/data-request.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PradanDataDeleteRequest';
  dataDeleteRequestForm: FormGroup | any;
  public loginStatusMessage: any;
  public submitted = false;
  public responseStatus: any;

  constructor(
    private fb: FormBuilder,
    private dataRequestServices: DataRequestService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit() {
    await this.formWithValidation();
  }

  public async formWithValidation() {
    this.dataDeleteRequestForm = this.fb.group({
      username: ['', [Validators.required, this.emailOrMobileValidator.bind(this)]],
      password: ['', [Validators.required]],
      isAdmin: [0, ''],
      deviceId: ['', ''],
      languageId: [1, '']
    });
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.dataDeleteRequestForm.controls; }

  onBlur(controlName: string) {
    this.dataDeleteRequestForm.controls[controlName].markAsTouched();
  }

  emailOrMobileValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    const mobilePattern = /^[0-9]{10}$/; // Exactly 10 digits

    if (emailPattern.test(value)) {
      return null; // Valid email format
    } else if (mobilePattern.test(value)) {
      return null; // Valid mobile number format
    } else {
      return { invalidInput: true }; // Invalid
    }
  }

  onSubmit() {
    this.submitted = true;
    this.dataDeleteRequestForm.markAllAsTouched();
    if (this.dataDeleteRequestForm.valid) {
      this.spinner.show();
      this.dataRequestServices.pradanDataDeleteRequest(this.dataDeleteRequestForm.value).subscribe(
        response => {
          this.responseStatus = response.Status;
          if (this.responseStatus) {

            this.loginStatusMessage = "Your request has been received successfully. The PRADAN team will review the details and get back to you shortly. We appreciate your patience and are here to assist you with any further queries or support you may need.";
          } else {
            this.loginStatusMessage = response.Message;
          }
          this.spinner.hide();
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      return;
    }
  }
}
