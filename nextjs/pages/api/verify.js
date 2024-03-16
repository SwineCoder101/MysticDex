export default async function handler(req, res) {
const verifyRes = await fetch(`https://developer.worldcoin.org/api/v1/verify/app_staging_7b0776cc7b74fd86dc87adac4792a7d6`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({...proof, action: "swap"}),
})  
if (verifyRes.ok) {

    res.status(verifyRes.status).send({
        code: "success",
        detail: "This action verified correctly!",
    });
} else {
    res
    .status(verifyRes.status)
    .send({ code: wldResponse.code, detail: wldResponse.detail });
}
}