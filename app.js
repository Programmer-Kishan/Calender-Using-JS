month_heading = document.getElementById('month');
left_button = document.getElementById('left-arrow')
right_button = document.getElementById('right-arrow')

let date = new Date();
let cur_month = date.getMonth();
let cur_year = date.getFullYear();
// Number of days for each month
let no_days = 31;

// index months which contain 13 days
m31 = [0, 2, 4, 6, 7, 9, 11]


// for maintaing the month heading
function getMonth(cur_month) {
    let month = undefined
    switch(cur_month) {
        case 0:
            month = 'January';
            break;
        case 1:
            month = 'Feburary';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8:
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10:
            month = 'November';
            break;
        case 11:
            month = 'December';
            break;
    }
    return month;
}

function is_leap_year(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return true;
    } else {
        return false;
    }
}

function get_no_days(month, year) {
    if (m31.includes(month)) {
        return 31;
    } else if (month == 1) {
        if (is_leap_year(year)) {
            return 29;
        } else {
            return 28;
        }
    } else {
        return 30;
    }
}

// getting the day for the 1st of the accessed month
let cur_day = date.getDay();  // which day (monday, tuesday...)
let cur_date = date.getDate();   // date 1, 2, 23...

while(cur_date > 7) {
    cur_date -= 7;
}

while(cur_date != 1) {
    cur_date -= 1;
    cur_day -= 1;
}


// Accessing all the day div's
let days = document.getElementsByClassName('day');

function map_dates(cur_day, cur_date, prev_month) {

    // for the dates part

    days = Object.values(days);
    // calculating defletion form sunday
    start_deflection = cur_day;
    insert_date = get_no_days(prev_month);
    for (let i = start_deflection-1; i >= 0; i--) {
        html_data = `<p class="scale-up">${insert_date}</p>`;
        days[i].insertAdjacentHTML('beforeend', html_data);
        insert_date -= 1;
    }

    days.forEach(day => {
        if(start_deflection == 0) {
            html_data = ``;
            for(let i = 0; i < 5; i++) {
                insert_date = cur_date + (7*i)
                if(insert_date <= no_days) {
                    html_data += `<p class="scale-up">${insert_date}</p>`;
                }
            }
            cur_date += 1;
            day.insertAdjacentHTML('beforeend', html_data);
        } else {
            html_data = ``;
            for(let i = 0; i < 5; i++) {
                insert_date = (7-start_deflection+1) + (7*i);
                if(insert_date <= no_days) {
                    html_data += `<p class="scale-up">${insert_date}</p>`;
                }
            }
            start_deflection -= 1;
            day.insertAdjacentHTML('beforeend', html_data);
        }
    });

    // calculating deflection from saturday
    if (no_days === 31) {
        end_deflection = 4 - cur_day;
    } else if (no_days === 30) {
        end_deflection = 5 - cur_day;
    } else if (no_days === 28) {
        end_deflection = 7 - cur_day;
    } else {
        end_deflection = 6 - cur_day;
    }
    insert_date = 1
    for (let i = 7 - end_deflection; i < 7; i++) {
        html_data = `<p class="scale-up">${insert_date}</p>`;
        days[i].insertAdjacentHTML('beforeend', html_data);
        insert_date += 1
    }
}

function remove_dates() {
    days.forEach(day => {
        while (day.children.length !== 1) {
            day.removeChild(day.lastChild);
        }
    });
}

map_dates(cur_day, cur_date, cur_month, cur_year);

month_heading.innerHTML = `${getMonth(cur_month)} : ${cur_year}`;

// Adding animation for changing month based on the button click 

left_button.addEventListener('click', () => {
    month_heading.classList.add('shift-right-2-animation')
    if(month_heading.innerText === `January : ${cur_year}`) {
        cur_year--;
    }
    delay = 0.1;
    // remove_dates();
    setTimeout(() => {
        month_heading.classList.remove('shift-right-2-animation');
        prev_month = cur_month;
        cur_month == 0 ? cur_month = 11 : cur_month--;
        // no_days = get_no_days(cur_month);
        date = new Date(cur_year, cur_month, 1);
        no_days = get_no_days(cur_month);
        remove_dates();
        month_heading.innerHTML = `${getMonth(cur_month)} : ${cur_year}`;
        map_dates(date.getDay(), date.getDate(), prev_month, cur_year);
        month_heading.classList.add('shift-left-2-animation');
        setTimeout(() => {
            month_heading.classList.remove('shift-left-2-animation');
        }, 700);
        console.log(no_days);
    }, 700);
});

right_button.addEventListener('click', () => {
    month_heading.classList.add('shift-left-animation')
    if(month_heading.innerText === `December : ${cur_year}`) {
        cur_year++;
    }
    // remove_dates();
    delay = 0.1;
    setTimeout(() => {
        month_heading.classList.remove('shift-left-animation');
        prev_month = cur_month;
        cur_month == 11 ? cur_month = 0 : cur_month++;
        date = new Date(cur_year, cur_month, 1);
        no_days = get_no_days(cur_month);
        remove_dates();
        month_heading.innerHTML = `${getMonth(cur_month)} : ${cur_year}`;
        map_dates(date.getDay(), date.getDate(), prev_month, cur_year);
        month_heading.classList.add('shift-right-animation');
        setTimeout(() => {
            month_heading.classList.remove('shift-right-animation');
        }, 700);
        console.log(no_days);
    }, 700);
});

// setTimeout(() => {
//     remove_dates();
// }, 2000);