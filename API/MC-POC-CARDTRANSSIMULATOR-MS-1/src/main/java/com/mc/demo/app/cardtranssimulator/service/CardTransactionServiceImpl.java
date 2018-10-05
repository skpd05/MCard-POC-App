package com.mc.demo.app.cardtranssimulator.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mc.demo.app.cardtranssimulator.CreditCardTransaction;
import com.mc.demo.app.cardtranssimulator.Points;
import com.mc.demo.app.cardtranssimulator.exception.ApplicationException;
import com.mc.demo.app.cardtranssimulator.model.CardTransacRepository;
import com.mc.demo.app.cardtranssimulator.model.Cardtransaction;


@Service("transService")
public class CardTransactionServiceImpl implements CardTransactionService {

	@Autowired
	CardTransacRepository transRepo;


	@Override
	public boolean saveTransaction(CreditCardTransaction cardTrans) {
		try {
			Cardtransaction transObj = new Cardtransaction();
			Random r = new Random();
			int inR = r.nextInt((9999999 - 2000000) + 1) + 2000000;
			transObj.setTransactionid(String.valueOf(inR));
			transObj.setAccountnumber(cardTrans.getCreditCardNumber());
			transObj.setMerchantname(cardTrans.getMerchantName());
			transObj.setMerchantid(cardTrans.getMerchantId());
			String transAmount = cardTrans.getTransactionamount();
			Double dbamount = Double.valueOf(transAmount);
			transObj.setPointscaluclated(dbamount * .05);
			transObj.setTransactionamount(cardTrans.getTransactionamount());
			transObj.setTransactiontimestamp(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			transObj.setTranscationtype(cardTrans.getTranscationtype());
			transObj.setCurrencycode("USD");
			transObj.setCity(cardTrans.getCity());
			transObj.setState(cardTrans.getState());
			transObj.setCreated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			transObj.setUpdated_at(java.sql.Timestamp.valueOf(LocalDateTime.now()));
			transRepo.save(transObj);
			
			Points point =new Points();
			point.setCardNumber(transObj.getAccountnumber());
			point.setOpertaion("add");
			point.setPointsvalue(transObj.getPointscaluclated());
			RestTemplate restTemplate = new RestTemplate();
			String url = "https://customer.apps.dev.pcf-aws.com/api/v1/creditcard/customer/adjustpoints";
			//String url = "https://localhost:8081/api/v1/creditcard/customer/adjustpoints";
			
			ResponseEntity<String> response = restTemplate.postForEntity(url,point,
	                String.class);
			if("unsuccessful".equalsIgnoreCase(response.getBody().toString())){
				throw new ApplicationException(HttpStatus.INTERNAL_SERVER_ERROR,"Total addition of points failed");
			}		
			return true;
		} catch (Exception e) {
			throw new ApplicationException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}

	@Override
	public List<Cardtransaction> getTransactionHistory(String creditCardNumber) {
		try {
			return transRepo.findTransactionByAccountnumber(creditCardNumber);
		} catch (Exception e) {
			throw new ApplicationException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}

	}

}
