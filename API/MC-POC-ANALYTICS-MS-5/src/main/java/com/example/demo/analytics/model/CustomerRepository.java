package com.example.demo.analytics.model;

import org.springframework.data.repository.CrudRepository;


public interface CustomerRepository extends CrudRepository<Customer, Integer> {

	public Customer getCustomerBycustid(String custid);
}
