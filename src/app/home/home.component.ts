//import { FormGroup, FormControl, Validators } from '@angular/forms'
// Must import to use Forms functionality  
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';  


import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  regiForm: FormGroup;
  FirstName: string = '';
  LastName: string = '';
  Address: string = '';
  DOB: Date = null;
  Gender: string = '';
  Blog: string = '';
  Email: string = '';
  IsAccepted: number = 0;
  people = [];
  contactForm;
  destroy$: Subject<boolean> = new Subject<boolean>();
  personId: string = "This is my title"
  personDetails: string[] = ['_id', 'firstname', 'lastname'];

  x = this.personDetails[1];

  constructor(private dataService: DataService, private fb: FormBuilder) {
    // To initialize FormGroup  
    this.regiForm = fb.group({
      'FirstName': [null, Validators.required],
      'LastName': [null, Validators.required]
      //'Address': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      //'DOB': [null, Validators.required],
      //'Gender': [null, Validators.required],
      //'Blog': [null, Validators.required],
      //'Email': [null, Validators.compose([Validators.required, Validators.email])],
      //'IsAccepted': [null]
    });  
  }

  ngOnInit() {
    this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      console.log(data);
      this.people = data;
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]); 

  onChange(event: any) {
    if (event.checked == true) {
      this.IsAccepted = 1;
    } else {
      this.IsAccepted = 0;
    }
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.dataService.sendPostRequest(JSON.stringify(form)).pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      console.log(data);
      var person = { "_id": data["InsertedID"], "firstname": form["FirstName"], "lastname": form["LastName"] }
      this.people.push(person)
      this.regiForm.reset()
    })
  }  


  onDeletePerson(id) {
    //alert(id)
    this.dataService.sendDeleteRequest(id).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
     // this.people.push(person)
      console.log(data);
      this.regiForm.reset()
    })
  } 
  

  /*get firstname() {
    return this.contactForm.get('firstname');
  }

  get lastname() {
    return this.contactForm.get('lastname');
  }*/
}
