function fixDecimal(n: number) {
    return n.toFixed(2).replace(/\.00$/, "")
}

export default fixDecimal