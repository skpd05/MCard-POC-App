package com.example.demo.dummydata.model;


import org.springframework.data.repository.CrudRepository;



public interface CustomerRepo extends CrudRepository<Customer, Integer> {

	public Customer getCustomerBycustid(String custid);
}
