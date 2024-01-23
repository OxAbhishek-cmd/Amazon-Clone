const host = ""
const DOMAIN = `${host}/api`
const findInObjectArray = (arr, key, value) => {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (element[key] === value) {
            return true
        }
    }
    return false
}
const union = (databaseCart, reduxCart) => {
    const arr = [];
    [...databaseCart, ...reduxCart].forEach((item) => {
        if (!findInObjectArray(arr, "product_id", item.product_id)) {
            arr.push(item);
        }
    })
    return arr;
}
const difference = (databaseCart, reduxCart) => {
    const arr = [];
    reduxCart.forEach((item) => {
        if (!findInObjectArray(databaseCart, "product_id", item.product_id)) {
            arr.push(item);
        }
    })
    return arr;
}

const mergeCart = (databaseCart, reduxCart) => {
    return { union: union(databaseCart, reduxCart), difference: difference(databaseCart, reduxCart) };
}


const findIndexof = (cart,key, value) => {
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        if (element[key] === value) {
            return i;
        }
    }
    return -1;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const FinalBalance=cart=>{
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      total = total+item.quantity*item.price;
    }
    return total;
  };


export { DOMAIN, findInObjectArray, union, difference, mergeCart, findIndexof , shuffleArray, FinalBalance}