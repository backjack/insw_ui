package com.nts.insw.controller;


import com.nts.insw.dao.InvoiceItem;
import com.nts.insw.dao.InvoiceSummary;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/insw")
public class DashboardController {


  @GetMapping("/fy/current")
  public int getCurrentYear() {

    Calendar cal = Calendar.getInstance();

    int year = cal.get(Calendar.YEAR);

    int month = cal.get(Calendar.MONTH);
    if(month >= 0 && month <= 2) {
      year = year-1;
    }

    return year;
  }

  @GetMapping("/invoice/summary")
  public List<InvoiceSummary> getinvoiceSummary(@RequestParam("fyear") int fyear){

    List<InvoiceSummary> invoiceSummaryList = new ArrayList<>();


    InvoiceSummary invoiceSummary = new InvoiceSummary();

    if(fyear == 2020) {
      invoiceSummary.setFyear(2020);
      invoiceSummary.setClientId("123");
      invoiceSummary.setClientName("ABp Shipping Ltd");
      invoiceSummary.setInvoiceDate(new Date());
      invoiceSummary.setInvoiceId("110");
      invoiceSummary.setQuotationNo("1233");
      invoiceSummary.setTotalAmount(240000);
    }else {
      invoiceSummary.setFyear(fyear);
      invoiceSummary.setClientId("200");
      invoiceSummary.setClientName("Facebook Ltd");
      invoiceSummary.setInvoiceDate(new Date());
      invoiceSummary.setInvoiceId("234");
      invoiceSummary.setQuotationNo("145");
      invoiceSummary.setTotalAmount(56780);
    }

    invoiceSummaryList.add(invoiceSummary);

    return invoiceSummaryList;
  }

  @GetMapping("/clients")
  public Map<Integer,String> getClients() {

    Map<Integer,String> clients = new HashMap<>();
    clients.put(123,"ABp Shipping Ltd");
    clients.put(100,"Google Ltd");
    clients.put(200,"Facebook Ltd");
    return clients;
  }

  @GetMapping("/invoice/items")
  public List<InvoiceItem>  getInvoiceItems(@RequestParam("fyear") int fyear,
                                            @RequestParam("invoiceId") String invoiceId) {

    List<InvoiceItem> items = new ArrayList<>();

    InvoiceItem item1= new InvoiceItem();
    item1.setFyear(fyear);
    item1.setInvoiceId(invoiceId);
    item1.setItemid(123);
    item1.setName("TugBoat");
    item1.setPrice(20999);
    item1.setSgst(18);
    item1.setQty(20);
    items.add(item1);

    return items;
  }


}
