package com.nts.insw.dao;

import java.util.List;

public class Invoice {

  private InvoiceSummary invoiceSummary;

  private List<InvoiceItem> invoiceItems;

  public InvoiceSummary getInvoiceSummary() {
    return invoiceSummary;
  }

  public void setInvoiceSummary(InvoiceSummary invoiceSummary) {
    this.invoiceSummary = invoiceSummary;
  }

  public List<InvoiceItem> getInvoiceItems() {
    return invoiceItems;
  }

  public void setInvoiceItems(List<InvoiceItem> invoiceItems) {
    this.invoiceItems = invoiceItems;
  }

  @Override
  public String toString() {
    return "Invoice{" +
      "invoiceSummary=" + invoiceSummary +
      ", invoiceItems=" + invoiceItems +
      '}';
  }
}
