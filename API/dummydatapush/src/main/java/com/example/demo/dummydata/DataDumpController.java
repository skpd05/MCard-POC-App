package com.example.demo.dummydata;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dummydata.model.AccHoldrRhRepr;
import com.example.demo.dummydata.model.Accholderrh;
import com.example.demo.dummydata.model.Account;
import com.example.demo.dummydata.model.AccountRepos;
import com.example.demo.dummydata.model.Cardtransaction;
import com.example.demo.dummydata.model.CardtransactionRepo;
import com.example.demo.dummydata.model.Custaccountreference;
import com.example.demo.dummydata.model.Customer;
import com.example.demo.dummydata.model.CustomerRepo;
import com.example.demo.dummydata.model.CustomeraccountRefRepos;
import com.example.demo.dummydata.model.HHroleRepo;
import com.example.demo.dummydata.model.Hhrole;
import com.example.demo.dummydata.model.RedemptionRepos;
import com.example.demo.dummydata.model.Redemptiontransaction;
import com.example.demo.dummydata.model.UserRepo;
import com.example.demo.dummydata.model.Userprofile;

import com.fasterxml.jackson.databind.ObjectMapper;



@RestController
@RequestMapping("/api/v1/dump/")
public class DataDumpController {

	@Autowired
	AccountRepos accRepo;

	@Autowired
	CustomerRepo custRepo;

	@Autowired
	CardtransactionRepo cardtransRepo;

	@Autowired
	RedemptionRepos redeemRepo;

	@Autowired
	CustomeraccountRefRepos custAccRepo;

	@Autowired
	UserRepo userrepo;
	
	@Autowired
	AccHoldrRhRepr acchodlerrhRepo; 
	
	@Autowired
	HHroleRepo hhrolerepo;

	@RequestMapping(value = "/saveaccount", method = RequestMethod.POST)
	public void saveAccount(@RequestBody Account account) {
		try {
			account.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			account.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			accRepo.save(account);
		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getallaccounts", method = RequestMethod.GET)
	public ResponseEntity<List<Account>> getAllAccounts() {
		List<Account> accounts = (List<Account>) accRepo.findAll();
		return new ResponseEntity<List<Account>>(accounts, HttpStatus.OK);
	}

	@RequestMapping(value = "/savecustomer", method = RequestMethod.POST)
	public void saveCustomer(@RequestBody Customer customer) {
		try {
			customer.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			customer.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			custRepo.save(customer);
		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getallcustomers", method = RequestMethod.GET)
	public ResponseEntity<List<Customer>> getAllCustomers() {
		List<Customer> customer = (List<Customer>) custRepo.findAll();
		return new ResponseEntity<List<Customer>>(customer, HttpStatus.OK);
	}

	@RequestMapping(value = "/savecardtransaction", method = RequestMethod.POST)
	public void saveCardTransaction(@RequestBody Cardtransaction cardTransaction) {
		try {
			cardTransaction.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			cardTransaction.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			cardtransRepo.save(cardTransaction);
		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}

	@RequestMapping(value = "/getallcardtrans", method = RequestMethod.GET)
	public ResponseEntity<List<Cardtransaction>> getAllCardTrans() {
		List<Cardtransaction> customer = (List<Cardtransaction>) cardtransRepo.findAll();
		return new ResponseEntity<List<Cardtransaction>>(customer, HttpStatus.OK);
	}

	@RequestMapping(value = "/sacecustaccReference", method = RequestMethod.POST)
	public void saveCustAccReference(@RequestBody Custaccountreference customerAccRef) {

		try {
			customerAccRef.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			customerAccRef.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			custAccRepo.save(customerAccRef);
		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getallcustaccRef", method = RequestMethod.GET)
	public ResponseEntity<List<Custaccountreference>> getAllCustAccRef() {
		List<Custaccountreference> customerAccR = (List<Custaccountreference>) custAccRepo.findAll();
		return new ResponseEntity<List<Custaccountreference>>(customerAccR, HttpStatus.OK);
	}

	@RequestMapping(value = "/saveredemptiontrans", method = RequestMethod.POST)
	public void saveRedemptiomTrans(@RequestBody Redemptiontransaction redeem) {

		try {
			redeem.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			redeem.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			redeemRepo.save(redeem);
		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getallredeemtrans", method = RequestMethod.GET)
	public ResponseEntity<List<Redemptiontransaction>> getAllRedemTrans() {
		List<Redemptiontransaction> redeemlist = (List<Redemptiontransaction>) redeemRepo.findAll();
		return new ResponseEntity<List<Redemptiontransaction>>(redeemlist, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/saveaccholderrh", method = RequestMethod.POST)
	public void saveAccHolderRh(@RequestBody Accholderrh accholderrh) {

		try {
			accholderrh.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			accholderrh.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			acchodlerrhRepo.save(accholderrh);
		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getallaccholderrh", method = RequestMethod.GET)
	public ResponseEntity<List<Accholderrh>> getAllAccholderrh() {
		List<Accholderrh> accholderrh = (List<Accholderrh>) acchodlerrhRepo.findAll();
		return new ResponseEntity<List<Accholderrh>>(accholderrh, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/saveuserprofile", method = RequestMethod.POST)
	public void saveUserProfile(@RequestBody Userprofile user) {

		try {
			user.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			user.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			userrepo.save(user);
		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getallprofiles", method = RequestMethod.GET)
	public ResponseEntity<List<Userprofile>> getAllProfiles() {
		List<Userprofile> users = (List<Userprofile>) userrepo.findAll();
		return new ResponseEntity<List<Userprofile>>(users, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/savehhrole", method = RequestMethod.POST)
	public void saveHHrole(@RequestBody Hhrole hhrole) {

		try {
			hhrole.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			hhrole.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			hhrolerepo.save(hhrole);
		} catch (Exception exc) {
			exc.printStackTrace();
		}

	}
	
	@RequestMapping(value = "/getallhhroles", method = RequestMethod.GET)
	public ResponseEntity<List<Hhrole>> getAllHhrole() {
		List<Hhrole> hhrole = (List<Hhrole>) hhrolerepo.findAll();
		return new ResponseEntity<List<Hhrole>>(hhrole, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/createdb/{key}", method = RequestMethod.GET)
	public String createDB(@PathVariable String key) {
		ObjectMapper objMapper = new ObjectMapper();

//		String strCust1 = " {  \"addressline1\": \"First Cross Street\",  \"addressline2\": \"Abraham Street\",  \"bankcustomernumber\": \"5461237890123456000\", \"city\": \"NewYork\",  \"custid\": \"6541230\",  \"dob\": \"2002-10-02\",  \"firstname\": \"John\",  \"ica_code\": \"6542\", \"lastname\": \"Nickolson\",  \"mmn\": \"1234\",  \"previous_bcn\": \"5987643210123456000\",  \"ssn\": \"4534\",  \"state\": \"Philedelhpia\", \"sys_cust_id\": \"903490148109491\",  \"zipcode\": \"654321\"  } ";
//		try {
//			Customer cust1 = objMapper.readValue(strCust1, Customer.class);
//			custRepo.save(cust1);
//		} catch (Exception e) {
//		}

		return "";

	}
}
