package com.example.demo.dummydata.model;


import org.springframework.data.repository.CrudRepository;

/**
 * @author Wipro
 *
 */
public interface AccountRepos extends CrudRepository<Account, Integer> {
	
	// public List<Account> findByAccountnumber(String accountnumber);
	public Account findByAccountnumber(String accountnumber);

}
