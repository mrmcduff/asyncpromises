async function afunc() {
  console.log('starting afunc');
  return await new Promise(res => {
    setTimeout(() => {
      console.log('afunc run');
      res('afunc return');
    }, 100)
  });
}


async function bfunc(barg) {
  console.log('starting bfunc');
  return await new Promise(res => {
    setTimeout(() => {
      console.log('bfunc run');
      res (`bfunc with ${barg}`);
    }, 200);
  });
}

async function cfunc() {
  const x = await afunc();
  console.log('got x');
  const y = await bfunc(x);
  console.log('got y');
  console.log(y);
}

function apfunc() {
  console.log('apfunc start');
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('apfunc run');
      res('apfunc return');
    }, 100);
  });
}

function bpfunc(barg) {
  console.log('bpfunc start');
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('bpfunc run');
      res(`bpfunc with ${barg}`);
    }, 200);
  });
}

function cpfunc() {
  console.log('cpfunc start');
  const retval = new Promise(res => {
    apfunc().then(val => {
      console.log(val);
      res(val);
    });
  });
  const breturn = retval.then(val => {
    return bpfunc(val);
  });
  breturn.then(val => console.log(val));
}

// cfunc();
cfunc();
cpfunc();
