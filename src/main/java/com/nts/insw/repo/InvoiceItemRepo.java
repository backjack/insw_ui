package com.nts.insw.repo;

import com.nts.insw.dao.InvoiceItem;
import com.nts.insw.dao.InvoiceItemId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface InvoiceItemRepo extends CrudRepository<InvoiceItem, InvoiceItemId> {

  List<InvoiceItem> findInvoiceItemsByfyearAndInvoiceId(int fyear,int invoiceId);

  InvoiceItem save(InvoiceItem invoiceItem);

  @Override
  void delete(InvoiceItem invoiceItem);
}
