package com.nts.insw.repo;

import com.nts.insw.dao.InvoiceId;
import com.nts.insw.dao.InvoiceSummary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface InvoiceSummaryRepo extends CrudRepository<InvoiceSummary, InvoiceId> {



  List<InvoiceSummary> findInvoiceSummaryByfyear(int fyear);

  InvoiceSummary findInvoiceSummaryByfyearAndInvoiceId(int fyear, int invoiceId);

  InvoiceSummary save(InvoiceSummary invoiceSummary);

  @Query(value = "SELECT max(invoiceId) FROM InvoiceSummary where fyear=?1")
  Integer getMaxInvoiceid(int fyear);

  @Override
  void delete(InvoiceSummary invoiceItem);
}
