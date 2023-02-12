import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
  
  productForm !: FormGroup;
  actionBTN:string='save'

  constructor(private formBuilder: FormBuilder,private api : ApiService,@Inject(MAT_DIALOG_DATA) public editData:any,private dialogRef : MatDialogRef<DialogComponent>){}
  ngOnInit(): void {
      this.productForm = this.formBuilder.group({
      stuffName : ['', Validators.required],
      stuffGender : ['', Validators.required],
      stuffRole : ['', Validators.required]

    });
    if(this.editData){
      this.actionBTN = 'Update'
      this.productForm.controls['stuffName'].setValue(this.editData.stuffName);
      this.productForm.controls['stuffGender'].setValue(this.editData.stuffGender);
      this.productForm.controls['stuffRole'].setValue(this.editData.stuffRole);
    }
    
  }
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Added");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
        
        error:()=>{
          alert("Error while adding")
        }
        })
      }
      }else{
        this.updateProduct()
      }
    }
    updateProduct(){
      this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Updated Successfully");
          this.productForm.reset();
          this.dialogRef.close('update')
        },
        error:()=>{
          alert('Error while update')
        }
        
      })
    
  }
}
