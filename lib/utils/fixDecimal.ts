function fixDecimal(number: number) {
    return number.toFixed(2).replace(/\.00$/, "");
}

export default fixDecimal