import GatewayEndPoint from '@salesforce/label/c.GatewayEndPoint';

const callout = async (path, authenticationToken, reqJsonData) => {
    const endpoint = GatewayEndPoint + path;

    const response = await fetch(endpoint, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            "AuthToken": authenticationToken
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(reqJsonData) // body data type must match "Content-Type" header
	});
	if (response.status !== 200) {
		throw response;
	}
    return response;
}

export const callNewCallout = async (num, userName, pwd, authToken) => {
	//uiStateData.response_set = callStateConstantsObj.OUTBOUND;
	console.log('num on callNewCallout ', num);
	const str = userName + ':' + pwd;
	const headerKey = btoa(str);
	console.log('makeCallAction... ', num);
	const reqJson = {
		'userId': userName,
		'address': num,
		'headerKey': headerKey
	};
    const response = await callout('/call/new', authToken, reqJson);
	console.log(response);
	const data = await response.json();
	console.log(data);
	/*
	if (response.status === 200) {
		console.log('error in make call');
    } 
    else if (response.status === 1) {
		const statusCode = response.data.code;
		if (statusCode === 0) {
			const callId = response.data.callId; 
			var lastChar;
			var stringLength = num.length; // this will be 16

			if(stringLength > 9) {
				lastChar = num.substr(stringLength - 10);

			} else {
				lastChar = num.substr(stringLength - 4);
			}
            console.log(callid + "=>" + lastChar + ";" );
            console.log({lastChar});
		} else {
			console.log('error in make call');
		}
	}*/
	return data;
}

export const callTalkCallout = async (authToken, callId, userName, password) => {
	console.log('<<-----  callTalkAction called  ----->>');
	/*if(callId === phoneStatesConstants.CONF_CALL_ID) {
		var path = '/call/unholdConference';
		var headerKey = btoa(userName + ':' + password);
		var reqJson = {
			'userId':userName,
			'headerKey':headerKey
		}
		var response = makeHttpPost(path, authToken, reqJson);
		console.log('Response recieved from makeHttpPost call : ');
		console.log(response);
		return response;
	} else {*/
	const path = '/call/talk';
	const headerKey = btoa(userName + ':' + password);
	const reqJson = {
		'id': callId,
		'userId': userName,
		'headerKey': headerKey
	}
	const response = await callout(path, authToken, reqJson);
	console.log('Response recieved from callTalkCallout call : ');
	console.log(response);
	const data = await response.json();
	return data;
	//}
}

export const callEndCallout = async (authToken, callId, userId, password) => {
		console.log('-----  Ending call');
		const path = '/call/end';
		const headerKey = btoa(userId + ':' + password);
		const reqJson = {
			'id': callId,
			'userId': userId,
			'headerKey': headerKey
		}
		const response = await callout(path, authToken, reqJson);
		console.log('Response recieved from callEndCallout call : ');
		console.log(response);
		const data = await response.json();
		return data;
}

export const callHoldCallout = async (authToken, callId, userId, password) => {
	const path = '/call/hold';
	const headerKey = btoa(userId + ':' + password);
	const reqJson = {
		'id': callId,
		'userId': userId,
		'headerKey': headerKey
	}
	const response = await callout(path, authToken, reqJson);
	console.log('Response recieved from callHold call : ');
	console.log(response);
	const data = await response.json();
	return data;
}

export const callStarRecordingCallout  = async (authToken, callid, userId, password) => {
	console.log('<<-----  starRecordingAction called  ----->>');
	const path = '/call/startRecording';
	const headerKey = btoa(userId + ':' + password);
	const reqJson = {
		'id': callid,
		'userId': userId,
		'headerKey': headerKey
	};

	const response = await callout(path, authToken, reqJson);
	console.log('Response recieved from pauseRecordingCallout call : ');
	console.log(response);
	const data = await response.json();
	return data;
}

export const callPauseRecordingCallout  = async (authToken, callId, userName, password) => {
	console.log('<<-----  pauseRecordingAction called  ----->>');
	const path = '/call/pauseRecording';
	const headerKey = btoa(userName+':'+password);
	const reqJson = {
		'id': callId,
		'userId': userName,
		'headerKey': headerKey
	}

	const response = await callout(path, authToken, reqJson);
	console.log('Response recieved from pauseRecordingCallout call : ');
	console.log(response);
	const data = await response.json();
	return data;
}

export const callResumeRecordingCallout  = async (authToken, callId, userName, password) => {
	console.log('<<-----  pauseRecordingAction called  ----->>');
	var path = '/call/resumeRecording';
	const headerKey = btoa(userName+':'+password);
	const reqJson = {
		'id': callId,
		'userId': userName,
		'headerKey': headerKey
	}

	const response = await callout(path, authToken, reqJson);
	console.log('Response recieved from callResumeRecordingCallout call : ');
	console.log(response);
	const data = await response.json();
	return data;
}

export const callStopRecordingCallout = async (authToken, id, userName, password) => {
	console.log('<<-----  stopRecordingAction called  ----->>');
	var path = '/call/stopRecording';
	var headerKey = btoa(userName + ':' + password);
	var reqJson = {
		'id': id,
		'userId': userName,
		'headerKey': headerKey
	}

	const response = await callout(path, authToken, reqJson);
	console.log('Response recieved from stopRecordingAction call : ');
	console.log(response);
	const data = await response.json();
	return data;
}

export const callTransferCallout = async (authToken, address, callId, userName, password) => {
	console.log('<<-----  transferCallAction called  ----->>');
	const path = '/call/transfer';
	const headerKey = btoa(userName+':'+password);
	const reqJson = {
		'id':callId,
		'address':address,
		'userId':userName,
		'headerKey':headerKey
	}


	const response = await callout(path, authToken, reqJson);
	console.log('Response recieved from callTransferCallout call : ');
	console.log(response);
	const data = await response.json();
	return data;
}

export const callStartConferenceCallout = async (authToken, callIds, userName, password) => {
	const path = '/call/startConference';
	const headerKey = btoa(userName + ':' + password);
	const reqJson = {
		'callId': callIds,
		'userId': userName,
		'headerKey': headerKey
	}

	const response = await callout(path, authToken, reqJson);
	console.log('Response recieved from callStartConferenceCallout call : ');
	console.log(response);
	const data = await response.json();
	return data;
}