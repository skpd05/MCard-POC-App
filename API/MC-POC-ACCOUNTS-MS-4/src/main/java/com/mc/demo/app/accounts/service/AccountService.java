package com.mc.demo.app.accounts.service;

import com.mc.demo.app.accounts.AccountSummary;
import com.mc.demo.app.accounts.Points;

public interface AccountService {
	
	public AccountSummary getAccountSummary(String cardnumber);
	
	public boolean adjustPoints(Points points);

}
