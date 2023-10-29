/*
Date: 29 Oct 2023
Title: Aync await questions
*/

//Ques 1 
const p1 = new Promise((res,rej)=>{
	setTimeout(()=>{
		res("resolved first promise")
	},1000) 
})
const p2 = new Promise((res,rej)=>{
	setTimeout(()=>{
		res("resolved second promise")
	},2000)
})

async function handlePromise(){
	console.log("First console.log")
	// p1 resolves at 1s while p2 resolves at 2s
	// so what will be printed and at what time ?
	const data1 = await p1 
	console.log(data1)
	console.log("first promise done")
	const data2 = await p2
	console.log(data2)
	console.log('second promise done')
}

handlePromise()



//Ques 2
const p3 = new Promise((res,rej)=>{
	setTimeout(()=>{
		res("resolved first promise")
	},5000) 
})
const p4 = new Promise((res,rej)=>{
	setTimeout(()=>{
		res("resolved second promise")
	},2000)
})

async function handlePromise2(){
	console.log("First console.log")
	// p1 resolves at 5s while p2 resolves at 2s
	// so what will be printed and at what time ?
	// will the code wait at p1 for 5 s and then again for p2 at 2s (total 5+2 ?)
	// what will happen ?
	const data3 = await p3
	console.log(data3)
	console.log("first promise done")
	const data4 = await p4
	console.log(data4)
	console.log('second promise done')
}

handlePromise2()


// Ques 3
//guess the output

let count = 0;

async function raceConditionHandler() {
    await Promise.all([
        (async () => { count++; })(),
        (async () => { count++; })(),
    ]);
    console.log(count);
}

raceConditionHandler();


