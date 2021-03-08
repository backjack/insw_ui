package com.nts.insw.dao;

import java.io.Serializable;

public class InvoiceId implements Serializable {
  private int invoiceId;
  private int fyear;

  // default constructor

  public InvoiceId(int invoiceId, int fyear) {
    this.invoiceId = invoiceId;
    this.fyear = fyear;
  }

  public InvoiceId() {

  }

  // getters, equals() and hashCode() methods
}
