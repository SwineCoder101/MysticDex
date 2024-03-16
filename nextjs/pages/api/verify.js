export default async function handler(req, res) {
const proof = req.body;
console.log(proof)
const verifyRes = await fetch(`https://developer.worldcoin.org/api/v1/verify/app_staging_86db89ba718bfb4426194c6e88254a62`, {
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
    .status(verifyRes.status).send({
        code: "unsuccessful",
        detail: "This action verified incorrectly.",
    });

}
}