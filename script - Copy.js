internationalNumberFormat = new Intl.NumberFormat('en-IN')

let holding = document.getElementById('holding');
let tbody = document.getElementById('tbody');
let tbody2 = document.getElementById('tbody2');
let buyBox = document.getElementById('buyBox');
let sellBox = document.getElementById('sellBox');
let buyFinal2 = document.getElementById('buyFinal2');
let sellFinal2 = document.getElementById('sellFinal2');
let avlBalance = document.getElementById('avlBalance');
let reloCurrValue = document.getElementById('reloCurrValue');
let currentProfit = document.getElementById('currentProfit');
let currentTotal = document.getElementById('currentTotal');
let InvestmentTotal = document.getElementById('InvestmentTotal');
let portfolioSummary = document.getElementById('portfolioSummary');

let glob = 0;

let myBalance1 = localStorage.getItem("myBalance");
if (myBalance1 == null) {
	localStorage.setItem("myBalance", 10000);
}
let myBalance = localStorage.getItem("myBalance");


let HoldingNum = '';
HoldingNum = localStorage.getItem("HoldingNum");
if (HoldingNum == null) {
	localStorage.setItem("HoldingNum", 0);
} else {
	holding.innerHTML = HoldingNum;
}

HoldingNum = localStorage.getItem("HoldingNum");







let apiData = [];


let portfolioJSON = '';
portfolioJSON = localStorage.getItem("myJson");
// console.log(portfolioJSON);
if (portfolioJSON == null) {

	let myJson1 = {
		1: {
			num: "1",
			id: "0",
			symbol: "symbol1",
			name: "name1",
			currentPrice: "currentPrice1",
			InvestedPrice: "InvestedPrice1",
			margin: "margin1",
			coins: "2",

		},
		2: {
			num: "2",
			id: "0",
			symbol: "symbol1",
			name: "name2",
			currentPrice: "currentPrice2",
			InvestedPrice: "InvestedPrice2",
			margin: "margin2",
			coins: "2",

		},
		3: {
			num: "3",
			id: "0",
			symbol: "symbol1",
			name: "name3",
			currentPrice: "currentPrice3",
			InvestedPrice: "InvestedPrice3",
			margin: "margin3",
			coins: "2",

		},
		4: {
			num: "4",
			id: "0",
			symbol: "symbol1",
			name: "name4",
			currentPrice: "currentPrice4",
			InvestedPrice: "InvestedPrice4",
			margin: "margin4",
			coins: "2",

		},
		5: {
			num: "5",
			id: "0",
			symbol: "symbol1",
			name: "name5",
			currentPrice: "currentPrice5",
			InvestedPrice: "InvestedPrice5",
			margin: "margin5",
			coins: "2",

		}
	}
	localStorage.setItem("myJson", JSON.stringify(myJson1));
}
portfolioJSON = localStorage.getItem("myJson");



avlBalance.innerText = myBalance;


let currReload = document.getElementById('currReload');

getReq();

function getReq() {
	let html = '';
	let c = 0;
	fetch(
			`https://api.coinpaprika.com/v1/tickers?quotes=INR`
		)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.status);
			}
			return res.json();
		})
		.then((data) => {
			// console.log(data);    
			apiData = [];
			for (let i = 0; i < 20; i++) {
				let n = data[i].quotes.INR.price.toFixed(2);
				let clas = 'text-success'
				if (data[i].quotes.INR.percent_change_24h < 0) {
					clas = 'text-danger'
				}
                let p49 = internationalNumberFormat.format(n);
				let p =
					` <tr class="${clas}" style = "background-color: black" >
                <td style="width: 25.66670000000001px;" id="coinrank${i}">${data[i].rank}</td>
                <td id="coinid${i}" >${data[i].symbol}</td>
                <td  id="coinname${i}" >${data[i].name}</td>
                <td id="coinprice${i}" >${p49}</td>
                <td id="coinpercent${i}" >${data[i].quotes.INR.percent_change_24h}</td>
                <td id="buyBtnForCoin${i}">
                <button type="button" class="btn btn-success" id="buyBtnlow${i}"
                 onclick="buyDataShow('${data[i].symbol}','${data[i].name}','${n}')">BUY</button>
            </td>
            </tr>`;
				let tempObj = {
					rank: `${data[i].rank}`,
					symbol: `${data[i].symbol}`,
					name: `${data[i].name}`,
					currentPrice: `${n}`,
					percent: `${data[i].quotes.INR.percent_change_24h}`
				}

				apiData.push(tempObj);
				html += p;

			}
			tbody.innerHTML = html;
			// console.log(apiData);
			return data;
		})
		.catch((err) => {
			console.log('API Error' + err);
		});
}


let symbol1 = '00';
let name1 = '0';
let price1 = -1;
let buyPrce = -1;

function buyDataShow(symbol, name, price) {
	glob = 1;
	symbol1 = symbol;
	name1 = name;
	price1 = price;

	buyBox.innerHTML = `    
 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

    `;
}

/* <div  style="display: grid;  grid-template-columns: 3fr 5fr  3fr 3fr;">
<div id="buyCoinName">${symbol} <br>${name}</div>
<div id="buyCurrentValue">Buying Price <br>= <br>${price}</div>
<div>Buy Amount<br> =   <input type="email" class="form-control" id="buyAmount" placeholder=""> </div>
<div id="Coinsyouget" >Coins you get <br> = <br>3.5446</div>
</div> */




/* 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    <th>BUY<br><br></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                    <td>
                    <button type="button" class="btn btn-success" id="buyFinal2">Success</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

*/

buyFinal2.onclick = function () {
	let buyAmount = document.getElementById('buyAmount');
	if (glob === 0) return;

	if (buyAmount.value == '') {
		alert("Enter the amount");
		return;
	}

	let r1 = buyAmount.value;
	
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	if (parseFloat(`${buyAmount.value}`) <= 0 || buyAmount.value > parseFloat(`${myBalance1}`) || parseFloat(`${HoldingNum}`) >= 5) {
		alert("Please follow the Rules")
	} else {
		avlBalance.innerText = (parseFloat(`${myBalance1}`) - parseFloat(`${buyAmount.value}`)).toFixed(3);
		let coinsGet = parseFloat(`${buyAmount.value}`) / parseFloat(`${price1}`);
		let p3 = parseFloat(`${myBalance1}`) - buyAmount.value;
		
		buyAmount.value = ''
		let p4 = parseFloat(`${HoldingNum}`);
		p4++;

		localStorage.setItem("myBalance", p3);
		localStorage.setItem("HoldingNum", p4);
		holding.innerHTML = p4;

		for (let i = 1; i <= 5; i++) {
			let myObj2 = JSON.parse(localStorage.getItem("myJson"));
			if (myObj2[i].id == 0) {
				myObj2[i].id = i;
				myObj2[i].symbol = `${symbol1}`;
				myObj2[i].name = `${name1}`;
				myObj2[i].currentPrice = 1000;
				myObj2[i].InvestedPrice = `${r1}`;
				myObj2[i].margin = i - 1;
				myObj2[i].coins = `${coinsGet}`;
				localStorage.setItem("myJson", JSON.stringify(myObj2));
				break;
			}
		}
		buyBox.innerHTML = '<h3> BUY !</h3>';
		updatePortfolio();
        swal({
            title: "Successful Transaction !",
            text: `You bought ${name1} Successfully`,
            icon: "success",
            button: "Thanks!",
          });
	}
}
window.onload = function() {
    setTimeout(updatePortfolio, 3000);
  }
updatePortfolio();
function updatePortfolio() {
	let p6 = localStorage.getItem("HoldingNum");
	
	let p7 = JSON.parse(p6);
	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	
	// console.log(apiData);
	tbody2.innerHTML = '';
	if (apiData.length != 0) {
		for (let i = 0; i < 20; i++) {
			if (myObj2[1].id != 0) {
				if (apiData[i].symbol == myObj2[1].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[1].coins}`);
					p90 = p90.toFixed(2);
					myObj2[1].currentPrice = p90;
				}
			}
			if (myObj2[2].id != 0) {
				if (apiData[i].symbol == myObj2[2].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[2].coins}`);
					p90 = p90.toFixed(2);
					myObj2[2].currentPrice = p90;
				}
			}
			if (myObj2[3].id != 0) {
				if (apiData[i].symbol == myObj2[3].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[3].coins}`);
					p90 = p90.toFixed(2);
					myObj2[3].currentPrice = p90;
				}
			}
			if (myObj2[4].id != 0) {
				if (apiData[i].symbol == myObj2[4].symbol) {
				
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[4].coins}`);
					p90 = p90.toFixed(2);
					myObj2[4].currentPrice = p90;
				}
			}
			if (myObj2[5].id != 0) {
				if (apiData[i].symbol == myObj2[5].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[5].coins}`);
					p90 = p90.toFixed(2);
					myObj2[5].currentPrice = p90;

				}
			}
		}
	}
let CPortfolio = 0;
let IPortfolio = 0;
	for (var i = 1; i <= 5; i++) {
		if (myObj2[i].id != 0) {
			let p80 = parseFloat(`${myObj2[i].currentPrice}`) - parseFloat(`${myObj2[i].InvestedPrice}`);
			p80 = p80.toFixed(3);
			let p70 = 'success';
			if (p80 < 0) {
				p70 = 'danger';
			}
            let p47 = internationalNumberFormat.format(myObj2[i].currentPrice);
            let p48 = internationalNumberFormat.format(myObj2[i].InvestedPrice);
			CPortfolio += parseFloat(`${myObj2[i].currentPrice}`);
			IPortfolio += parseFloat(`${myObj2[i].InvestedPrice}`);
			let p2 = `
                <tr class="table-${p70}" style = " ba ">                                                  
                                                      <td>${myObj2[i].id}</td>
                                                      <td>${myObj2[i].symbol}</td>
                                                      <td>${myObj2[i].name}</td>                                                   
                                                      <td>${p47} </td>
                                                      <td>${p48}</td>
                                                      <td>${p80}</td>
                                                      <td>
                                                      <button type="button" class="btn btn-${p70}" id="buyBtnlow${i}"
                                                      onclick="sellDataShow('${myObj2[i].id}', '${myObj2[i].symbol}','${myObj2[i].name}',   '${myObj2[i].currentPrice}','${myObj2[i].InvestedPrice}', '${myObj2[i].margin}')">SELL</button>
                                                      </td>
                                                  </tr>
                `;
			myObj2[i].margin = `${p80}`;
			localStorage.setItem("myJson", JSON.stringify(myObj2));
			tbody2.innerHTML += p2;
		}
	}
	let p34 = '#105701'
	let p35 = '#1ba916'
	if(CPortfolio - IPortfolio < 0){
		p34 = '#b10408'
		p35 = '#f42f2f'
	}
	portfolioSummary.innerHTML= 
	`

	<thead  style="background-color: black;  color: white;">
	<th class="text-center" >Total <br> Investment</th>
	<th class="text-center">Current <br> Value</th>
	<th class="text-center">Current <br> Profit</th>

</thead>
<tbody  style="background-color: black;  color: ${p35}; border-color: white;">

	<tr  >
	<th id="InvestmentTotal"  >  ₹ ${internationalNumberFormat.format(IPortfolio.toFixed(2))} </th>
	<th id="currentTotal"  >₹ ${internationalNumberFormat.format(CPortfolio.toFixed(2))}   </th>
	<th id="currentProfit"  >₹ ${internationalNumberFormat.format((CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2))} <br><br> </th>
	
		
	</tr>
</tbody>
	`


	InvestmentTotal.innerHTML = ` <br>  ${IPortfolio.toFixed(2)} <br>`   ;
	currentTotal.innerHTML =` <br> ${CPortfolio.toFixed(2)}  <br>`;
	currentProfit.innerHTML = `<br> ${(CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2)} <br>`;
	// currentTotal.innerText = CPortfolio;
	// console.log(myObj2);
}


let Sid = -1;
let Scp = -1;
let Sip = -1;

function sellDataShow(id, symbol, name, currentPrice, InvestedPrice, margin) {
	Sid = id;
	Scp = currentPrice;
	Sip = InvestedPrice;
    let SScp = parseFloat(`${currentPrice}`);
    let SSip = parseFloat(`${InvestedPrice}`);
    let prof = SScp - SSip;
    prof = prof.toFixed(2);

	sellBox.innerHTML = `
           
    
    <div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Invested<br>Value</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Current<br>Value<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Profit&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-danger">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${InvestedPrice}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${currentPrice}</td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">${prof}</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 
        `;
}


sellFinal2.onclick = function () {

	if (Sid == -1) {
		alert("bhai");
		return;
	}
	
	// console.log('id ' + Sid);
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	let p4 = parseFloat(`${HoldingNum}`);
	p4--;
	let p10 = parseFloat(`${myBalance1}`);
	let p11 = parseFloat(`${Scp}`);
	p10 = p10 + p11;
	
	avlBalance.innerText = p10;
	sellBox.innerHTML = '<h3>SELL !</h3>';

	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	myObj2[Sid].id = 0;

	localStorage.setItem("myBalance", p10);
	localStorage.setItem("HoldingNum", p4);
	holding.innerHTML = p4;
	localStorage.setItem("myJson", JSON.stringify(myObj2));
	Sid = -1;
	updatePortfolio();

}

reloCurrValue.onclick = function () {
	updatePortfolio();
}

 let myBalance2 = localStorage.getItem("myBalance");
 let p50 = myBalance2;
 p50 = parseFloat(`${p50}`);
 p50 = p50.toFixed(2);
 let p46 = internationalNumberFormat.format(p50);
 avlBalance.innerText = p46;


// coinNews();
function coinNews(){
    fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/events`)

.then((res) => {
    if (!res.ok) {
        throw new Error(res.status);
    }
    return res.json();
})
.then((data) => {
    console.log("newssss");
    // console.log(data);
})

.catch((err) => {
    console.log('API Error' + err);
});

}


internationalNumberFormat = new Intl.NumberFormat('en-IN')

let holding = document.getElementById('holding');
let tbody = document.getElementById('tbody');
let tbody2 = document.getElementById('tbody2');
let buyBox = document.getElementById('buyBox');
let sellBox = document.getElementById('sellBox');
let buyFinal2 = document.getElementById('buyFinal2');
let sellFinal2 = document.getElementById('sellFinal2');
let avlBalance = document.getElementById('avlBalance');
let reloCurrValue = document.getElementById('reloCurrValue');
let currentProfit = document.getElementById('currentProfit');
let currentTotal = document.getElementById('currentTotal');
let InvestmentTotal = document.getElementById('InvestmentTotal');
let portfolioSummary = document.getElementById('portfolioSummary');

let glob = 0;

let myBalance1 = localStorage.getItem("myBalance");
if (myBalance1 == null) {
	localStorage.setItem("myBalance", 10000);
}
let myBalance = localStorage.getItem("myBalance");


let HoldingNum = '';
HoldingNum = localStorage.getItem("HoldingNum");
if (HoldingNum == null) {
	localStorage.setItem("HoldingNum", 0);
} else {
	holding.innerHTML = HoldingNum;
}

HoldingNum = localStorage.getItem("HoldingNum");







let apiData = [];


let portfolioJSON = '';
portfolioJSON = localStorage.getItem("myJson");
// console.log(portfolioJSON);
if (portfolioJSON == null) {

	let myJson1 = {
		1: {
			num: "1",
			id: "0",
			symbol: "symbol1",
			name: "name1",
			currentPrice: "currentPrice1",
			InvestedPrice: "InvestedPrice1",
			margin: "margin1",
			coins: "2",

		},
		2: {
			num: "2",
			id: "0",
			symbol: "symbol1",
			name: "name2",
			currentPrice: "currentPrice2",
			InvestedPrice: "InvestedPrice2",
			margin: "margin2",
			coins: "2",

		},
		3: {
			num: "3",
			id: "0",
			symbol: "symbol1",
			name: "name3",
			currentPrice: "currentPrice3",
			InvestedPrice: "InvestedPrice3",
			margin: "margin3",
			coins: "2",

		},
		4: {
			num: "4",
			id: "0",
			symbol: "symbol1",
			name: "name4",
			currentPrice: "currentPrice4",
			InvestedPrice: "InvestedPrice4",
			margin: "margin4",
			coins: "2",

		},
		5: {
			num: "5",
			id: "0",
			symbol: "symbol1",
			name: "name5",
			currentPrice: "currentPrice5",
			InvestedPrice: "InvestedPrice5",
			margin: "margin5",
			coins: "2",

		}
	}
	localStorage.setItem("myJson", JSON.stringify(myJson1));
}
portfolioJSON = localStorage.getItem("myJson");



avlBalance.innerText = myBalance;


let currReload = document.getElementById('currReload');

getReq();

function getReq() {
	let html = '';
	let c = 0;
	fetch(
			`https://api.coinpaprika.com/v1/tickers?quotes=INR`
		)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.status);
			}
			return res.json();
		})
		.then((data) => {
			// console.log(data);    
			apiData = [];
			for (let i = 0; i < 20; i++) {
				let n = data[i].quotes.INR.price.toFixed(2);
				let clas = 'text-success'
				if (data[i].quotes.INR.percent_change_24h < 0) {
					clas = 'text-danger'
				}
                let p49 = internationalNumberFormat.format(n);
				let p =
					` <tr class="${clas}" style = "background-color: black" >
                <td style="width: 25.66670000000001px;" id="coinrank${i}">${data[i].rank}</td>
                <td id="coinid${i}" >${data[i].symbol}</td>
                <td  id="coinname${i}" >${data[i].name}</td>
                <td id="coinprice${i}" >${p49}</td>
                <td id="coinpercent${i}" >${data[i].quotes.INR.percent_change_24h}</td>
                <td id="buyBtnForCoin${i}">
                <button type="button" class="btn btn-success" id="buyBtnlow${i}"
                 onclick="buyDataShow('${data[i].symbol}','${data[i].name}','${n}')">BUY</button>
            </td>
            </tr>`;
				let tempObj = {
					rank: `${data[i].rank}`,
					symbol: `${data[i].symbol}`,
					name: `${data[i].name}`,
					currentPrice: `${n}`,
					percent: `${data[i].quotes.INR.percent_change_24h}`
				}

				apiData.push(tempObj);
				html += p;

			}
			tbody.innerHTML = html;
			// console.log(apiData);
			return data;
		})
		.catch((err) => {
			console.log('API Error' + err);
		});
}


let symbol1 = '00';
let name1 = '0';
let price1 = -1;
let buyPrce = -1;

function buyDataShow(symbol, name, price) {
	glob = 1;
	symbol1 = symbol;
	name1 = name;
	price1 = price;

	buyBox.innerHTML = `    
 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

    `;
}

/* <div  style="display: grid;  grid-template-columns: 3fr 5fr  3fr 3fr;">
<div id="buyCoinName">${symbol} <br>${name}</div>
<div id="buyCurrentValue">Buying Price <br>= <br>${price}</div>
<div>Buy Amount<br> =   <input type="email" class="form-control" id="buyAmount" placeholder=""> </div>
<div id="Coinsyouget" >Coins you get <br> = <br>3.5446</div>
</div> */




/* 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    <th>BUY<br><br></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                    <td>
                    <button type="button" class="btn btn-success" id="buyFinal2">Success</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

*/

buyFinal2.onclick = function () {
	let buyAmount = document.getElementById('buyAmount');
	if (glob === 0) return;

	if (buyAmount.value == '') {
		alert("Enter the amount");
		return;
	}

	let r1 = buyAmount.value;
	
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	if (parseFloat(`${buyAmount.value}`) <= 0 || buyAmount.value > parseFloat(`${myBalance1}`) || parseFloat(`${HoldingNum}`) >= 5) {
		alert("Please follow the Rules")
	} else {
		avlBalance.innerText = (parseFloat(`${myBalance1}`) - parseFloat(`${buyAmount.value}`)).toFixed(3);
		let coinsGet = parseFloat(`${buyAmount.value}`) / parseFloat(`${price1}`);
		let p3 = parseFloat(`${myBalance1}`) - buyAmount.value;
		
		buyAmount.value = ''
		let p4 = parseFloat(`${HoldingNum}`);
		p4++;

		localStorage.setItem("myBalance", p3);
		localStorage.setItem("HoldingNum", p4);
		holding.innerHTML = p4;

		for (let i = 1; i <= 5; i++) {
			let myObj2 = JSON.parse(localStorage.getItem("myJson"));
			if (myObj2[i].id == 0) {
				myObj2[i].id = i;
				myObj2[i].symbol = `${symbol1}`;
				myObj2[i].name = `${name1}`;
				myObj2[i].currentPrice = 1000;
				myObj2[i].InvestedPrice = `${r1}`;
				myObj2[i].margin = i - 1;
				myObj2[i].coins = `${coinsGet}`;
				localStorage.setItem("myJson", JSON.stringify(myObj2));
				break;
			}
		}
		buyBox.innerHTML = '<h3> BUY !</h3>';
		updatePortfolio();
        swal({
            title: "Successful Transaction !",
            text: `You bought ${name1} Successfully`,
            icon: "success",
            button: "Thanks!",
          });
	}
}
window.onload = function() {
    setTimeout(updatePortfolio, 3000);
  }
updatePortfolio();
function updatePortfolio() {
	let p6 = localStorage.getItem("HoldingNum");
	
	let p7 = JSON.parse(p6);
	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	
	// console.log(apiData);
	tbody2.innerHTML = '';
	if (apiData.length != 0) {
		for (let i = 0; i < 20; i++) {
			if (myObj2[1].id != 0) {
				if (apiData[i].symbol == myObj2[1].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[1].coins}`);
					p90 = p90.toFixed(2);
					myObj2[1].currentPrice = p90;
				}
			}
			if (myObj2[2].id != 0) {
				if (apiData[i].symbol == myObj2[2].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[2].coins}`);
					p90 = p90.toFixed(2);
					myObj2[2].currentPrice = p90;
				}
			}
			if (myObj2[3].id != 0) {
				if (apiData[i].symbol == myObj2[3].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[3].coins}`);
					p90 = p90.toFixed(2);
					myObj2[3].currentPrice = p90;
				}
			}
			if (myObj2[4].id != 0) {
				if (apiData[i].symbol == myObj2[4].symbol) {
				
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[4].coins}`);
					p90 = p90.toFixed(2);
					myObj2[4].currentPrice = p90;
				}
			}
			if (myObj2[5].id != 0) {
				if (apiData[i].symbol == myObj2[5].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[5].coins}`);
					p90 = p90.toFixed(2);
					myObj2[5].currentPrice = p90;

				}
			}
		}
	}
let CPortfolio = 0;
let IPortfolio = 0;
	for (var i = 1; i <= 5; i++) {
		if (myObj2[i].id != 0) {
			let p80 = parseFloat(`${myObj2[i].currentPrice}`) - parseFloat(`${myObj2[i].InvestedPrice}`);
			p80 = p80.toFixed(3);
			let p70 = 'success';
			if (p80 < 0) {
				p70 = 'danger';
			}
            let p47 = internationalNumberFormat.format(myObj2[i].currentPrice);
            let p48 = internationalNumberFormat.format(myObj2[i].InvestedPrice);
			CPortfolio += parseFloat(`${myObj2[i].currentPrice}`);
			IPortfolio += parseFloat(`${myObj2[i].InvestedPrice}`);
			let p2 = `
                <tr class="table-${p70}" style = " ba ">                                                  
                                                      <td>${myObj2[i].id}</td>
                                                      <td>${myObj2[i].symbol}</td>
                                                      <td>${myObj2[i].name}</td>                                                   
                                                      <td>${p47} </td>
                                                      <td>${p48}</td>
                                                      <td>${p80}</td>
                                                      <td>
                                                      <button type="button" class="btn btn-${p70}" id="buyBtnlow${i}"
                                                      onclick="sellDataShow('${myObj2[i].id}', '${myObj2[i].symbol}','${myObj2[i].name}',   '${myObj2[i].currentPrice}','${myObj2[i].InvestedPrice}', '${myObj2[i].margin}')">SELL</button>
                                                      </td>
                                                  </tr>
                `;
			myObj2[i].margin = `${p80}`;
			localStorage.setItem("myJson", JSON.stringify(myObj2));
			tbody2.innerHTML += p2;
		}
	}
	let p34 = '#105701'
	let p35 = '#1ba916'
	if(CPortfolio - IPortfolio < 0){
		p34 = '#b10408'
		p35 = '#f42f2f'
	}
	portfolioSummary.innerHTML= 
	`

	<thead  style="background-color: black;  color: white;">
	<th class="text-center" >Total <br> Investment</th>
	<th class="text-center">Current <br> Value</th>
	<th class="text-center">Current <br> Profit</th>

</thead>
<tbody  style="background-color: black;  color: ${p35}; border-color: white;">

	<tr  >
	<th id="InvestmentTotal"  >  ₹ ${internationalNumberFormat.format(IPortfolio.toFixed(2))} </th>
	<th id="currentTotal"  >₹ ${internationalNumberFormat.format(CPortfolio.toFixed(2))}   </th>
	<th id="currentProfit"  >₹ ${internationalNumberFormat.format((CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2))} <br><br> </th>
	
		
	</tr>
</tbody>
	`


	InvestmentTotal.innerHTML = ` <br>  ${IPortfolio.toFixed(2)} <br>`   ;
	currentTotal.innerHTML =` <br> ${CPortfolio.toFixed(2)}  <br>`;
	currentProfit.innerHTML = `<br> ${(CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2)} <br>`;
	// currentTotal.innerText = CPortfolio;
	// console.log(myObj2);
}


let Sid = -1;
let Scp = -1;
let Sip = -1;

function sellDataShow(id, symbol, name, currentPrice, InvestedPrice, margin) {
	Sid = id;
	Scp = currentPrice;
	Sip = InvestedPrice;
    let SScp = parseFloat(`${currentPrice}`);
    let SSip = parseFloat(`${InvestedPrice}`);
    let prof = SScp - SSip;
    prof = prof.toFixed(2);

	sellBox.innerHTML = `
           
    
    <div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Invested<br>Value</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Current<br>Value<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Profit&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-danger">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${InvestedPrice}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${currentPrice}</td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">${prof}</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 
        `;
}


sellFinal2.onclick = function () {

	if (Sid == -1) {
		alert("bhai");
		return;
	}
	
	// console.log('id ' + Sid);
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	let p4 = parseFloat(`${HoldingNum}`);
	p4--;
	let p10 = parseFloat(`${myBalance1}`);
	let p11 = parseFloat(`${Scp}`);
	p10 = p10 + p11;
	
	avlBalance.innerText = p10;
	sellBox.innerHTML = '<h3>SELL !</h3>';

	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	myObj2[Sid].id = 0;

	localStorage.setItem("myBalance", p10);
	localStorage.setItem("HoldingNum", p4);
	holding.innerHTML = p4;
	localStorage.setItem("myJson", JSON.stringify(myObj2));
	Sid = -1;
	updatePortfolio();

}

reloCurrValue.onclick = function () {
	updatePortfolio();
}

 let myBalance2 = localStorage.getItem("myBalance");
 let p50 = myBalance2;
 p50 = parseFloat(`${p50}`);
 p50 = p50.toFixed(2);
 let p46 = internationalNumberFormat.format(p50);
 avlBalance.innerText = p46;


// coinNews();
function coinNews(){
    fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/events`)

.then((res) => {
    if (!res.ok) {
        throw new Error(res.status);
    }
    return res.json();
})
.then((data) => {
    console.log("newssss");
    // console.log(data);
})

.catch((err) => {
    console.log('API Error' + err);
});

}



internationalNumberFormat = new Intl.NumberFormat('en-IN')

let holding = document.getElementById('holding');
let tbody = document.getElementById('tbody');
let tbody2 = document.getElementById('tbody2');
let buyBox = document.getElementById('buyBox');
let sellBox = document.getElementById('sellBox');
let buyFinal2 = document.getElementById('buyFinal2');
let sellFinal2 = document.getElementById('sellFinal2');
let avlBalance = document.getElementById('avlBalance');
let reloCurrValue = document.getElementById('reloCurrValue');
let currentProfit = document.getElementById('currentProfit');
let currentTotal = document.getElementById('currentTotal');
let InvestmentTotal = document.getElementById('InvestmentTotal');
let portfolioSummary = document.getElementById('portfolioSummary');

let glob = 0;

let myBalance1 = localStorage.getItem("myBalance");
if (myBalance1 == null) {
	localStorage.setItem("myBalance", 10000);
}
let myBalance = localStorage.getItem("myBalance");


let HoldingNum = '';
HoldingNum = localStorage.getItem("HoldingNum");
if (HoldingNum == null) {
	localStorage.setItem("HoldingNum", 0);
} else {
	holding.innerHTML = HoldingNum;
}

HoldingNum = localStorage.getItem("HoldingNum");







let apiData = [];


let portfolioJSON = '';
portfolioJSON = localStorage.getItem("myJson");
// console.log(portfolioJSON);
if (portfolioJSON == null) {

	let myJson1 = {
		1: {
			num: "1",
			id: "0",
			symbol: "symbol1",
			name: "name1",
			currentPrice: "currentPrice1",
			InvestedPrice: "InvestedPrice1",
			margin: "margin1",
			coins: "2",

		},
		2: {
			num: "2",
			id: "0",
			symbol: "symbol1",
			name: "name2",
			currentPrice: "currentPrice2",
			InvestedPrice: "InvestedPrice2",
			margin: "margin2",
			coins: "2",

		},
		3: {
			num: "3",
			id: "0",
			symbol: "symbol1",
			name: "name3",
			currentPrice: "currentPrice3",
			InvestedPrice: "InvestedPrice3",
			margin: "margin3",
			coins: "2",

		},
		4: {
			num: "4",
			id: "0",
			symbol: "symbol1",
			name: "name4",
			currentPrice: "currentPrice4",
			InvestedPrice: "InvestedPrice4",
			margin: "margin4",
			coins: "2",

		},
		5: {
			num: "5",
			id: "0",
			symbol: "symbol1",
			name: "name5",
			currentPrice: "currentPrice5",
			InvestedPrice: "InvestedPrice5",
			margin: "margin5",
			coins: "2",

		}
	}
	localStorage.setItem("myJson", JSON.stringify(myJson1));
}
portfolioJSON = localStorage.getItem("myJson");



avlBalance.innerText = myBalance;


let currReload = document.getElementById('currReload');

getReq();

function getReq() {
	let html = '';
	let c = 0;
	fetch(
			`https://api.coinpaprika.com/v1/tickers?quotes=INR`
		)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.status);
			}
			return res.json();
		})
		.then((data) => {
			// console.log(data);    
			apiData = [];
			for (let i = 0; i < 20; i++) {
				let n = data[i].quotes.INR.price.toFixed(2);
				let clas = 'text-success'
				if (data[i].quotes.INR.percent_change_24h < 0) {
					clas = 'text-danger'
				}
                let p49 = internationalNumberFormat.format(n);
				let p =
					` <tr class="${clas}" style = "background-color: black" >
                <td style="width: 25.66670000000001px;" id="coinrank${i}">${data[i].rank}</td>
                <td id="coinid${i}" >${data[i].symbol}</td>
                <td  id="coinname${i}" >${data[i].name}</td>
                <td id="coinprice${i}" >${p49}</td>
                <td id="coinpercent${i}" >${data[i].quotes.INR.percent_change_24h}</td>
                <td id="buyBtnForCoin${i}">
                <button type="button" class="btn btn-success" id="buyBtnlow${i}"
                 onclick="buyDataShow('${data[i].symbol}','${data[i].name}','${n}')">BUY</button>
            </td>
            </tr>`;
				let tempObj = {
					rank: `${data[i].rank}`,
					symbol: `${data[i].symbol}`,
					name: `${data[i].name}`,
					currentPrice: `${n}`,
					percent: `${data[i].quotes.INR.percent_change_24h}`
				}

				apiData.push(tempObj);
				html += p;

			}
			tbody.innerHTML = html;
			// console.log(apiData);
			return data;
		})
		.catch((err) => {
			console.log('API Error' + err);
		});
}


let symbol1 = '00';
let name1 = '0';
let price1 = -1;
let buyPrce = -1;

function buyDataShow(symbol, name, price) {
	glob = 1;
	symbol1 = symbol;
	name1 = name;
	price1 = price;

	buyBox.innerHTML = `    
 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

    `;
}

/* <div  style="display: grid;  grid-template-columns: 3fr 5fr  3fr 3fr;">
<div id="buyCoinName">${symbol} <br>${name}</div>
<div id="buyCurrentValue">Buying Price <br>= <br>${price}</div>
<div>Buy Amount<br> =   <input type="email" class="form-control" id="buyAmount" placeholder=""> </div>
<div id="Coinsyouget" >Coins you get <br> = <br>3.5446</div>
</div> */




/* 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    <th>BUY<br><br></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                    <td>
                    <button type="button" class="btn btn-success" id="buyFinal2">Success</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

*/

buyFinal2.onclick = function () {
	let buyAmount = document.getElementById('buyAmount');
	if (glob === 0) return;

	if (buyAmount.value == '') {
		alert("Enter the amount");
		return;
	}

	let r1 = buyAmount.value;
	
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	if (parseFloat(`${buyAmount.value}`) <= 0 || buyAmount.value > parseFloat(`${myBalance1}`) || parseFloat(`${HoldingNum}`) >= 5) {
		alert("Please follow the Rules")
	} else {
		avlBalance.innerText = (parseFloat(`${myBalance1}`) - parseFloat(`${buyAmount.value}`)).toFixed(3);
		let coinsGet = parseFloat(`${buyAmount.value}`) / parseFloat(`${price1}`);
		let p3 = parseFloat(`${myBalance1}`) - buyAmount.value;
		
		buyAmount.value = ''
		let p4 = parseFloat(`${HoldingNum}`);
		p4++;

		localStorage.setItem("myBalance", p3);
		localStorage.setItem("HoldingNum", p4);
		holding.innerHTML = p4;

		for (let i = 1; i <= 5; i++) {
			let myObj2 = JSON.parse(localStorage.getItem("myJson"));
			if (myObj2[i].id == 0) {
				myObj2[i].id = i;
				myObj2[i].symbol = `${symbol1}`;
				myObj2[i].name = `${name1}`;
				myObj2[i].currentPrice = 1000;
				myObj2[i].InvestedPrice = `${r1}`;
				myObj2[i].margin = i - 1;
				myObj2[i].coins = `${coinsGet}`;
				localStorage.setItem("myJson", JSON.stringify(myObj2));
				break;
			}
		}
		buyBox.innerHTML = '<h3> BUY !</h3>';
		updatePortfolio();
        swal({
            title: "Successful Transaction !",
            text: `You bought ${name1} Successfully`,
            icon: "success",
            button: "Thanks!",
          });
	}
}
window.onload = function() {
    setTimeout(updatePortfolio, 3000);
  }
updatePortfolio();
function updatePortfolio() {
	let p6 = localStorage.getItem("HoldingNum");
	
	let p7 = JSON.parse(p6);
	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	
	// console.log(apiData);
	tbody2.innerHTML = '';
	if (apiData.length != 0) {
		for (let i = 0; i < 20; i++) {
			if (myObj2[1].id != 0) {
				if (apiData[i].symbol == myObj2[1].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[1].coins}`);
					p90 = p90.toFixed(2);
					myObj2[1].currentPrice = p90;
				}
			}
			if (myObj2[2].id != 0) {
				if (apiData[i].symbol == myObj2[2].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[2].coins}`);
					p90 = p90.toFixed(2);
					myObj2[2].currentPrice = p90;
				}
			}
			if (myObj2[3].id != 0) {
				if (apiData[i].symbol == myObj2[3].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[3].coins}`);
					p90 = p90.toFixed(2);
					myObj2[3].currentPrice = p90;
				}
			}
			if (myObj2[4].id != 0) {
				if (apiData[i].symbol == myObj2[4].symbol) {
				
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[4].coins}`);
					p90 = p90.toFixed(2);
					myObj2[4].currentPrice = p90;
				}
			}
			if (myObj2[5].id != 0) {
				if (apiData[i].symbol == myObj2[5].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[5].coins}`);
					p90 = p90.toFixed(2);
					myObj2[5].currentPrice = p90;

				}
			}
		}
	}
let CPortfolio = 0;
let IPortfolio = 0;
	for (var i = 1; i <= 5; i++) {
		if (myObj2[i].id != 0) {
			let p80 = parseFloat(`${myObj2[i].currentPrice}`) - parseFloat(`${myObj2[i].InvestedPrice}`);
			p80 = p80.toFixed(3);
			let p70 = 'success';
			if (p80 < 0) {
				p70 = 'danger';
			}
            let p47 = internationalNumberFormat.format(myObj2[i].currentPrice);
            let p48 = internationalNumberFormat.format(myObj2[i].InvestedPrice);
			CPortfolio += parseFloat(`${myObj2[i].currentPrice}`);
			IPortfolio += parseFloat(`${myObj2[i].InvestedPrice}`);
			let p2 = `
                <tr class="table-${p70}" style = " ba ">                                                  
                                                      <td>${myObj2[i].id}</td>
                                                      <td>${myObj2[i].symbol}</td>
                                                      <td>${myObj2[i].name}</td>                                                   
                                                      <td>${p47} </td>
                                                      <td>${p48}</td>
                                                      <td>${p80}</td>
                                                      <td>
                                                      <button type="button" class="btn btn-${p70}" id="buyBtnlow${i}"
                                                      onclick="sellDataShow('${myObj2[i].id}', '${myObj2[i].symbol}','${myObj2[i].name}',   '${myObj2[i].currentPrice}','${myObj2[i].InvestedPrice}', '${myObj2[i].margin}')">SELL</button>
                                                      </td>
                                                  </tr>
                `;
			myObj2[i].margin = `${p80}`;
			localStorage.setItem("myJson", JSON.stringify(myObj2));
			tbody2.innerHTML += p2;
		}
	}
	let p34 = '#105701'
	let p35 = '#1ba916'
	if(CPortfolio - IPortfolio < 0){
		p34 = '#b10408'
		p35 = '#f42f2f'
	}
	portfolioSummary.innerHTML= 
	`

	<thead  style="background-color: black;  color: white;">
	<th class="text-center" >Total <br> Investment</th>
	<th class="text-center">Current <br> Value</th>
	<th class="text-center">Current <br> Profit</th>

</thead>
<tbody  style="background-color: black;  color: ${p35}; border-color: white;">

	<tr  >
	<th id="InvestmentTotal"  >  ₹ ${internationalNumberFormat.format(IPortfolio.toFixed(2))} </th>
	<th id="currentTotal"  >₹ ${internationalNumberFormat.format(CPortfolio.toFixed(2))}   </th>
	<th id="currentProfit"  >₹ ${internationalNumberFormat.format((CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2))} <br><br> </th>
	
		
	</tr>
</tbody>
	`


	InvestmentTotal.innerHTML = ` <br>  ${IPortfolio.toFixed(2)} <br>`   ;
	currentTotal.innerHTML =` <br> ${CPortfolio.toFixed(2)}  <br>`;
	currentProfit.innerHTML = `<br> ${(CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2)} <br>`;
	// currentTotal.innerText = CPortfolio;
	// console.log(myObj2);
}


let Sid = -1;
let Scp = -1;
let Sip = -1;

function sellDataShow(id, symbol, name, currentPrice, InvestedPrice, margin) {
	Sid = id;
	Scp = currentPrice;
	Sip = InvestedPrice;
    let SScp = parseFloat(`${currentPrice}`);
    let SSip = parseFloat(`${InvestedPrice}`);
    let prof = SScp - SSip;
    prof = prof.toFixed(2);

	sellBox.innerHTML = `
           
    
    <div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Invested<br>Value</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Current<br>Value<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Profit&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-danger">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${InvestedPrice}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${currentPrice}</td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">${prof}</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 
        `;
}


sellFinal2.onclick = function () {

	if (Sid == -1) {
		alert("bhai");
		return;
	}
	
	// console.log('id ' + Sid);
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	let p4 = parseFloat(`${HoldingNum}`);
	p4--;
	let p10 = parseFloat(`${myBalance1}`);
	let p11 = parseFloat(`${Scp}`);
	p10 = p10 + p11;
	
	avlBalance.innerText = p10;
	sellBox.innerHTML = '<h3>SELL !</h3>';

	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	myObj2[Sid].id = 0;

	localStorage.setItem("myBalance", p10);
	localStorage.setItem("HoldingNum", p4);
	holding.innerHTML = p4;
	localStorage.setItem("myJson", JSON.stringify(myObj2));
	Sid = -1;
	updatePortfolio();

}

reloCurrValue.onclick = function () {
	updatePortfolio();
}

 let myBalance2 = localStorage.getItem("myBalance");
 let p50 = myBalance2;
 p50 = parseFloat(`${p50}`);
 p50 = p50.toFixed(2);
 let p46 = internationalNumberFormat.format(p50);
 avlBalance.innerText = p46;


// coinNews();
function coinNews(){
    fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/events`)

.then((res) => {
    if (!res.ok) {
        throw new Error(res.status);
    }
    return res.json();
})
.then((data) => {
    console.log("newssss");
    // console.log(data);
})

.catch((err) => {
    console.log('API Error' + err);
});

}




internationalNumberFormat = new Intl.NumberFormat('en-IN')

let holding = document.getElementById('holding');
let tbody = document.getElementById('tbody');
let tbody2 = document.getElementById('tbody2');
let buyBox = document.getElementById('buyBox');
let sellBox = document.getElementById('sellBox');
let buyFinal2 = document.getElementById('buyFinal2');
let sellFinal2 = document.getElementById('sellFinal2');
let avlBalance = document.getElementById('avlBalance');
let reloCurrValue = document.getElementById('reloCurrValue');
let currentProfit = document.getElementById('currentProfit');
let currentTotal = document.getElementById('currentTotal');
let InvestmentTotal = document.getElementById('InvestmentTotal');
let portfolioSummary = document.getElementById('portfolioSummary');

let glob = 0;

let myBalance1 = localStorage.getItem("myBalance");
if (myBalance1 == null) {
	localStorage.setItem("myBalance", 10000);
}
let myBalance = localStorage.getItem("myBalance");


let HoldingNum = '';
HoldingNum = localStorage.getItem("HoldingNum");
if (HoldingNum == null) {
	localStorage.setItem("HoldingNum", 0);
} else {
	holding.innerHTML = HoldingNum;
}

HoldingNum = localStorage.getItem("HoldingNum");







let apiData = [];


let portfolioJSON = '';
portfolioJSON = localStorage.getItem("myJson");
// console.log(portfolioJSON);
if (portfolioJSON == null) {

	let myJson1 = {
		1: {
			num: "1",
			id: "0",
			symbol: "symbol1",
			name: "name1",
			currentPrice: "currentPrice1",
			InvestedPrice: "InvestedPrice1",
			margin: "margin1",
			coins: "2",

		},
		2: {
			num: "2",
			id: "0",
			symbol: "symbol1",
			name: "name2",
			currentPrice: "currentPrice2",
			InvestedPrice: "InvestedPrice2",
			margin: "margin2",
			coins: "2",

		},
		3: {
			num: "3",
			id: "0",
			symbol: "symbol1",
			name: "name3",
			currentPrice: "currentPrice3",
			InvestedPrice: "InvestedPrice3",
			margin: "margin3",
			coins: "2",

		},
		4: {
			num: "4",
			id: "0",
			symbol: "symbol1",
			name: "name4",
			currentPrice: "currentPrice4",
			InvestedPrice: "InvestedPrice4",
			margin: "margin4",
			coins: "2",

		},
		5: {
			num: "5",
			id: "0",
			symbol: "symbol1",
			name: "name5",
			currentPrice: "currentPrice5",
			InvestedPrice: "InvestedPrice5",
			margin: "margin5",
			coins: "2",

		}
	}
	localStorage.setItem("myJson", JSON.stringify(myJson1));
}
portfolioJSON = localStorage.getItem("myJson");



avlBalance.innerText = myBalance;


let currReload = document.getElementById('currReload');

getReq();

function getReq() {
	let html = '';
	let c = 0;
	fetch(
			`https://api.coinpaprika.com/v1/tickers?quotes=INR`
		)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.status);
			}
			return res.json();
		})
		.then((data) => {
			// console.log(data);    
			apiData = [];
			for (let i = 0; i < 20; i++) {
				let n = data[i].quotes.INR.price.toFixed(2);
				let clas = 'text-success'
				if (data[i].quotes.INR.percent_change_24h < 0) {
					clas = 'text-danger'
				}
                let p49 = internationalNumberFormat.format(n);
				let p =
					` <tr class="${clas}" style = "background-color: black" >
                <td style="width: 25.66670000000001px;" id="coinrank${i}">${data[i].rank}</td>
                <td id="coinid${i}" >${data[i].symbol}</td>
                <td  id="coinname${i}" >${data[i].name}</td>
                <td id="coinprice${i}" >${p49}</td>
                <td id="coinpercent${i}" >${data[i].quotes.INR.percent_change_24h}</td>
                <td id="buyBtnForCoin${i}">
                <button type="button" class="btn btn-success" id="buyBtnlow${i}"
                 onclick="buyDataShow('${data[i].symbol}','${data[i].name}','${n}')">BUY</button>
            </td>
            </tr>`;
				let tempObj = {
					rank: `${data[i].rank}`,
					symbol: `${data[i].symbol}`,
					name: `${data[i].name}`,
					currentPrice: `${n}`,
					percent: `${data[i].quotes.INR.percent_change_24h}`
				}

				apiData.push(tempObj);
				html += p;

			}
			tbody.innerHTML = html;
			// console.log(apiData);
			return data;
		})
		.catch((err) => {
			console.log('API Error' + err);
		});
}


let symbol1 = '00';
let name1 = '0';
let price1 = -1;
let buyPrce = -1;

function buyDataShow(symbol, name, price) {
	glob = 1;
	symbol1 = symbol;
	name1 = name;
	price1 = price;

	buyBox.innerHTML = `    
 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

    `;
}

/* <div  style="display: grid;  grid-template-columns: 3fr 5fr  3fr 3fr;">
<div id="buyCoinName">${symbol} <br>${name}</div>
<div id="buyCurrentValue">Buying Price <br>= <br>${price}</div>
<div>Buy Amount<br> =   <input type="email" class="form-control" id="buyAmount" placeholder=""> </div>
<div id="Coinsyouget" >Coins you get <br> = <br>3.5446</div>
</div> */




/* 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    <th>BUY<br><br></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                    <td>
                    <button type="button" class="btn btn-success" id="buyFinal2">Success</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

*/

buyFinal2.onclick = function () {
	let buyAmount = document.getElementById('buyAmount');
	if (glob === 0) return;

	if (buyAmount.value == '') {
		alert("Enter the amount");
		return;
	}

	let r1 = buyAmount.value;
	
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	if (parseFloat(`${buyAmount.value}`) <= 0 || buyAmount.value > parseFloat(`${myBalance1}`) || parseFloat(`${HoldingNum}`) >= 5) {
		alert("Please follow the Rules")
	} else {
		avlBalance.innerText = (parseFloat(`${myBalance1}`) - parseFloat(`${buyAmount.value}`)).toFixed(3);
		let coinsGet = parseFloat(`${buyAmount.value}`) / parseFloat(`${price1}`);
		let p3 = parseFloat(`${myBalance1}`) - buyAmount.value;
		
		buyAmount.value = ''
		let p4 = parseFloat(`${HoldingNum}`);
		p4++;

		localStorage.setItem("myBalance", p3);
		localStorage.setItem("HoldingNum", p4);
		holding.innerHTML = p4;

		for (let i = 1; i <= 5; i++) {
			let myObj2 = JSON.parse(localStorage.getItem("myJson"));
			if (myObj2[i].id == 0) {
				myObj2[i].id = i;
				myObj2[i].symbol = `${symbol1}`;
				myObj2[i].name = `${name1}`;
				myObj2[i].currentPrice = 1000;
				myObj2[i].InvestedPrice = `${r1}`;
				myObj2[i].margin = i - 1;
				myObj2[i].coins = `${coinsGet}`;
				localStorage.setItem("myJson", JSON.stringify(myObj2));
				break;
			}
		}
		buyBox.innerHTML = '<h3> BUY !</h3>';
		updatePortfolio();
        swal({
            title: "Successful Transaction !",
            text: `You bought ${name1} Successfully`,
            icon: "success",
            button: "Thanks!",
          });
	}
}
window.onload = function() {
    setTimeout(updatePortfolio, 3000);
  }
updatePortfolio();
function updatePortfolio() {
	let p6 = localStorage.getItem("HoldingNum");
	
	let p7 = JSON.parse(p6);
	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	
	// console.log(apiData);
	tbody2.innerHTML = '';
	if (apiData.length != 0) {
		for (let i = 0; i < 20; i++) {
			if (myObj2[1].id != 0) {
				if (apiData[i].symbol == myObj2[1].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[1].coins}`);
					p90 = p90.toFixed(2);
					myObj2[1].currentPrice = p90;
				}
			}
			if (myObj2[2].id != 0) {
				if (apiData[i].symbol == myObj2[2].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[2].coins}`);
					p90 = p90.toFixed(2);
					myObj2[2].currentPrice = p90;
				}
			}
			if (myObj2[3].id != 0) {
				if (apiData[i].symbol == myObj2[3].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[3].coins}`);
					p90 = p90.toFixed(2);
					myObj2[3].currentPrice = p90;
				}
			}
			if (myObj2[4].id != 0) {
				if (apiData[i].symbol == myObj2[4].symbol) {
				
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[4].coins}`);
					p90 = p90.toFixed(2);
					myObj2[4].currentPrice = p90;
				}
			}
			if (myObj2[5].id != 0) {
				if (apiData[i].symbol == myObj2[5].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[5].coins}`);
					p90 = p90.toFixed(2);
					myObj2[5].currentPrice = p90;

				}
			}
		}
	}
let CPortfolio = 0;
let IPortfolio = 0;
	for (var i = 1; i <= 5; i++) {
		if (myObj2[i].id != 0) {
			let p80 = parseFloat(`${myObj2[i].currentPrice}`) - parseFloat(`${myObj2[i].InvestedPrice}`);
			p80 = p80.toFixed(3);
			let p70 = 'success';
			if (p80 < 0) {
				p70 = 'danger';
			}
            let p47 = internationalNumberFormat.format(myObj2[i].currentPrice);
            let p48 = internationalNumberFormat.format(myObj2[i].InvestedPrice);
			CPortfolio += parseFloat(`${myObj2[i].currentPrice}`);
			IPortfolio += parseFloat(`${myObj2[i].InvestedPrice}`);
			let p2 = `
                <tr class="table-${p70}" style = " ba ">                                                  
                                                      <td>${myObj2[i].id}</td>
                                                      <td>${myObj2[i].symbol}</td>
                                                      <td>${myObj2[i].name}</td>                                                   
                                                      <td>${p47} </td>
                                                      <td>${p48}</td>
                                                      <td>${p80}</td>
                                                      <td>
                                                      <button type="button" class="btn btn-${p70}" id="buyBtnlow${i}"
                                                      onclick="sellDataShow('${myObj2[i].id}', '${myObj2[i].symbol}','${myObj2[i].name}',   '${myObj2[i].currentPrice}','${myObj2[i].InvestedPrice}', '${myObj2[i].margin}')">SELL</button>
                                                      </td>
                                                  </tr>
                `;
			myObj2[i].margin = `${p80}`;
			localStorage.setItem("myJson", JSON.stringify(myObj2));
			tbody2.innerHTML += p2;
		}
	}
	let p34 = '#105701'
	let p35 = '#1ba916'
	if(CPortfolio - IPortfolio < 0){
		p34 = '#b10408'
		p35 = '#f42f2f'
	}
	portfolioSummary.innerHTML= 
	`

	<thead  style="background-color: black;  color: white;">
	<th class="text-center" >Total <br> Investment</th>
	<th class="text-center">Current <br> Value</th>
	<th class="text-center">Current <br> Profit</th>

</thead>
<tbody  style="background-color: black;  color: ${p35}; border-color: white;">

	<tr  >
	<th id="InvestmentTotal"  >  ₹ ${internationalNumberFormat.format(IPortfolio.toFixed(2))} </th>
	<th id="currentTotal"  >₹ ${internationalNumberFormat.format(CPortfolio.toFixed(2))}   </th>
	<th id="currentProfit"  >₹ ${internationalNumberFormat.format((CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2))} <br><br> </th>
	
		
	</tr>
</tbody>
	`


	InvestmentTotal.innerHTML = ` <br>  ${IPortfolio.toFixed(2)} <br>`   ;
	currentTotal.innerHTML =` <br> ${CPortfolio.toFixed(2)}  <br>`;
	currentProfit.innerHTML = `<br> ${(CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2)} <br>`;
	// currentTotal.innerText = CPortfolio;
	// console.log(myObj2);
}


let Sid = -1;
let Scp = -1;
let Sip = -1;

function sellDataShow(id, symbol, name, currentPrice, InvestedPrice, margin) {
	Sid = id;
	Scp = currentPrice;
	Sip = InvestedPrice;
    let SScp = parseFloat(`${currentPrice}`);
    let SSip = parseFloat(`${InvestedPrice}`);
    let prof = SScp - SSip;
    prof = prof.toFixed(2);

	sellBox.innerHTML = `
           
    
    <div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Invested<br>Value</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Current<br>Value<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Profit&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-danger">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${InvestedPrice}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${currentPrice}</td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">${prof}</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 
        `;
}


sellFinal2.onclick = function () {

	if (Sid == -1) {
		alert("bhai");
		return;
	}
	
	// console.log('id ' + Sid);
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	let p4 = parseFloat(`${HoldingNum}`);
	p4--;
	let p10 = parseFloat(`${myBalance1}`);
	let p11 = parseFloat(`${Scp}`);
	p10 = p10 + p11;
	
	avlBalance.innerText = p10;
	sellBox.innerHTML = '<h3>SELL !</h3>';

	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	myObj2[Sid].id = 0;

	localStorage.setItem("myBalance", p10);
	localStorage.setItem("HoldingNum", p4);
	holding.innerHTML = p4;
	localStorage.setItem("myJson", JSON.stringify(myObj2));
	Sid = -1;
	updatePortfolio();

}

reloCurrValue.onclick = function () {
	updatePortfolio();
}

 let myBalance2 = localStorage.getItem("myBalance");
 let p50 = myBalance2;
 p50 = parseFloat(`${p50}`);
 p50 = p50.toFixed(2);
 let p46 = internationalNumberFormat.format(p50);
 avlBalance.innerText = p46;


// coinNews();
function coinNews(){
    fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/events`)

.then((res) => {
    if (!res.ok) {
        throw new Error(res.status);
    }
    return res.json();
})
.then((data) => {
    console.log("newssss");
    // console.log(data);
})

.catch((err) => {
    console.log('API Error' + err);
});

}








internationalNumberFormat = new Intl.NumberFormat('en-IN')

let holding = document.getElementById('holding');
let tbody = document.getElementById('tbody');
let tbody2 = document.getElementById('tbody2');
let buyBox = document.getElementById('buyBox');
let sellBox = document.getElementById('sellBox');
let buyFinal2 = document.getElementById('buyFinal2');
let sellFinal2 = document.getElementById('sellFinal2');
let avlBalance = document.getElementById('avlBalance');
let reloCurrValue = document.getElementById('reloCurrValue');
let currentProfit = document.getElementById('currentProfit');
let currentTotal = document.getElementById('currentTotal');
let InvestmentTotal = document.getElementById('InvestmentTotal');
let portfolioSummary = document.getElementById('portfolioSummary');

let glob = 0;

let myBalance1 = localStorage.getItem("myBalance");
if (myBalance1 == null) {
	localStorage.setItem("myBalance", 10000);
}
let myBalance = localStorage.getItem("myBalance");


let HoldingNum = '';
HoldingNum = localStorage.getItem("HoldingNum");
if (HoldingNum == null) {
	localStorage.setItem("HoldingNum", 0);
} else {
	holding.innerHTML = HoldingNum;
}

HoldingNum = localStorage.getItem("HoldingNum");







let apiData = [];


let portfolioJSON = '';
portfolioJSON = localStorage.getItem("myJson");
// console.log(portfolioJSON);
if (portfolioJSON == null) {

	let myJson1 = {
		1: {
			num: "1",
			id: "0",
			symbol: "symbol1",
			name: "name1",
			currentPrice: "currentPrice1",
			InvestedPrice: "InvestedPrice1",
			margin: "margin1",
			coins: "2",

		},
		2: {
			num: "2",
			id: "0",
			symbol: "symbol1",
			name: "name2",
			currentPrice: "currentPrice2",
			InvestedPrice: "InvestedPrice2",
			margin: "margin2",
			coins: "2",

		},
		3: {
			num: "3",
			id: "0",
			symbol: "symbol1",
			name: "name3",
			currentPrice: "currentPrice3",
			InvestedPrice: "InvestedPrice3",
			margin: "margin3",
			coins: "2",

		},
		4: {
			num: "4",
			id: "0",
			symbol: "symbol1",
			name: "name4",
			currentPrice: "currentPrice4",
			InvestedPrice: "InvestedPrice4",
			margin: "margin4",
			coins: "2",

		},
		5: {
			num: "5",
			id: "0",
			symbol: "symbol1",
			name: "name5",
			currentPrice: "currentPrice5",
			InvestedPrice: "InvestedPrice5",
			margin: "margin5",
			coins: "2",

		}
	}
	localStorage.setItem("myJson", JSON.stringify(myJson1));
}
portfolioJSON = localStorage.getItem("myJson");



avlBalance.innerText = myBalance;


let currReload = document.getElementById('currReload');

getReq();

function getReq() {
	let html = '';
	let c = 0;
	fetch(
			`https://api.coinpaprika.com/v1/tickers?quotes=INR`
		)
		.then((res) => {
			if (!res.ok) {
				throw new Error(res.status);
			}
			return res.json();
		})
		.then((data) => {
			// console.log(data);    
			apiData = [];
			for (let i = 0; i < 20; i++) {
				let n = data[i].quotes.INR.price.toFixed(2);
				let clas = 'text-success'
				if (data[i].quotes.INR.percent_change_24h < 0) {
					clas = 'text-danger'
				}
                let p49 = internationalNumberFormat.format(n);
				let p =
					` <tr class="${clas}" style = "background-color: black" >
                <td style="width: 25.66670000000001px;" id="coinrank${i}">${data[i].rank}</td>
                <td id="coinid${i}" >${data[i].symbol}</td>
                <td  id="coinname${i}" >${data[i].name}</td>
                <td id="coinprice${i}" >${p49}</td>
                <td id="coinpercent${i}" >${data[i].quotes.INR.percent_change_24h}</td>
                <td id="buyBtnForCoin${i}">
                <button type="button" class="btn btn-success" id="buyBtnlow${i}"
                 onclick="buyDataShow('${data[i].symbol}','${data[i].name}','${n}')">BUY</button>
            </td>
            </tr>`;
				let tempObj = {
					rank: `${data[i].rank}`,
					symbol: `${data[i].symbol}`,
					name: `${data[i].name}`,
					currentPrice: `${n}`,
					percent: `${data[i].quotes.INR.percent_change_24h}`
				}

				apiData.push(tempObj);
				html += p;

			}
			tbody.innerHTML = html;
			// console.log(apiData);
			return data;
		})
		.catch((err) => {
			console.log('API Error' + err);
		});
}


let symbol1 = '00';
let name1 = '0';
let price1 = -1;
let buyPrce = -1;

function buyDataShow(symbol, name, price) {
	glob = 1;
	symbol1 = symbol;
	name1 = name;
	price1 = price;

	buyBox.innerHTML = `    
 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

    `;
}

/* <div  style="display: grid;  grid-template-columns: 3fr 5fr  3fr 3fr;">
<div id="buyCoinName">${symbol} <br>${name}</div>
<div id="buyCurrentValue">Buying Price <br>= <br>${price}</div>
<div>Buy Amount<br> =   <input type="email" class="form-control" id="buyAmount" placeholder=""> </div>
<div id="Coinsyouget" >Coins you get <br> = <br>3.5446</div>
</div> */




/* 
<div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buying<br>Price</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Buy<br>Amount<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Coins&nbsp;<br><br></th>
                    <th>BUY<br><br></th>
                </tr>
            </thead>
            <tbody>
                <tr class="table-success">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${price}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;"><input type="number" id="buyAmount" style="border-radius: 10px;padding-left: 9px; width: 80px;"></td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">0.09</td>
                    <td>
                    <button type="button" class="btn btn-success" id="buyFinal2">Success</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 

*/

buyFinal2.onclick = function () {
	let buyAmount = document.getElementById('buyAmount');
	if (glob === 0) return;

	if (buyAmount.value == '') {
		alert("Enter the amount");
		return;
	}

	let r1 = buyAmount.value;
	
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	if (parseFloat(`${buyAmount.value}`) <= 0 || buyAmount.value > parseFloat(`${myBalance1}`) || parseFloat(`${HoldingNum}`) >= 5) {
		alert("Please follow the Rules")
	} else {
		avlBalance.innerText = (parseFloat(`${myBalance1}`) - parseFloat(`${buyAmount.value}`)).toFixed(3);
		let coinsGet = parseFloat(`${buyAmount.value}`) / parseFloat(`${price1}`);
		let p3 = parseFloat(`${myBalance1}`) - buyAmount.value;
		
		buyAmount.value = ''
		let p4 = parseFloat(`${HoldingNum}`);
		p4++;

		localStorage.setItem("myBalance", p3);
		localStorage.setItem("HoldingNum", p4);
		holding.innerHTML = p4;

		for (let i = 1; i <= 5; i++) {
			let myObj2 = JSON.parse(localStorage.getItem("myJson"));
			if (myObj2[i].id == 0) {
				myObj2[i].id = i;
				myObj2[i].symbol = `${symbol1}`;
				myObj2[i].name = `${name1}`;
				myObj2[i].currentPrice = 1000;
				myObj2[i].InvestedPrice = `${r1}`;
				myObj2[i].margin = i - 1;
				myObj2[i].coins = `${coinsGet}`;
				localStorage.setItem("myJson", JSON.stringify(myObj2));
				break;
			}
		}
		buyBox.innerHTML = '<h3> BUY !</h3>';
		updatePortfolio();
        swal({
            title: "Successful Transaction !",
            text: `You bought ${name1} Successfully`,
            icon: "success",
            button: "Thanks!",
          });
	}
}
window.onload = function() {
    setTimeout(updatePortfolio, 3000);
  }
updatePortfolio();
function updatePortfolio() {
	let p6 = localStorage.getItem("HoldingNum");
	
	let p7 = JSON.parse(p6);
	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	
	// console.log(apiData);
	tbody2.innerHTML = '';
	if (apiData.length != 0) {
		for (let i = 0; i < 20; i++) {
			if (myObj2[1].id != 0) {
				if (apiData[i].symbol == myObj2[1].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[1].coins}`);
					p90 = p90.toFixed(2);
					myObj2[1].currentPrice = p90;
				}
			}
			if (myObj2[2].id != 0) {
				if (apiData[i].symbol == myObj2[2].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[2].coins}`);
					p90 = p90.toFixed(2);
					myObj2[2].currentPrice = p90;
				}
			}
			if (myObj2[3].id != 0) {
				if (apiData[i].symbol == myObj2[3].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[3].coins}`);
					p90 = p90.toFixed(2);
					myObj2[3].currentPrice = p90;
				}
			}
			if (myObj2[4].id != 0) {
				if (apiData[i].symbol == myObj2[4].symbol) {
				
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[4].coins}`);
					p90 = p90.toFixed(2);
					myObj2[4].currentPrice = p90;
				}
			}
			if (myObj2[5].id != 0) {
				if (apiData[i].symbol == myObj2[5].symbol) {
					
					let p90 = parseFloat(`${apiData[i].currentPrice}`) * parseFloat(`${myObj2[5].coins}`);
					p90 = p90.toFixed(2);
					myObj2[5].currentPrice = p90;

				}
			}
		}
	}
let CPortfolio = 0;
let IPortfolio = 0;
	for (var i = 1; i <= 5; i++) {
		if (myObj2[i].id != 0) {
			let p80 = parseFloat(`${myObj2[i].currentPrice}`) - parseFloat(`${myObj2[i].InvestedPrice}`);
			p80 = p80.toFixed(3);
			let p70 = 'success';
			if (p80 < 0) {
				p70 = 'danger';
			}
            let p47 = internationalNumberFormat.format(myObj2[i].currentPrice);
            let p48 = internationalNumberFormat.format(myObj2[i].InvestedPrice);
			CPortfolio += parseFloat(`${myObj2[i].currentPrice}`);
			IPortfolio += parseFloat(`${myObj2[i].InvestedPrice}`);
			let p2 = `
                <tr class="table-${p70}" style = " ba ">                                                  
                                                      <td>${myObj2[i].id}</td>
                                                      <td>${myObj2[i].symbol}</td>
                                                      <td>${myObj2[i].name}</td>                                                   
                                                      <td>${p47} </td>
                                                      <td>${p48}</td>
                                                      <td>${p80}</td>
                                                      <td>
                                                      <button type="button" class="btn btn-${p70}" id="buyBtnlow${i}"
                                                      onclick="sellDataShow('${myObj2[i].id}', '${myObj2[i].symbol}','${myObj2[i].name}',   '${myObj2[i].currentPrice}','${myObj2[i].InvestedPrice}', '${myObj2[i].margin}')">SELL</button>
                                                      </td>
                                                  </tr>
                `;
			myObj2[i].margin = `${p80}`;
			localStorage.setItem("myJson", JSON.stringify(myObj2));
			tbody2.innerHTML += p2;
		}
	}
	let p34 = '#105701'
	let p35 = '#1ba916'
	if(CPortfolio - IPortfolio < 0){
		p34 = '#b10408'
		p35 = '#f42f2f'
	}
	portfolioSummary.innerHTML= 
	`

	<thead  style="background-color: black;  color: white;">
	<th class="text-center" >Total <br> Investment</th>
	<th class="text-center">Current <br> Value</th>
	<th class="text-center">Current <br> Profit</th>

</thead>
<tbody  style="background-color: black;  color: ${p35}; border-color: white;">

	<tr  >
	<th id="InvestmentTotal"  >  ₹ ${internationalNumberFormat.format(IPortfolio.toFixed(2))} </th>
	<th id="currentTotal"  >₹ ${internationalNumberFormat.format(CPortfolio.toFixed(2))}   </th>
	<th id="currentProfit"  >₹ ${internationalNumberFormat.format((CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2))} <br><br> </th>
	
		
	</tr>
</tbody>
	`


	InvestmentTotal.innerHTML = ` <br>  ${IPortfolio.toFixed(2)} <br>`   ;
	currentTotal.innerHTML =` <br> ${CPortfolio.toFixed(2)}  <br>`;
	currentProfit.innerHTML = `<br> ${(CPortfolio.toFixed(2) - IPortfolio.toFixed(2)).toFixed(2)} <br>`;
	// currentTotal.innerText = CPortfolio;
	// console.log(myObj2);
}


let Sid = -1;
let Scp = -1;
let Sip = -1;

function sellDataShow(id, symbol, name, currentPrice, InvestedPrice, margin) {
	Sid = id;
	Scp = currentPrice;
	Sip = InvestedPrice;
    let SScp = parseFloat(`${currentPrice}`);
    let SSip = parseFloat(`${InvestedPrice}`);
    let prof = SScp - SSip;
    prof = prof.toFixed(2);

	sellBox.innerHTML = `
           
    
    <div class="row">
<div class="col" style="font-size: 16px;">
    <div class="table-responsive" style="border-style: solid;">
        <table class="table">
            <thead style="border-style: solid;border-color: rgb(0,0,0);">
                <tr>
                <th style="border-right-width: 3px;border-right-style: solid;">Name<br>Id</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Invested<br>Value</th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Current<br>Value<br></th>
                    <th style="border-right-width: 3px;border-right-style: solid;">Profit&nbsp;<br><br></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="table-danger">
                    <td style="width: 25.66670000000001px;border-right: 3px solid rgb(133,147,141) ;" id="buyCoinName">${symbol}<br>${name}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${InvestedPrice}</td>
                    <td class="text-center" style="border-right: 3px solid rgb(133,147,141) ;" id="buyCurrentValue">${currentPrice}</td>
                    <td style="border-right: 3px solid rgb(133,147,141) ;">${prof}</td>
                   
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div> 
        `;
}


sellFinal2.onclick = function () {

	if (Sid == -1) {
		alert("bhai");
		return;
	}
	
	// console.log('id ' + Sid);
	myBalance1 = localStorage.getItem("myBalance");
	HoldingNum = localStorage.getItem("HoldingNum");
	
	let p4 = parseFloat(`${HoldingNum}`);
	p4--;
	let p10 = parseFloat(`${myBalance1}`);
	let p11 = parseFloat(`${Scp}`);
	p10 = p10 + p11;
	
	avlBalance.innerText = p10;
	sellBox.innerHTML = '<h3>SELL !</h3>';

	let myObj2 = JSON.parse(localStorage.getItem("myJson"));
	myObj2[Sid].id = 0;

	localStorage.setItem("myBalance", p10);
	localStorage.setItem("HoldingNum", p4);
	holding.innerHTML = p4;
	localStorage.setItem("myJson", JSON.stringify(myObj2));
	Sid = -1;
	updatePortfolio();

}

reloCurrValue.onclick = function () {
	updatePortfolio();
}

 let myBalance2 = localStorage.getItem("myBalance");
 let p50 = myBalance2;
 p50 = parseFloat(`${p50}`);
 p50 = p50.toFixed(2);
 let p46 = internationalNumberFormat.format(p50);
 avlBalance.innerText = p46;


// coinNews();
function coinNews(){
    fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin/events`)

.then((res) => {
    if (!res.ok) {
        throw new Error(res.status);
    }
    return res.json();
})
.then((data) => {
    console.log("newssss");
    // console.log(data);
})

.catch((err) => {
    console.log('API Error' + err);
});

}






