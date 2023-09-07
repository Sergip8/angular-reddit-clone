import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';



@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class RichTextEditor{

@Input() desc?: string[]
@Output() description = new EventEmitter<string>()
@Output() descriptionPost = new EventEmitter<string>()

placeholder = "Ingrese comentario"

inputDesc: FormGroup
  constructor(private fb: FormBuilder){
    if(this.desc)
    this.placeholder = this.desc[3]
    this.inputDesc = fb.group({
      description: ["" ,Validators.required]
    })

     this.inputDesc.controls['description'].valueChanges
    .pipe(distinctUntilChanged()).subscribe(data => {
      if(data)
       this.descriptionPost.emit(data)
    })
   }
    
  sendComment(){

    this.description.emit(this.inputDesc.controls['description'].value)
  }
  
  
  
    // quillConfig={
    //   //toolbar: '.toolbar',
    //    toolbar: {
    //      container: [
    //        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //        ['code-block'],
                       
    //        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    //        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    //                            // text direction
  
          
    //        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    //        [{ 'font': [] }],
    //        [{ 'align': [] }],
  
                                             
  
          
    //        ['link', 'image', 'video']  
          
    //      ],
     
    //    },
    
  
    // }
  
  
    
  }
  