package com.nts.insw.repo;

import com.nts.insw.dao.Client;
import com.sun.xml.internal.bind.v2.model.core.ID;
import org.springframework.data.repository.CrudRepository;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;


public interface ClientRepo extends CrudRepository<Client, String> {

  Optional<Client> findById(String clientId);

  List<Client> findAll();


}
