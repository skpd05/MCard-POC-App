package com.mc.demo.app.enrollement;

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

import com.mc.demo.app.enrollement.service.EnrollService;
import com.mc.demo.app.enrollment.exception.ApplicationException;

@RestController
@RequestMapping("/api/v1/loyalty/enroll")
public class EnrollmentController {

	@Autowired
	EnrollService enrollService;

	@RequestMapping(value = "/validateCard", method = RequestMethod.POST)
	public ResponseEntity<CardEnrolled> validateEnrollment(@RequestBody @Validated EnrollCard enrollCard,
			@RequestHeader(name = "uuid", required = false) String uuid,
			@RequestHeader(name = "client_id", required = false) String clientId,
			@RequestHeader(name = "Accept", required = false) String accept) {

		CardEnrolled cardEnrolled;
		try {
			cardEnrolled = enrollService.validateCard(enrollCard);
		} catch (Exception e) {

			return new ResponseEntity<CardEnrolled>(new CardEnrolled(), HttpStatus.PRECONDITION_FAILED);
		}

		return new ResponseEntity<CardEnrolled>(cardEnrolled, HttpStatus.OK);
	}

	@RequestMapping(value = "/checkUserID/{userid}", method = RequestMethod.GET)
	public String verifyUserId(@PathVariable(value = "userid") String userid,
			@RequestHeader(name = "uuid", required = true) String uuid,
			@RequestHeader(name = "client_id", required = true) String clientId,
			@RequestHeader(name = "Accept", required = true) String accept) {
		if (enrollService.isUserIdAvailable(userid)) {
			return "available";
		}

		return "taken";

	}

	@RequestMapping(value = "/createProfile", method = RequestMethod.POST)
	public ResponseEntity<CardEnrolled> createUserProfile(@RequestBody @Validated UserProfile userprofile,
			@RequestHeader(name = "uuid", required = false) String uuid,
			@RequestHeader(name = "client_id", required = false) String clientId,
			@RequestHeader(name = "Accept", required = false) String accept) {

		CardEnrolled cardEnroll = new CardEnrolled();
		try {
			enrollService.createUserProfile(userprofile);
			cardEnroll.setCardNumber(userprofile.getAccountNumber());
			cardEnroll.setUserid(userprofile.getEmailId());
			cardEnroll.setEnrolledAlready(false);
			cardEnroll.setMessage("User created successfully");
		} catch (Exception e) {
			e.printStackTrace();
			cardEnroll.setCardNumber(userprofile.getAccountNumber());
			cardEnroll.setEnrolledAlready(false);
			cardEnroll.setMessage("User creation failed");
		//	throw new ApplicationException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
		return new ResponseEntity<CardEnrolled>(cardEnroll, HttpStatus.OK);
	}

	@RequestMapping(value = "/ulogin", method = RequestMethod.POST)
	public ResponseEntity<LoginResponse> loginUser(@RequestBody @Validated UserProfile login,
			@RequestHeader(name = "uuid", required = false) String uuid,
			@RequestHeader(name = "client_id", required = false) String clientId,
			@RequestHeader(name = "Accept", required = false) String accept) {
		return new ResponseEntity<LoginResponse>(enrollService.ulogin(login), HttpStatus.OK);
	}
}
