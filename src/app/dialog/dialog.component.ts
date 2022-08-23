import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  userForm !: FormGroup
  actionBtn: string = "submit"
 
  userData:any=[]
 
  constructor(private api: ApiService,
  @Inject(MAT_DIALOG_DATA) public editData :any,
  private formBuilder:FormBuilder,
  private dialogRef : MatDialogRef<DialogComponent>) 
  { 
   
  }

 
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      title:[''],
      firstName:[''],
      lastName:[''],
      picture:[''],
      email:['']
    
    });
    if(this.editData){
      this.actionBtn = 'Update'
      this.userForm.controls['title'].setValue(this.editData.title)
      this.userForm.controls['firstName'].setValue(this.editData.firstName)
      this.userForm.controls['lastName'].setValue(this.editData.lastName)
      this.userForm.controls['picture'].setValue(this.editData.picture)
     
    }
  }
 
 
  submit(){
   if(!this.editData){
    if(this.userForm.valid){
     
      this.api.postUser(this.userForm.value)
      .subscribe({
        next:(res)=>{
          console.log("user data added",res)
          alert("user data added successfully")
          this.userForm.reset();
          this.dialogRef.close('submit');
           },
        error:()=>{
          alert("Error while adding user data")
        }
      })
     }
    }else{
      this.updateUser()
    }
  }
 
  updateUser(){
    this.api.putUser(this.userForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        console.log(res)
        alert("User Data updated successfully");
        this.userForm.reset();
        this.dialogRef.close('updated')
      },
      error:()=>{
        alert("Error while updating the data")
      }

    })
  }
 

}
