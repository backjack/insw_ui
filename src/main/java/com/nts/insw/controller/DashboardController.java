package com.nts.insw.controller;


import com.nts.insw.dao.*;
import com.nts.insw.repo.ClientRepo;
import com.nts.insw.repo.InvoiceItemRepo;
import com.nts.insw.repo.InvoiceSummaryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/insw")
public class DashboardController {

  @Autowired
  private ClientRepo clientRepo;

  @Autowired
  private InvoiceSummaryRepo invoiceSummaryRepo;

  @Autowired
  private InvoiceItemRepo invoiceItemRepo;

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

    List<InvoiceSummary> invoices = invoiceSummaryRepo.findInvoiceSummaryByfyear(fyear);
     List<Client> clientList = clientRepo.findAll();

    Comparator<InvoiceSummary>  comp = new Comparator<InvoiceSummary>() {
      @Override
      public int compare(InvoiceSummary o1, InvoiceSummary o2) {
        return Integer.compare(o1.getInvoiceId(), o2.getInvoiceId());
      }
    };

    invoices = invoices.stream().sorted(comp.reversed()).collect(Collectors.toList());

    invoices.forEach(x->{

      Client client = clientList.stream().filter(c -> c.getClientId().equals(x.getClientId())).findFirst().get();
      x.setClientName(client.getClientName());

    });


    return invoices;
  }

  @GetMapping("/clients")
  public List<Select> getClients() {

       List<Select> selectList = new ArrayList<>();
       List<Client> clients = clientRepo.findAll();

       clients.forEach(x->{

         selectList.add(new Select<Integer,String>(x.getClientId(),x.getClientShortName()));
         });


      return selectList;
  }

  @GetMapping("/invoice/items")
  public List<InvoiceItem>  getInvoiceItems(@RequestParam("fyear") int fyear,
                                            @RequestParam("invoiceId") int invoiceId) {

    List<InvoiceItem> items = invoiceItemRepo.findInvoiceItemsByfyearAndInvoiceId(fyear,invoiceId);

    return items;
  }


  @GetMapping("/invoice/delete")
  @Transactional
  public String deleteInvoice(@RequestParam("fyear") int fyear,
                              @RequestParam("invoiceId") int invoiceId) {

    List<InvoiceItem> items = invoiceItemRepo.findInvoiceItemsByfyearAndInvoiceId(fyear,invoiceId);

    items.forEach(x->{
      invoiceItemRepo.delete(x);
    });

    InvoiceSummary summary = invoiceSummaryRepo.findInvoiceSummaryByfyearAndInvoiceId(fyear,invoiceId);
    invoiceSummaryRepo.delete(summary);

    return "success";
  }

  @PostMapping("/invoice/save")
  @Transactional
  public Map<String,String>  saveInvoice(@RequestBody Invoice invoice) {


    Integer invoiceId = invoice.getInvoiceSummary().getInvoiceId();
    System.out.println(invoice);
    System.out.printf("hlllllllllllllllll");
    if(invoiceId == null || invoiceId <=0) {

      final int fyear = invoice.getInvoiceSummary().getFyear();
      Integer val =invoiceSummaryRepo.getMaxInvoiceid(fyear);

      val = val == null? 0:val;
      final int newId = val+1;
      System.out.printf("invoice new "+newId);

      invoice.getInvoiceSummary().setInvoiceId(newId);
      invoiceSummaryRepo.save(invoice.getInvoiceSummary());

      invoice.getInvoiceItems().forEach( item ->{
         item.setInvoiceId(newId);
         item.setFyear(fyear);
        invoiceItemRepo.save(item);
      });

    } else {

      final int fyear = invoice.getInvoiceSummary().getFyear();
      invoiceSummaryRepo.save(invoice.getInvoiceSummary());


      List<InvoiceItem> newItems = new ArrayList<>();
      invoice.getInvoiceItems().forEach( item ->{
        item.setInvoiceId(invoiceId);
        item.setFyear(fyear);
        if(item.isActive.equals("N")) {
          invoiceItemRepo.delete(item);
        } else {
          newItems.add(item);

        }
      });

      newItems.stream().forEach( item ->{
        invoiceItemRepo.save(item);
      });



    }

    Map<String,String> response = new HashMap<>();
    response.put("success","Data saved successfully");
    return response;
  }


}
