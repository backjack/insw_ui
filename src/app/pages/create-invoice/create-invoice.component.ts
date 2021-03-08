import { Component, OnInit, ViewChild,Inject,Injector, Input } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../core/dialog-box/dialog-box.component';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {InvoiceItem, InvoiceSummary,Invoice} from '../../models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {InvoiceService} from '../../services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  displayedColumns: string[] = ['no', 'description', 'price', 'qty','non_tax','igst','cgst','sgst','tax_amt','total_amt','action'];
  loaded_data : InvoiceItem[] = [];
  original_data : InvoiceItem[] = [];
  dataSource: InvoiceItem[] = [];
  finalDataSource: InvoiceItem[] = [];
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  total_amt:number =0;
  priceWords:string;
  update:boolean = false;
  client_option:any[] = [];
  invoiceSummary:InvoiceSummary;

  fyyear:string;
  
  
  

    private dialogRef = null;
    private dialogData;
    constructor(public dialog: MatDialog,private injector: Injector,private invoiceService:InvoiceService,
      private _Activatedroute:ActivatedRoute,private _snackBar: MatSnackBar) {
        this.dialogRef = this.injector.get(MatDialogRef, null);
        this.dialogData = this.injector.get(MAT_DIALOG_DATA, null);
        this.fyyear = this._Activatedroute.snapshot.queryParamMap.get("fyear");

    

        if(this.dialogData != null) {

          this.invoiceSummary = this.dialogData.row;
          console.log(this.invoiceSummary);
          this.update = this.dialogData.update;

         
     
          this.invoiceService.getInvoiceItems(this.dialogData.row.fyear,
            this.dialogData.row.invoiceId).subscribe(x=>{
            
              let items = Array<InvoiceItem>();
              let counter =1;
              x.forEach( y =>{

                let item = new InvoiceItem(y.itemName,counter,y.qty,y.sgst,y.igst,y.cgst,y.price); 
                 counter = counter +1;
                items.push(item);
              })

            this.loaded_data = items;
            this.dataSource = items;
            this.original_data = items;
            this.updateTotalAmt();
            this.price_in_words(this.total_amt);
          })
        } else {

          this.invoiceSummary = new InvoiceSummary();
          this.invoiceSummary.fyear =  +this.fyyear;
          console.log("!!!!!!!!!!!!!!"+this.fyyear);
          
          this.invoiceService.fyearSource$.subscribe(x =>{
            console.log("#%%%%%%%%%%%%%%%%%%%%%%%%%%" + x);
            this.invoiceSummary.fyear = +x;
          })

          
        }


    }

  ngOnInit(): void {

    this.invoiceService.getClients().subscribe(x =>{
 
      this.client_option =x;
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
     
    let item = new InvoiceItem(row_obj.itemName,row_obj.no,row_obj.qty,row_obj.sgst,row_obj.igst,row_obj.cgst,row_obj.price);
    
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

        console.log("################@@@@edit");
         this.updateRowData(result);
      }
    });
  }

  updateTotalAmt(){

    this.total_amt = 0;
    this.dataSource.filter(x=> x.isActive =="Y").forEach(x  => {
      this.total_amt = this.total_amt + x.total_amt;
    });

    this.total_amt = Math.round(this.total_amt);
 }


  addRowData(row_obj:InvoiceItem,no:number){
    console.log(no);
    let newItem = new InvoiceItem(row_obj.itemName,no,row_obj.qty,row_obj.sgst,row_obj.igst,row_obj.cgst,row_obj.price);
    this.loaded_data.push(newItem);
    this.dataSource = this.loaded_data.filter(val=>{

      if(val.isActive=="Y") {
        return  true;
      }
      return false;
   });
    this.updateTotalAmt();
    this.price_in_words(this.total_amt);
    this.table.renderRows();
  }

 

  updateRowData(row_obj:InvoiceItem){
   
    this.loaded_data.forEach((x,index )=>{

      if(x.no == row_obj.no){
         x.isActive="N";
         return;
        }
    });
    this.loaded_data.push(row_obj);
    this.dataSource = this.loaded_data.filter(val=>{

       if(val.isActive=="Y") {
         return  true;
       }
       return false;
    });
    this.updateTotalAmt();
    this.price_in_words(this.total_amt);
    this.table.renderRows();

  }

  deleteRowData(row_obj){
   this.loaded_data.forEach((x,index )=>{

      if(x.no == row_obj.no){
         x.isActive="N";
         return;
        }
    });

    this.dataSource = this.loaded_data.filter(val=>{

      if(val.isActive=="Y") {
        return  true;
      }
      return false;
   });

    this.updateTotalAmt();
    this.price_in_words(this.total_amt);
    this.table.renderRows();
  }

  refresh() {
    this.dataSource = this.original_data;
  }


  changeEvent(event){
    this.invoiceSummary.invoiceDate = event.value;
  }

  submit() {
    
    const invoice: Invoice = {
      invoiceSummary:this.invoiceSummary,
      invoiceItems:this.loaded_data
   };

   invoice.invoiceSummary.totalAmount  = this.total_amt;
    

     this.invoiceService.saveInvoice(invoice).subscribe(data=> {

      this._snackBar.open(data['success'],"Saved", {
        duration: 2000,
      });
        
     });

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
