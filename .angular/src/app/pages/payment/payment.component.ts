
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  title = "Payment"

  grandTotal!: number

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart.getProducts().subscribe(res => {
      this.grandTotal = this.cart.getPrice();
      console.log(res)
    })
  }

  fName = ""
  lName = ""
  Addr = ""
  phone = "+91 "
  country = "India"

  numericOnly(event: { key: string; }): boolean {
    let pattern = /^([0-9])$/;
    let result = pattern.test(event.key);
    return result;
  }

  paytm = ""
  bhim = ""
  method = ""
  selected = ""
  disableBtn=true

  onClick() {
    this.selected = this.method
  }

  pay() {
    alert("Thank you for your order!")
  }

  continue(){
    if(this.fName!="" && this.lName!=""){
      this.disableBtn=false
    }
  }
}

