package com.nts.insw.dao;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="invoice")
@IdClass(InvoiceId.class)
public class InvoiceSummary {


  @Id
  @Column(name="invoiceId")
  private int invoiceId;


  @Id
  @Column(name="clientId")
  private int clientId;

  @Transient
  private String ClientName;

  public String getClientName() {
    return ClientName;
  }

  public void setClientName(String clientName) {
    ClientName = clientName;
  }

  @Column(name="quotationNo")
  private String quotationNo;

  @Column(name="invoiceDate")
  private Date invoiceDate;

  @Column(name="referenceDate")
  private Date referenceDate;

  @Column(name="fyear")
  private int fyear;

  @Column(name="totalAmount")
  private Double totalAmount;

  public int getInvoiceId() {
    return invoiceId;
  }

  public void setInvoiceId(int invoiceId) {
    this.invoiceId = invoiceId;
  }

  public int getClientId() {
    return clientId;
  }

  public void setClientId(int clientId) {
    this.clientId = clientId;
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

  public Double getTotalAmount() {
    return totalAmount;
  }

  public void setTotalAmount(Double totalAmount) {
    this.totalAmount = totalAmount;
  }

  @Override
  public String toString() {
    return "InvoiceSummary{" +
      "invoiceId='" + invoiceId + '\'' +
      ", clientId=" + clientId +
      ", quotationNo='" + quotationNo + '\'' +
      ", invoiceDate=" + invoiceDate +
      ", referenceDate=" + referenceDate +
      ", fyear=" + fyear +
      ", totalAmount=" + totalAmount +
      '}';
  }
}
