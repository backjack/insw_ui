package com.nts.insw.dao;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="invoice_item")
@IdClass(InvoiceItemId.class)
public class InvoiceItem {



  public int getInvoiceId() {
    return invoiceId;
  }

  @Override
  public String toString() {
    return "InvoiceItem{" +
      "invoiceId=" + invoiceId +
      ", fyear=" + fyear +
      ", itemId=" + itemId +
      ", itemName='" + itemName + '\'' +
      ", qty=" + qty +
      ", sgst=" + sgst +
      ", cgst=" + cgst +
      ", igst=" + igst +
      ", price=" + price +
      '}';
  }

  public void setInvoiceId(int invoiceId) {
    this.invoiceId = invoiceId;
  }

  public int getFyear() {
    return fyear;
  }

  public void setFyear(int fyear) {
    this.fyear = fyear;
  }


  @Id
  @Column(name="invoiceId")
  public int invoiceId;

  @Id
  @Column(name="fyear")
  public int fyear;


  @Column(name="itemId")
  public long itemId;

  public String getItemName() {
    return itemName;
  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }

  @Id
  @Column(name="itemName")
  public String itemName;

  @Column(name="qty")
  public int qty;

  @Column(name="sgst")
  public Double sgst;

  @Column(name="cgst")
  public Double cgst;

  public long getItemId() {
    return itemId;
  }

  public void setItemId(long itemId) {
    this.itemId = itemId;
  }


  public int getQty() {
    return qty;
  }

  public void setQty(int qty) {
    this.qty = qty;
  }

  public Double getSgst() {
    return sgst;
  }

  public void setSgst(Double sgst) {
    this.sgst = sgst;
  }

  public Double getCgst() {
    return cgst;
  }

  public void setCgst(Double cgst) {
    this.cgst = cgst;
  }

  public Double getIgst() {
    return igst;
  }

  public void setIgst(Double igst) {
    this.igst = igst;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  @Column(name="igst")
  public Double igst;

  @Column(name="price")
  public double price;


  @Transient
  public String isActive;

  @Column(name="updatedOn")
  public Date updatedOn;
}
