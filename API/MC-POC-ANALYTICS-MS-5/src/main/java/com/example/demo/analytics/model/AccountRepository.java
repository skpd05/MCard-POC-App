package com.example.demo.analytics.model;


import java.util.List;

import org.springframework.data.repository.CrudRepository;

/**
 * @author Wipro
 *
 */
public interface AccountRepository extends CrudRepository<Account, Integer> {
	
	public List<Account> findByCustid(String custid);
	
	public Account findByAccountnumber(String accountnumber);

}
