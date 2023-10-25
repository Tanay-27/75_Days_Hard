Date: 25 Oct 2023
Title: Promise Methods Polyfills
Desc:

1. Polyfill for Promise.all()
```const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("res 1")
  }, 2000)
})

const p2 = Promise.reject("resolved 2")

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("rej 1")
  }, 1000)
})


function customPromiseAll(arr) {
  const res1 = []
  return new Promise((res, rej) => {
    for (let i = 0; i < arr.length ; i++) {
      
	  Promise
	  .resolve(arr[i])
	  .then(res123=>{
        res1.push(res123)
		if(res1.length === arr.length){
			res(res1)
		}
	  	}
	  )
	  .catch(err=>{
      		rej(err)
	  })

    }
  })
}

const pAll1 = customPromiseAll([p1, p2, p3])

pAll1.then(res => console.log(res)).catch(Err=>console.log(Err))
```

2. Ployfill for Promise.any()
```
const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("res 1")
  }, 100)
})

const p2 = Promise.reject("resolved 2")

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    rej("rej 1")
  }, 1000)
})

function customPromiseAny(arr) {
  let errCounter = 0
  const errMap=[]
  return new Promise(async (res, rej) => {
	for(let i=0 ;i < arr.length; i++){
		Promise.resolve(arr[i]).then(res).catch(err=>{
			errMap[i]=err
			errCounter++
			if(errCounter === arr.length){
				rej(errMap)
			}
		})
	}
  })
}

const pAll1 = customPromiseAny([p1, p2, p3])

pAll1.then(res => console.log(res)).catch(Err => console.log(Err))
```

3. Polyfill for Promise.race()
```const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("res 1")
  }, 100)
})

const p2 = Promise.resolve("resolved 2")

const p3 = new Promise((res, rej) => {
  setTimeout(() => {
    res("rej 1")
  }, 1000)
})

function customPromiseRace(arr) {
  let errCounter = 0
  const errMap=[]
  return new Promise(async (res, rej) => {
	for(let i=0 ;i < arr.length; i++){
		Promise.resolve(arr[i]).then(resp=>{
			res(resp)
		}).catch(err=>{
			rej(err)
		})
	}
  })
}

const pAll1 = customPromiseRace([p1, p2, p3])

pAll1.then((err)=>console.log(err,'p1')).catch((err)=>console.log(err,'p2'))
```