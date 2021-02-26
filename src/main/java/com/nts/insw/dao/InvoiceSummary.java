package com.nts.insw.dao;

import java.util.Date;

public class InvoiceSummary {

  private String invoiceId;

  private String clientId;

  private String clientName;

  private String quotationNo;

  private Date invoiceDate;

  private Date referenceDate;

  private int fyear;

  private double totalAmount;

  public String getInvoiceId() {
    return invoiceId;
  }

  public void setInvoiceId(String invoiceId) {
    this.invoiceId = invoiceId;
  }

  public String getClientId() {
    return clientId;
  }

  public void setClientId(String clientId) {
    this.clientId = clientId;
  }

  public String getClientName() {
    return clientName;
  }

  public void setClientName(String clientName) {
    this.clientName = clientName;
  }

  public String getQuotationNo() {
    return quotationNo;
  }

  public void setQuotationNo(String quotationNo) {
    this.quotationNo = quotationNo;
  }

  public Date getInvoiceDate() {
    return invoiceDate;
  }

  public void setInvoiceDate(Date invoiceDate) {
    this.invoiceDate = invoiceDate;
  }

  public Date getReferenceDate() {
    return referenceDate;
  }

  public void setReferenceDate(Date referenceDate) {
    this.referenceDate = referenceDate;
  }

  public int getFyear() {
    return fyear;
  }

  public void setFyear(int fyear) {
    this.fyear = fyear;
  }

  public double getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(double totalAmount) {
    this.totalAmount = totalAmount;
  }
}
