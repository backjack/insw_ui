package com.nts.insw.dao;

import java.io.Serializable;

public class InvoiceItemId implements Serializable {

  private int invoiceId;

  private int fyear;

  private String itemName;

  @Override
  public String toString() {
    return "InvoiceItemId{" +
      "invoiceid='" + invoiceId + '\'' +
      ", fyear=" + fyear +
      ", itemName='" + itemName + '\'' +
      '}';
  }

  public int getInvoiceId() {
    return invoiceId;
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

  public String getItemName() {
    return itemName;
  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }

  public InvoiceItemId(int invoiceId, int fyear) {
    this.invoiceId = invoiceId;
    this.fyear = fyear;

  }

  public InvoiceItemId(){}
}
