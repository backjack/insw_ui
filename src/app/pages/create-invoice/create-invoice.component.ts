import { Component, OnInit, ViewChild,Inject,Injector } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../core/dialog-box/dialog-box.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {InvoiceItem, InvoiceSummary} from '../../models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {InvoiceService} from '../../services/invoice.service';


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  displayedColumns: string[] = ['no', 'description', 'price', 'qty','non_tax','igst','cgst','sgst','tax_amt','total_amt','action'];
  loaded_data : InvoiceItem[] = [];
  dataSource: InvoiceItem[] = [];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  total_amt:number =0;
  priceWords:string;
  update:boolean = false;
  client_option = [{id:"1",name:"ABC"},{id:"2",name:"PQR"},{id:"3",name:"XYZ"}]
  invoiceSummary:InvoiceSummary;
  
  
  // constructor(public dialog: MatDialog) {

  // }

  // constructor(public dialog: MatDialog,
  //   public dialogRef: MatDialogRef<DialogBoxComponent>,
  //   @Inject(MAT_DIALOG_DATA)  dataSource: InvoiceItem[]) {

  //      this.dataSource = dataSource;
  //      console.log(dataSource)
  //   }

    private dialogRef = null;
    private dialogData;
    constructor(public dialog: MatDialog,private injector: Injector,private invoiceService:InvoiceService) {
        this.dialogRef = this.injector.get(MatDialogRef, null);
        this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
        console.log(this.dialogData )

        if(this.dialogData != null) {

          this.invoiceSummary = this.dialogData.row;
          this.update = this.dialogData.update;
     
          this.invoiceService.getInvoiceItems(this.dialogData.row.fyear,
            this.dialogData.row.invoiceId).subscribe(x=>{
            
              let items = Array<InvoiceItem>();
              let counter =1;
              x.forEach( y =>{

                let item = new InvoiceItem(y.name,counter,y.qty,y.sgst,y.igst,y.cgst,y.price); 
                 counter = counter +1;
                items.push(item);
              })

            this.loaded_data = items;
            this.dataSource = items;
            this.updateTotalAmt();
            this.price_in_words(this.total_amt);
          })
        } else {

          this.invoiceSummary = new InvoiceSummary();

          
        }


    }

  ngOnInit(): void {

    this.invoiceService.getClients().subscribe(x =>{
 
        console.log(x);
    });
  }


  public sortDataSource() :void {

    this.dataSource.sort((a, b) => {
      if (a.no < b.no)
          return -1;
      if (a.no > b.no)
          return 1;
      return 0;
  });


  }

   openDialog(action:string,row_obj:InvoiceItem) {
     
    let item = new InvoiceItem(row_obj.name,row_obj.no,row_obj.qty,row_obj.sgst,row_obj.igst,row_obj.cgst,row_obj.price);
    
      const dialogRef = this.dialog.open(DialogBoxComponent, {
        width: '500px',
        data: item
      });

    dialogRef.afterClosed().subscribe(result => {
  
      if(action == 'Add'){

        this.sortDataSource()
        let no = 0;
        length = this.dataSource.length;
        if(length>0) {
            length = length-1;
            no = this.dataSource[length].no +1;
        } 

        this.addRowData(result,no);
      } else if(action=='Update') {
         this.updateRowData(result);
      }
    });
  }

  addRowData(row_obj:InvoiceItem,no:number){

    let newItem = new InvoiceItem(row_obj.name,no,row_obj.qty,row_obj.sgst,row_obj.igst,row_obj.cgst,row_obj.price);
    this.dataSource.push(newItem);
    this.updateTotalAmt();
    this.price_in_words(this.total_amt);
    this.table.renderRows();
    
  }

  updateTotalAmt(){

     this.total_amt = 0;
     this.dataSource.forEach(x  => {
       this.total_amt = this.total_amt + x.total_amt;
     });

     this.total_amt = Math.round(this.total_amt);
  }

  updateRowData(row_obj:InvoiceItem){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.no == row_obj.no){
           return true;
      }
      return false;
    });
    this.dataSource.push(row_obj);
    this.updateTotalAmt();
    this.price_in_words(this.total_amt);
    this.table.renderRows();

  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter(obj => obj.no !== row_obj.no);
  }

  refresh() {
    this.dataSource = this.loaded_data;
  }


  changeEvent(event){
    
    this.invoiceSummary.invoiceDate = event.value;
  }

  submit() {
     
     console.log(this.invoiceSummary);
     console.log(this.dataSource);

  }

  
  price_in_words(price) {
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
      dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
      tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
      handle_tens = function(dgt, prevDgt) {
        return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
      },
      handle_utlc = function(dgt, nxtDgt, denom) {
        return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
      };
  
    var str = "",
      digitIdx = 0,
      digit = 0,
      nxtDigit = 0,
      words = [];
    if (price += "", isNaN(parseInt(price))) str = "";
    else if (parseInt(price) > 0 && price.length <= 10) {
      for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "Thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "Lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "Crore"));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
      }
      str = words.reverse().join("")
    } else str = "";

    this.priceWords = str;
  
  }

}
