const stream = require("node:stream");

function getKeyByValue(obj, value) {
    return Object.keys(obj)
        .filter(key => obj[key] === value);
}

class Codec {
    constructor() {
        this.keys = {
            "A": "eXYuk9ARJjJCsDFZcMxd0B32kUEOtirMT9UeUWWpHO7SBYwci3",
            "B": "FHgWaRNqAoF9cZUBl4tYlo1EhO8QOQNSIESwYmtZhDsP6dlYMW",
            "C": "iXD5fY64ZoCgXnoFo26dEMYRzoiu3LCaZ7IT6p4auYW6stYDnH",
            "D": "DZA83oPA5HrG3Q9PjsItQ2omKe0D4MceWpIkshETHonBIPUHNw",
            "E": "c0hbGHi0INKAA08PIslbBu1hxJeZfr6rHmR7fBRh5DRuTrejqk",
            "F": "KqHOHXPFUufK65TXWfZtumuXMqOGQGQKxtDjJ7eTFthblQXqtu",
            "G": "l26M6RWAb2cjo3oIB0FYzeJKdkX9zHFW4CtpMjf7oyQFSf5nbA",
            "H": "SgsHhkuW0bjDe2QwfUQ5NalIlYeUrl9oMWY2jBZOnNckabsbh6",
            "I": "zxFxCL1W3wlWJS0HRr1AWQFch9rOD6LL1SEsfbSquTyLOOmIWt",
            "J": "TxSH3UwdIGxglqF6jqPo3gjFjMFIRGAXdfH9EIauiifN0U9cMb",
            "K": "nWm64LpW28aaOM3nNCH4EleTaGMEYShLqM7mQZM4zNBq83bDxz",
            "L": "0kERYTi2Nx74WnyrBU8oq5i5qYlLjwMqAm2eWsOpKdU2BFgNks",
            "M": "k1p0BAPAEXKJBEMR3CoQ02eHFw7WKx9dCdWtB5eTKGBbJUQI47",
            "N": "fNQCY1LHKDnQojsKaZaRtADjzWAMRXelhd09I54uS5iLZkhwGH",
            "O": "Fz4A4J0QI6oeZ65LQWASYq1uypwy8LBns1sE4tNo08ah81od87",
            "P": "PIBT8HXPsSRlzCFNhM2kG5WcJy3JXHDdT8R3QsmBZHRQKX7D45",
            "Q": "O8DIBsMdl4tmZO2nLdp9eJrOq4qYf2W9abmr6dOep8WslnwCOr",
            "R": "1N61eKzswB1PLBHe9rriXDx0MfbzRyck6HcQKJotgwjp3p6taW",
            "S": "pLXXDwSXEkK4Tj6d1OBHRFzSLTKqoUruoqNFqyiOHjuETMB0NW",
            "T": "1709i6dFKSGWYtBqC1JedCneYF1ltWjii0rISMGe3h4HKFnNUT",
            "U": "QFaWGodL7odqpZfoP0QBkudhz90zuanKsOOiM7GmFfHnUqoH2q",
            "W": "aBefzlsYUsdtCnzwjA2lnwHHqC0DQrUOpjdXnPpSURNA2Az3Uz",
            "X": "oRgzf2cOB7onRcp4KCW9iPBArFInyOaRl397GOdgnjysQ6AZCs",
            "Y": "phonf8x8CiMr6Zi2BKTlgxYuiQI3teiI7579wZqSDmL4xGR5pA",
            "Z": "nQxZgyPbqWJ5EpkjtImONCFnAwN9ARP37C6kOiLFzm2kn2zSoh",
            "a": "z8BkF59E1bpBD7oyph32OAETAQZa3NuCsWIEARGj6oNUFHLmY1",
            "b": "CRzLh2lQQhBhFNjZ4s5AwxRmy8U1waUoG9Z62gYyfHdc2NIkHt",
            "c": "TCHNfaTR6c4hXHPRehoqbYNSUBq3ExrEKFXyGNjWMpBZ7BDeoj",
            "d": "nOmLiNyd1bluEmYncTqpmFpIxQLaA3kQHXDU5bkH6TjBH9jU4K",
            "e": "yxTxnyGultKS6SiH45EKgkQSHfnbaUGJy8nj3wXRs01iBpIXkr",
            "f": "lLIYIAMw9qypwddP6zOwdDYA4f6n8CbJa4euZ2mHbFfLJ5nsU3",
            "g": "yDli5WS6AX1wnj05MjpEFpuH8AbP2Lk6rjtCqMJ0hd5qkXJZRt",
            "h": "k0BIKmNGM4ITJJnPOcKmUnABtGI1SiBjTzyEEYfCPLJxmDnsjj",
            "i": "c4kDwFq1FOY0j26DUKidJCDzubDHGKT7IToCBOTyaCylMditxU",
            "j": "xJlUAuZdsRnqI39RFcMQcwOYNLFNlkBLZDf8JcWda22JqZhSlD",
            "k": "kmKYMcHAigUbKe1JPwTqqia73i9kucdAjXBlOABpukGWM2D7eJ",
            "l": "pHE4gYb6ltH2HIRXiqtl5F2njcZkCy1AqUrITFMkb2odJnmUgD",
            "m": "DQmeXcaKQK9xjNQQOaLEHlphob0RR8plSW4xfb2QzzoCLxsF25",
            "n": "LFO1N1dtTXmMgA3q5YSrpr4AgM8oICU7Ht4aOqnUE2jf2yjB7L",
            "o": "m0UCxGNzA8T3gyDmbPx7UICigWq41pwHSfLUwi3h7QtTL74rlR",
            "p": "CRi0LgFDjULPOFR6wNDtWsbaJRhn7YTqeEowjLYl2p7wOSjNFW",
            "q": "G4h44j7l4iKcr6AaZLF5eyGgUctWN846EFxTWI6TPI8Pb5gjkx",
            "r": "8ep3UucskJ7bc0QOWTBks3qek0MWGCICd12EbUKofoT0aW5gQl",
            "s": "QfCWTEEHR7OMmIzocmPc5R897Mk6Xr6Fx4m5cW6PK0QJ6ASOxT",
            "t": "uqUsApBIhXgtJrLBsFtHop3zbaqA2WYrGJZgMOrBUUeGlQHsno",
            "u": "RXPGsokYXRfWbpDuLncrGlqAErxjADmxN8qlL559iM02auKsJ6",
            "w": "XOQObZDEzcDiW4CMBBytXZuLfy2yXpyIkM5MibtJUUqgpdw4S5",
            "x": "4LPz4yndoD8xz4i5AtjnAIRJU2NmLAJlG45hin1JMIedIyMzu4",
            "y": "dRhqIxDPZbXE5iEQEfO5Z29a4wWtRXcN3H12HyeIJaHIJGyAUd",
            "z": "zOgmuEbIYZWJ91LS4frutDWURIyyihMHeqIS1Rl1MlO7m8lKEj",
            "1": "CXkXmGukrZ181UsIGojx1eRB8OEpD4LCy0t1muq0c8sDYoJOfU",
            "2": "o6cmUiktjmlyG5zsfrK1Bkb53UOuuZSUm9PSmMWk8RFncXTwrn",
            "3": "nk7PNe3xb24Uc5R1mIU6y9afb9eAHojBRdF8KKkMhsG2qEIHID",
            "4": "onRmZ0iZYBUqXyu0y7GFWNDZcJilSS3ihAqf8xp9SWceOimyl1",
            "5": "ioHS4H54XMuy0nHMs1I4MMy5AWSU7mckFe6p1BxtGbk2GmJJ8s",
            "6": "7xQ3kcyN72E7rtQJoeDOkx1MB5DK3CXlwliN34aJQt98qhPwsY",
            "7": "5Y47tIcF7inGDm4PbhOgFlBN8tB8IxfLimIUbOD9mKMAx7Ixih",
            "8": "kbmTlg4YlZ3cxXxcijt6qSrKwfgipA5oN6bY7eXD3afccyeiFQ",
            "9": "bcqeUEyk6BrZqj7N4tSDcQfFdss8siYJH1gFX9eMRnMXS3uwdl",
            "0": "oK8Ujkhp6cKhjkosclinMMLT4UGx3M2oa23AUpOnTbpj5b4dwd",
        }


    }
    
    decode(text) {
        let bytes = []
        let str = ""
        let count = 0
        for (let byte of text) {
            count++;
            str += byte;
            if (count === 50) {
                bytes.push(getKeyByValue(this.keys, str)[0])
                count = 0
                str = ""
            }
        }
        
        return bytes;
    }
    
    encode(text) {
        let willBeReturned = ""
        for (let char of text) {
            willBeReturned += this.keys[char];
        } 
        
        return willBeReturned
    }
}

module.exports = {
    Codec: Codec
}