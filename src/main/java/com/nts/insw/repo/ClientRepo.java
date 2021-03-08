package com.nts.insw.repo;

import com.nts.insw.dao.Client;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


public interface ClientRepo extends CrudRepository<Client, String> {

  Optional<Client> findById(String clientId);

  List<Client> findAll();


}
