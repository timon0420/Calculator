//tworzenie kalkulatora
const create_calculator = () => {
    let root = document.querySelector('#root');
    let screen = document.createElement('div');
    screen.classList.add('screen')
    let numbers = document.createElement('div');
    numbers.classList.add('numbers');
    let operations = document.createElement('div');
    operations.classList.add('operations');
    let operation_table = ['+', '-', '*', '/', '=', 'c']
    //tworzenie elementów cyfr
    for (let i = 9; i >= 0; i--){
        let number = document.createElement('div');
        number.classList.add('number');
        number.innerText = i;
        numbers.appendChild(number);
    }
    //tworzenie elementów operacji
    operation_table.forEach((x) => {
        let operation = document.createElement('div')
        operation.classList.add('operation');
        operation.innerText = x;
        operations.appendChild(operation);
    })
    //dodawanie elementów
    root.appendChild(screen)
    root.appendChild(numbers);
    root.appendChild(operations)
}

//obliczanie działań
const result_func = (table) => {
    let result = parseInt(table[0])
    for (let i=1; i<table.length; i++) {
        if (table[i] == '+'){
            result += parseInt(table[i+1])
        }
        else if (table[i] == '-'){
            result -= parseInt(table[i+1])
        }
        else if (table[i] == '*'){
            result *= parseInt(table[i+1])
        }
        else if (table[i] == '/'){
            result /= parseInt(table[i+1]);
        }  
    }
    return result;
}

//operacje na kalkulatorze
const operation_func = () => {
    let numbers = document.querySelector('.numbers');
    let table = [];
    let screen = document.querySelector('.screen');
    let screen_text = '';

    numbers.addEventListener('click', e => {
        //dodawanie liczb do tablicy
        const target = e.target;
        if (table[table.length -1] == '+' || table[table.length -1] == '-' || table[table.length -1] == '*' || table[table.length -1] ==  '/' || table.length == 0){
            table.push(target.innerText);
        }
        else{
            let n = table[table.length - 1];
            table.pop();
            table.push(n+target.innerText);
        }
        //wypisywanie danych na ekran
        screen.innerText = '';
        screen_text = ''; 
        table.forEach((element) => {
            screen_text += element;
        })
        screen.innerText = screen_text;

    })

    document.addEventListener('keydown', e => {
        if (e.code.slice(0, -1) == 'Digit') {
            if (table[table.length -1] == '+' || table[table.length -1] == '-' || table[table.length -1] == '*' || table[table.length -1] ==  '/' || table.length == 0){
                table.push(e.key);
            }
            else {
                let n = table[table.length - 1];
                table.pop();
                table.push(n+e.key);
            }
            console.log(table)
        }
        //wypisywanie danych na ekran
        screen.innerText = '';
        screen_text = ''; 
        table.forEach((element) => {
            screen_text += element;
        })
        screen.innerText = screen_text;
    })

    //sprawdzanie operacji
    let operations = document.querySelector('.operations');

    operations.addEventListener('click', e => {
        const target = e.target;
        if (target.innerText != '=' && table.length > 0){
            table.push(target.innerText);
            //wypisywanie danych na ekran
            screen.innerText = '';
            screen_text = ''; 
            table.forEach((element) => {
                screen_text += element;
            })
            screen.innerText = screen_text;    
        }
        else{
            if (result_func(table).toString() != 'NaN'){
                screen.innerText = result_func(table).toString();
            }
            table = [];
        }
    })

}
create_calculator()
operation_func()