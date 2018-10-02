package com.example.demo.dummydata.model;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface RedemptionRepos extends CrudRepository<Redemptiontransaction, Integer> {
	
	public List<Redemptiontransaction> findRedeemHistoryByCustid(String custid);
	
	public List<Redemptiontransaction> findRedeemHistoryByAccountnumber(String accountnumber);
}
