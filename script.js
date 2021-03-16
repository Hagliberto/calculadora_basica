const tela = document.querySelector('.tela')

const botao = document.querySelectorAll(".botao")
const zero = document.querySelector(".zero")
const igual = document.querySelector(".igual")
const apagar = document.querySelector(".apagar")

const somaButton = document.querySelector("#soma")
const subButton = document.querySelector("#sub")
const multButton = document.querySelector("#mult")
const divButton = document.querySelector("#div")

let virgula = true
let operacao
let calc = ""
let chave = true

function clicar(botao) {

    if (tela.innerHTML == "Error") {
        calc = botao.innerHTML
        tela.innerHTML = botao.innerHTML
    } else {
        if (botao.innerHTML == "," && virgula == true) {
            calc += botao.innerHTML
            virgula = false
            tela.innerHTML += botao.innerHTML
        } else if (botao.innerHTML == "," && virgula == false) {
            // ignorar virgula repetida
        } else if (botao.innerHTML == "+" || botao.innerHTML == "*" || botao.innerHTML == "-" || botao.innerHTML == "/") {
            calc += botao.innerHTML
            x = calc.substring(calc.length - 2, calc.length - 1)
            if (x == "+" || x == "*" || x == "-" || x == "/") {
                calc = calc.substring(0, calc.length - 2)
                calc += botao.innerHTML
            }
            tela.innerHTML = botao.innerHTML
            virgula = true


        } else if (chave) {
            calc += botao.innerHTML

            tela.innerHTML += botao.innerHTML
        } else {
            calc += botao.innerHTML
            chave = true;
            tela.innerHTML = botao.innerHTML
        }
    }
    console.log(calc)
}

function limpar() {
    tela.innerHTML = null
    calc = ""
}

function somar() {
    return calc.split("+").map(num => Number(num.trim().replace(",", "."))).reduce((total, num) => total += num, 0)
}

function subtrair() {
    return calc.split("-").map(num => Number(num.trim().replace(",", "."))).reduce((total, num, index) => index === 0 ? total = num : total -= num, 0)
}

function multiplicar() {
    return calc.split("*").map(num => Number(num.trim().replace(",", "."))).reduce((total, num) => total *= num, 1)
}

function dividir() {
    return calc.split("/").map(num => Number(num.trim().replace(",", "."))).reduce((total, num, index) => index === 0 ? total = num : total /= num, 1)
}

somaButton.addEventListener("click", () => {
    chave = false
    operacao = "+"
})

subButton.addEventListener("click", () => {
    chave = false
    operacao = "-"
})

multButton.addEventListener("click", () => {
    chave = false
    operacao = "*"
})

divButton.addEventListener("click", () => {
    chave = false
    operacao = "/"
})

igual.addEventListener("click", () => {
    const operacoes = new Map([
        ["+", somar],
        ["-", subtrair],
        ["*", multiplicar],
        ["/", dividir]
    ])

    virgula = true
    const resultado = operacoes.get(operacao)()
    tela.innerHTML = isNaN(resultado) ? "Error" : resultado.toFixed(2).replace(",", ".")
    calc = tela.innerHTML
})