package com.nts.insw.dao;


import javax.persistence.*;
import java.util.Date;

@Entity(name="client")
public class Client {

  public Integer getClientId() {
    return clientId;
  }

  public void setClientId(Integer clientId) {
    this.clientId = clientId;
  }

  public String getClientName() {
    return clientName;
  }

  public void setClientName(String clientName) {
    this.clientName = clientName;
  }

  public String getClientShortName() {
    return clientShortName;
  }

  public void setClientShortName(String clientShortName) {
    this.clientShortName = clientShortName;
  }

  public String getClientAddress() {
    return clientAddress;
  }

  public void setClientAddress(String clientAddress) {
    this.clientAddress = clientAddress;
  }

  public String getClientTelno() {
    return clientTelno;
  }

  public void setClientTelno(String clientTelno) {
    this.clientTelno = clientTelno;
  }

  public String getQuotationNo() {
    return quotationNo;
  }

  public void setQuotationNo(String quotationNo) {
    this.quotationNo = quotationNo;
  }

  public String getIsActive() {
    return isActive;
  }

  public void setIsActive(String isActive) {
    this.isActive = isActive;
  }

  public String getAdminId() {
    return adminId;
  }

  public void setAdminId(String adminId) {
    this.adminId = adminId;
  }

  public Date getAddedOn() {
    return addedOn;
  }

  public void setAddedOn(Date addedOn) {
    this.addedOn = addedOn;
  }

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="clientId")
  private Integer clientId;

  @Column(name="clientName")
  private String clientName;

  @Column(name="clientShortName")
  private String clientShortName;

  @Column(name="clientAddress")
  private String clientAddress;


  @Column(name="clientTelno")
  private String clientTelno;

  @Column(name="quotationNo")
  private String quotationNo;

  @Column(name="isActive")
  private String isActive;


  @Column(name="adminId")
  private String adminId;

  @Column(name="addedOn")
  private Date addedOn;
}
