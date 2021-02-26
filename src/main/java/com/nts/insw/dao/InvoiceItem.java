package com.nts.insw.dao;

public class InvoiceItem {

//  public name: string;
//  no?:number;
//  qty?: number;
//  sgst?:number;
//  igst?:number;
//  cgst?:number;
//  price?:number;

  public String getInvoiceId() {
    return invoiceId;
  }

  public void setInvoiceId(String invoiceId) {
    this.invoiceId = invoiceId;
  }

  public int getFyear() {
    return fyear;
  }

  public void setFyear(int fyear) {
    this.fyear = fyear;
  }

  public String invoiceId;


  public int fyear;

  public long itemid;

  public String name;

  public int qty;

  public double sgst;

  public double cgst;

  public long getItemid() {
    return itemid;
  }

  public void setItemid(long itemid) {
    this.itemid = itemid;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getQty() {
    return qty;
  }

  public void setQty(int qty) {
    this.qty = qty;
  }

  public double getSgst() {
    return sgst;
  }

  public void setSgst(double sgst) {
    this.sgst = sgst;
  }

  public double getCgst() {
    return cgst;
  }

  public void setCgst(double cgst) {
    this.cgst = cgst;
  }

  public double getIgst() {
    return igst;
  }

  public void setIgst(double igst) {
    this.igst = igst;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public double igst;

  public double price;

}
