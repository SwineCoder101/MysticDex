export default async function handler(req, res) {
const proof = req.body;
console.log(proof)
const verifyRes = await fetch(`https://developer.worldcoin.org/api/v1/verify/app_staging_7b0776cc7b74fd86dc87adac4792a7d6`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({...proof, action: "swap"}),
})  
const wldResponse = await verifyRes.json();
if (verifyRes.ok) {

    res.status(verifyRes.status).send({
        code: "success",
        detail: "This action verified correctly!",
    });
} else {
    console.log('failed')
    console.log(verifyRes.status)
    console.log(wldResponse.detail)
    res
    .status(verifyRes.status)
    .send({ code: wldResponse.code, detail: wldResponse.detail });
}
}