function getReq ( category) { 
    console.log('hii');
    
    fetch(
        `https://api.coinpaprika.com/v1/tickers?quotes=INR`
    )
        .then((res) => {
            // console.log(data);
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);    
            for(let i=0; i<20; i++){
                // console.log(data[i]..quotes);
            }
        })
        .catch((err) => {
            const html = `<div style="text-align:center; margin:4%; font-size:3vw" >No match Found 🔎</div>`;
            console.log('nah');        
        });
}