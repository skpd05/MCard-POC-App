package com.example.demo.dummydata.model;



import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CardtransactionRepo extends CrudRepository<Cardtransaction, Integer> {

	public List<Cardtransaction> findTransactionByAccountnumber(String accountnumber);
}