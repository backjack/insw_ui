

export interface Item {

 name?: string,
 qty?: number,
 sgst?:number,
 igst?:number,
 cgst?:number,
 price?:number,
//  readonly  non_tax_amt?:number,
//  readonly  tax_amt?:number,
//  readonly  total_amt?:number

}


export class InvoiceSummary {

   fyear:number;
   invoiceId:string;
   clientId:string;
   clientName?:string;
   totalAmount:number;
   invoiceDate:Date;
   quotationNo?:string;
   referenceNo?:string;

//    constructor(init: InvoiceSummary) {
//     this.invoiceDate = this.parseDate(init.invoiceDate);
//   }

//    parseDate(str: string | Date): Date {
//     if (str !== undefined && str !== null) {
//       return new Date(str);
//     }
//     return undefined;
//   }

}


export interface Invoice {

    invoiceSummary:InvoiceSummary;
    invoiceItems:InvoiceItem[];
}


export class InvoiceItem implements Item {

   
    public name: string;
    no?:number;
    qty?: number;
    sgst?:number;
    igst?:number;
    cgst?:number;
    price?:number;

    constructor(name:string,no:number,qty:number,sgst:number,igst:number,cgst:number,price:number) {
         
        this.name = name;
        this.no = no;
        this.qty = qty;
        this.sgst = sgst;
        this.igst = igst;
        this.cgst = cgst;
        this.price = price;
    }

    public get non_tax_amt(): number { // read-only property with getter function (this is not the same thing as a “function-property”)
        return this.qty  * this.price;
    }

    get tax_amt(): number { // read-only property with getter function (this is not the same thing as a “function-property”)
        return (this.igst +this.cgst+this.sgst) * this.non_tax_amt /100;
    }

    get total_amt(): number { // read-only property with getter function (this is not the same thing as a “function-property”)
        return this.non_tax_amt + this. tax_amt;
    }

}