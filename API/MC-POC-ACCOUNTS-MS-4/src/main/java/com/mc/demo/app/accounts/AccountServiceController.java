package com.mc.demo.app.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mc.demo.app.accounts.exception.BadRequestException;
import com.mc.demo.app.accounts.service.AccountService;

@RestController
@RequestMapping(value = "/api/v1/")
public class AccountServiceController {

	@Autowired
	private AccountService acccountService;

	@RequestMapping(value = "/creditcard/customer/{cardnumber}/accountsummary", method = RequestMethod.GET)
	public ResponseEntity<AccountSummary> getAccountSummary(
			@PathVariable(value = "cardnumber", required = true) String cardNumber,
			@RequestHeader(name = "uuid", required = false) String uuid,
			@RequestHeader(name = "client_id", required = false) String clientId,
			@RequestHeader(name = "Accept", required = false) String accept) {

		if (!(cardNumber.length() >= 16)) {
			throw new BadRequestException("card number is allowed only with more than 16 digits");
		}
		AccountSummary accSummary = acccountService.getAccountSummary(cardNumber);
		return new ResponseEntity<AccountSummary>(accSummary, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/creditcard/customer/adjustpoints", method = RequestMethod.POST)
	public String adjustPoints(@RequestBody @Validated Points points )
	{
		if(acccountService.adjustPoints(points))
		{
			return "successful";
		}
		
		return "unsuccessful";
	}
}
