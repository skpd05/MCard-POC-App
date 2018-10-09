package com.example.demo.analytics;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.analytics.service.AnalyticsService;
import com.example.demo.analytics.service.CustomerProfile;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsMockController {

	@Autowired
	AnalyticsService analyticsService;

	@GetMapping("/analyzetransaction")
	public ResponseEntity<List<CustomerProfile>> analyzeTransaction() {
		return new ResponseEntity<>(analyticsService.getAllCustomerProfiles(), HttpStatus.OK);
	}

	@GetMapping("/analyzeMergetransaction")
	public ResponseEntity<List<CustomerProfile>> analyzeConsolidatedTransaction() {
		List<CustomerProfile> custProfileList = analyticsService.getAllCustomerProfiles();
		custProfileList.forEach(custProfile -> {
			custProfile.mergeProfile();
		});
		return new ResponseEntity<>(custProfileList, HttpStatus.OK);
	}

	@GetMapping("/analyzetransaction/{custid}")
	public ResponseEntity<CustomerProfile> analyzeMyTransaction(@PathVariable String custid) {
		return new ResponseEntity<>(analyticsService.getCustomerProfile(custid), HttpStatus.OK);
	}

	@GetMapping("/analyzeMergetransaction/{custid}")
	public ResponseEntity<CustomerProfile> analyzeMyConsolidatedTransaction(@PathVariable String custid) {
		CustomerProfile custProfile = analyticsService.getCustomerProfile(custid);
		custProfile.mergeProfile();
		return new ResponseEntity<>(custProfile, HttpStatus.OK);
	}

}
