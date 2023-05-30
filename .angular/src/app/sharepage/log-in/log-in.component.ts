import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {  
   email: String="";
   password: String="";

   constructor(private http: HttpClient,private router: Router) { } 

   register()
   {
    console.log(this.email,this.password);
     let bodyData = {
       "email" : this.email,
       "password" : this.password,
     };
    
      axios.post('http://localhost:9000/login', bodyData)
    .then(response => {
      this.router.navigate(['home']);
      console.log(response.data);
      alert("Login Successfully")
    })
    .catch(error => {
      alert("Invalid Credentials!!!")
      console.error(error);
    });
   }

}
