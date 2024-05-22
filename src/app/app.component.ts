import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DataRequestService } from './services/data-request.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PradanDataDeleteRequest';
  dataDeleteRequestForm: FormGroup | any;
  public loginStatusMessage: any;

  constructor(private fb: FormBuilder, private dataRequestServices: DataRequestService) { }

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
    if (this.dataDeleteRequestForm.valid) {
      this.dataRequestServices.pradanDataDeleteRequest(this.dataDeleteRequestForm.value).subscribe(
        response => {
          if (response.Status) {

            this.loginStatusMessage = "Your request has been received successfully. The PRADAN team will review the details and get back to you shortly. We appreciate your patience and are here to assist you with any further queries or support you may need.";
            this.send();
          } else {
            this.loginStatusMessage = response.Message;
          }
        },
        error => {
          console.error('Error:', error);
          // Handle error response
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  async send() {
    emailjs.init('gceotaLxGcKv7t47S');
    let response = await emailjs.send('service_izigtr8', 'template_gnsxsmj', {
      from_name: 'Aditya Pandey',
      to_name: 'Pradhan',
      from_email: 'adityapanday8651@gmail.com',
      subject: 'This is subject',
      message: 'This is Message Good'
    });

    alert("Message has been send");  // This is confirm messages
  }
}
