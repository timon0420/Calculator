//obliczanie działań
const result = (table) => {
    let result = parseInt(table[0])
    for (let i = 2; i < table.length; i++){
        if (table[i-1] == '+'){
            result += parseInt(table[i])
        }
        if (table[i-1] == '-'){
            result -= parseInt(table[i])
        }
        if (table[i-1] == '*'){
            result *= parseInt(table[i])
        }
        if (table[i-1] == '/'){
            result /= parseInt(table[i])
        }
        if (table[i-1] == '%'){
            result %= parseInt(table[i])
        }
    }
    return result;
}
//wyświetlanie danych na ekran
const show_date = (date) => {
    let screen = document.querySelector('#screen');
    screen.innerText = ''
    let text_screen = ''
    if (typeof(date) == 'number'){
        screen.innerText = date.toString()
    }
    else{
        date.forEach((x) => {
            text_screen += x.toString()
        })
        screen.innerText = text_screen
    }
}
const load_date = () => {
    let container = document.querySelector('#container');
    let table = []
    container.addEventListener('click', e => {
        const target = e.target
        //dodawanie znaku działania błąd: znak dodaje sie na pierwszym miejscu
        if (target.innerText == '+' || target.innerText == '-' || target.innerText == '*' || target.innerText == '/' || target.innerText == '%' || table.length == 0 && target.innerText != 'c' && target.innerText != '=') {
            if (table[table.length -1] != '+' && table[table.length -1] != '-' && table[table.length -1] != '*' && table[table.length -1] != '/' && table[table.length -1] != '%'){
                console.log(target.innerText)
                table.push(target.innerText)
                show_date(table)
            }
        }
        //obliczanie działania
        else if (target.innerText == '=' && table.length > 2){
            show_date(result(table))
            table = []
        }
        //usuwanie danych z listy
        else if (target.innerText == 'c'){
            table = []
            show_date(table)
        }
        //dodawanie liczb do listy
        else if (typeof(parseInt(target.innerText)) == 'number' && table[table.length-1] != '+' && table[table.length-1] != '-' && table[table.length-1] != '*' && table[table.length-1] != '/' && table[table.length-1] != '%' && target.innerText != 'c' && target.innerText != '='){
            let n = table[table.length - 1]
            table.pop()
            table.push(n+target.innerText)
            show_date(table)
        }
        //dodawanie liczby do tablicy
        else if (typeof(parseInt(target.innerText)) == 'number'){
            console.log(target.innerText)
            table.push(target.innerText)
            show_date(table)
        }
    })
}
load_date()

